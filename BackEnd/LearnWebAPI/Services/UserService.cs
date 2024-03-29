﻿using AutoMapper;
using BackEnd.ViewModels.UserViewModels;
using LearnWebAPI.Interfaces;
using LearnWebAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using BackEnd.Models;
using BackEnd.Paging;
using BackEnd.Ultity;
//using BackEnd.Ultity.ImageSaver;

namespace LearnWebAPI.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly Project231Context _context;
        private readonly AppSetting _appSettings;
        private readonly IConfiguration _configuration;
        private readonly ILogger<UserService> _logger;
        public UserService(IMapper mapper, Project231Context context, IOptionsMonitor<AppSetting> optionsMonitor, ILogger<UserService> logger, IConfiguration configuration)
        {
            _mapper = mapper;
            _context = context;
            _appSettings = optionsMonitor.CurrentValue;
            _logger = logger;
            _configuration = configuration;
        }
        public async Task<TokenModel> GenerateToken(User user)
        {
            var refreshToken = GenerateRefreshToken();
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.SecretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, user.Name),
        new Claim(ClaimTypes.Role, user.Role.ToString()),
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(JwtRegisteredClaimNames.Email, user.Email),
        new Claim(JwtRegisteredClaimNames.Sub, user.Email),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        new Claim("Username", user.Username),
        new Claim("Id", user.Id.ToString()),
        new Claim("Role", user.Role.ToString()),
        new Claim("Avatar", user.Avatar.ToString()),
    };
            var token = new JwtSecurityToken(
                issuer: _configuration["AppSettings:Issuer"],
                audience: _configuration["AppSettings:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(60),
                signingCredentials: credentials
            );

            var accessToken = new JwtSecurityTokenHandler().WriteToken(token);

            var refreshTokenEntity = new RefreshToken
            {
                Id = Guid.NewGuid(),
                UserId = user.Id,
                JwtId = token.Id,
                Token = refreshToken,
                IsUsed = false,
                IsRevoked = false,
                IssuedAt = DateTime.UtcNow,
                ExpiredAt = DateTime.UtcNow.AddHours(1)
            };

            await _context.RefreshTokens.AddAsync(refreshTokenEntity);
            await _context.SaveChangesAsync();

            return new TokenModel
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
        }
        public async Task<ApiResponse> RenewToken(TokenModel model)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var secretKeyBytes = Encoding.UTF8.GetBytes(_appSettings.SecretKey);
            var tokenValidateParam = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,

                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(secretKeyBytes),
                ClockSkew = TimeSpan.Zero,
                ValidateLifetime = false, //không kiểm tra token hết hạn
            };
            try
            {
                // Check 1: AccessToken valid format
                var tokenInVerification = jwtTokenHandler.ValidateToken(model.AccessToken, tokenValidateParam, out var validatedToken);

                // Check 2: Check alg
                if (validatedToken is JwtSecurityToken jwtSecurityToken)
                {
                    var result = jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha512, StringComparison.InvariantCultureIgnoreCase);
                    if (!result)
                    {
                        return new ApiResponse
                        {
                            Success = false,
                            Message = "Invalid Token",
                        };
                    }
                }

                // Check 3: Check access expire
                var UtcExpireDate = long.Parse(tokenInVerification.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Exp).Value);
                var expireDate = ConverUnixTimeToDateTime(UtcExpireDate);
                if (expireDate > DateTime.UtcNow)
                {
                    return new ApiResponse
                    {
                        Success = false,
                        Message = "Access token has not yet expired",
                    };
                }

                // Check 4: Check refresh token exist in db
                var storedToken = _context.RefreshTokens.FirstOrDefault(x => x.Token == model.RefreshToken);
                if (storedToken == null)
                {
                    return new ApiResponse
                    {
                        Success = false,
                        Message = "Refresh token does not exist"
                    };
                }

                // Check 5: Check refresh token isUsed/revoked
                if (storedToken.IsUsed)
                {
                    return new ApiResponse
                    {
                        Success = false,
                        Message = "Refresh token has been used"
                    };
                }
                if (storedToken.IsRevoked)
                {
                    return new ApiResponse
                    {
                        Success = false,
                        Message = "Refresh token has been revoked"
                    };
                }

                // Check 6: Check refresh token isUsed/revoked
                var jti = tokenInVerification.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti).Value;
                if (storedToken.JwtId != jti)
                {
                    return new ApiResponse
                    {
                        Success = false,
                        Message = "Token doesn't match"
                    };
                }

                // Update token is used
                storedToken.IsUsed = true;
                storedToken.IsRevoked = true;
                _context.Update(storedToken);
                await _context.SaveChangesAsync();

                //Create new token
                var user = await _context.Users.SingleOrDefaultAsync(x => x.Id == storedToken.UserId);
                var token = await GenerateToken(user);

                return new ApiResponse
                {
                    Success = true,
                    Message = "Renew token Success",
                    Data = token
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return new ApiResponse
                {
                    Success = false,
                    Message = ex.Message,
                };
            }
        }
        private DateTime ConverUnixTimeToDateTime(long utcExpireDate)
        {
            var dateTImeInterval = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            dateTImeInterval.AddSeconds(utcExpireDate).ToUniversalTime();
            return dateTImeInterval;
        }
        private string GenerateRefreshToken()
        {
            var random = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(random);
                return Convert.ToBase64String(random);
            }
        }
        public async Task<User> Login(UserLogin user)
        {
            var users = new User();
            users = await _context.Users.Where(x => x.Username == user.Username && x.Password == user.Password).FirstOrDefaultAsync();
            if (users == null) users = await _context.Users.Where(x => x.Email == user.Username && x.Password == user.Password).FirstOrDefaultAsync();
            return users;
        }
        public async Task<ApiResponse> Regis(UserAddVM user)
        {
            try
            {
                var username = _context.Users.Where(x => x.Username == user.Username).FirstOrDefault();
                var email = _context.Users.Where(x => x.Email == user.Email && x.Email != "").FirstOrDefault();
                if (username != null && email != null)
                {
                    return new ApiResponse
                    {
                        Success = false,
                        Message = "Email and Username already exist"
                    };
                }
                if (username != null)
                {
                    return new ApiResponse
                    {
                        Success = false,
                        Message = "Username already exist"
                    };
                }
                if (email != null)
                {
                    return new ApiResponse
                    {
                        Success = false,
                        Message = "Email already exist"
                    };
                }
                //var newUser = _mapper.Map<User>(user);
                var newUsers = new User()
                {
                    Id = Guid.NewGuid(),
                    Name = user.Name,
                    Username = user.Username,
                    Password = user.Password,
                    Avatar = "",
                    DateOfBirth = DateTime.MinValue,
                    Email = user.Email,
                    Phone = user.Phone,
                    Role = Models.RoleType.User,
                    Status = Models.StatusType.Active
                };
                _context.Add(newUsers);
                await _context.SaveChangesAsync();
                return new ApiResponse
                {
                    Success = true,
                    Data = newUsers
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return new ApiResponse
                {
                    Success = false,
                    Message = ex.Message
                };
            }
        }
        public async Task<ApiResponse> UpdateUser(UserUpdateVM user)
        {
            try
            {
                var users = await _context.Users.Where(x => x.Id == user.Id).FirstOrDefaultAsync();
                if (users != null)
                {
                    users.Name = user.Name;
                    users.Avatar = user.Avatar;
                    users.DateOfBirth = user.DateOfBirth;
                    users.Email = user.Email;
                    users.Phone = user.Phone;
                    _context.Update(users);
                    await _context.SaveChangesAsync();
                    return new ApiResponse
                    {
                        Success = true,
                        Data = users
                    };
                }
                return new ApiResponse
                {
                    Success = false,
                    Message = "Account doesn't exist"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return new ApiResponse
                {
                    Success = false,
                    Message = ex.Message
                };
            }
        }
        public async Task<ApiResponse> SendMail(string Email)
        {
            try
            {
                var user = await _context.Users.Where(x => x.Email.Equals(Email)).FirstOrDefaultAsync();
                if (user != null)
                {
                    string fromEmail = "ducnmhe150901@fpt.edu.vn";
                    string password = "gsxmnlhojrlvjeqy";
                    string subject = "M&E NewsPaper - Forgot Password";
                    string verifyString = RandomString(5);
                    string body = "Your code is: " + verifyString;
                    var smtpClient = new SmtpClient("smtp.gmail.com", 587)
                    {
                        UseDefaultCredentials = false,
                        Credentials = new NetworkCredential(fromEmail, password),
                        EnableSsl = true
                    };
                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress(fromEmail),
                        Subject = subject,
                        Body = body
                    };
                    mailMessage.To.Add(Email);
                    smtpClient.Send(mailMessage);
                    return new ApiResponse
                    {
                        Success = true,
                        Message = "Mail Sended",
                        Data = verifyString
                    };
                }
                else
                {
                    return new ApiResponse
                    {
                        Success = false,
                        Message = "Mail doesn't exist."
                    };
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return new ApiResponse
                {
                    Success = false,
                    Message = ex.Message
                };
            }

        }
        public async Task<ApiResponse> ResetPass(ResetPassVM user)
        {
            try
            {
                var users = await _context.Users.Where(x => x.Email == user.Email).FirstOrDefaultAsync();
                //if (users != null && user.VerifyString == user.VerifyString)
                if (users != null)
                {
                    users.Password = user.NewPass;
                    _context.Update(users);
                    await _context.SaveChangesAsync();
                    return new ApiResponse
                    {
                        Success = true,
                        Data = users
                    };
                }
                return new ApiResponse
                {
                    Success = false,
                    Message = "Account doesn't exist"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return new ApiResponse
                {
                    Success = true,
                };
            }
        }

        private static Random random = new Random();
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
        public async Task<ApiResponse> GetUserById(string id)
        {
            try
            {
                var users = await _context.Users.Where(x => x.Id == Guid.Parse(id)).FirstOrDefaultAsync();
                if (users != null)
                {
                    return new ApiResponse
                    {
                        Success = true,
                        Data = users
                    };
                }
                return new ApiResponse
                {
                    Success = false,
                    Message = "Account doesn't exist"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return new ApiResponse
                {
                    Success = true,
                };
            }
        }
        //Admin
        public async Task<ApiResponse> FetchAllUser(int? pageIndex, string search)
        {
            try
            {
                var AllUser = _context.Users.Where(x => x.Name.ToLower().Contains(search != null ? search.ToLower() : "")).ToList();
                //var pageSize = _configuration.GetValue("PageSize", 10);
                //var PaginatedUser = await PaginatedList<User>.CreateAsync(AllUser, pageIndex ?? 1, pageSize);
                return new ApiResponse
                {
                    Success = false,
                    Message = "Fetch Success",
                    Data = AllUser
                };
            }
            catch (Exception ex)
            {
                return new ApiResponse
                {
                    Success = false,
                    Message = ex.ToString()
                };
            }

        }
        public async Task<ApiResponse> BanUser(string id)
        {
            try
            {
                var user = await _context.Users.Where(x => x.Id.Equals(Guid.Parse(id))).FirstOrDefaultAsync();
                if (user != null)
                {
                    user.Status = Models.StatusType.Banned;
                    _context.Update(user);
                    await _context.SaveChangesAsync();
                    return new ApiResponse
                    {
                        Success = true,
                        Data = user
                    };
                }
                return new ApiResponse
                {
                    Success = false,
                    Message = "User is no longer exist"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return new ApiResponse
                {
                    Success = false,
                    Message = ex.Message.ToString()
                };
            }
        }
        public async Task<ApiResponse> UnBanUser(string id)
        {
            try
            {
                var user = await _context.Users.Where(x => x.Id.Equals(Guid.Parse(id))).FirstOrDefaultAsync();
                if (user != null)
                {
                    user.Status = Models.StatusType.Active;
                    _context.Update(user);
                    await _context.SaveChangesAsync();
                    return new ApiResponse
                    {
                        Success = true,
                        Data = user
                    };
                }
                return new ApiResponse
                {
                    Success = false,
                    Message = "User is no longer exist"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return new ApiResponse
                {
                    Success = false,
                    Message = ex.Message.ToString()
                };
            }
        }
        public async Task<ApiResponse> AdminAddUser(UserAdminAddVM user)
        {
            try
            {
                var id = Guid.NewGuid();
                var uploadedFile = user.Avatar;
                if (uploadedFile != null)
                {
                    ImageSaver.SaveImage(uploadedFile, id);
                }
                var newUsers = new User()
                {
                    Id = id,
                    Name = user.Name,
                    Username = user.Username,
                    Password = user.Password,
                    Avatar = uploadedFile != null ? id + uploadedFile?.FileName : "",
                    DateOfBirth = user.DateOfBirth,
                    Email = user.Email != null ? user.Email : "",
                    Phone = user.Phone != null ? user.Phone : "",
                    Role = Ultity.ConvertToEnum<RoleType>(user.Role),
                    Status = Ultity.ConvertToEnum<LearnWebAPI.Models.StatusType>(user.Status),
                };
                _context.Add(newUsers);
                await _context.SaveChangesAsync();
                return new ApiResponse
                {
                    Success = true,
                    Data = newUsers
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return new ApiResponse
                {
                    Success = false,
                    Message = ex.Message.ToString()
                };
            }
        }
        public async Task<ApiResponse> AdminUpdateUser(UserAdminUpdateVM user)
        {
            try
            {
                var uploadedFile = user.Avatar;
                var users = await _context.Users.Where(x => x.Id == user.Id).FirstOrDefaultAsync();
                if (users != null)
                {
                    users.Name = user.Name;
                    users.DateOfBirth = user.DateOfBirth;
                    users.Email = user.Email;
                    users.Phone = user.Phone;
                    users.Username = user.Username;
                    users.Password = user.Password;
                    users.Role = Ultity.ConvertToEnum<RoleType>(user.Role);
                    users.Status = Ultity.ConvertToEnum<LearnWebAPI.Models.StatusType>(user.Status);
                    if (user.Avatar != null)
                    {
                        if (users.Avatar != null)
                        {
                            ImageSaver.RemoveImage(users.Avatar);
                        }
                        ImageSaver.SaveImage(uploadedFile, user.Id);
                        users.Avatar = user.Id + uploadedFile?.FileName;
                    }
                    _context.Update(users);
                    await _context.SaveChangesAsync();
                    return new ApiResponse
                    {
                        Success = true,
                        Data = users
                    };
                }
                return new ApiResponse
                {
                    Success = false,
                    Message = "Account doesn't exist"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return new ApiResponse
                {
                    Success = true,
                };
            }
        }
    }
}
