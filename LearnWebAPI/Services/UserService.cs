﻿using AutoMapper;
using LearnWebAPI.Interfaces;
using LearnWebAPI.Models;
using LearnWebAPI.ViewModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace LearnWebAPI.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly Project231Context _context;
        private readonly AppSetting _appSettings;
        public UserService(IMapper mapper, Project231Context context, IOptionsMonitor<AppSetting> optionsMonitor)
        {
            _mapper = mapper;
            _context = context;
            _appSettings = optionsMonitor.CurrentValue;
        }

        public async Task<TokenModel> GenerateToken(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var secretKeyBytes = Encoding.UTF8.GetBytes(_appSettings.SecretKey);
            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Name),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim("Username", user.Username),
                    new Claim("Id", user.Id.ToString()),

                    //roles

                    new Claim("TokenId", Guid.NewGuid().ToString())
                }),
                Expires = DateTime.UtcNow.AddMinutes(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey
                (secretKeyBytes), SecurityAlgorithms.HmacSha512Signature)
            };
            var token = jwtTokenHandler.CreateToken(tokenDescription);
            var accessToken = jwtTokenHandler.WriteToken(token);
            var refreshToken = GenerateRefreshToken();

            //Lưu db
            var refreshTokenEntity = new RefreshToken
            {
                Id =Guid.NewGuid(),
                UserId= user.Id,
                JwtId = token.Id,
                Token = refreshToken,
                IsUsed= false,
                IsRevoked= false,
                IssuedAt= DateTime.UtcNow,
                ExpiredAt= DateTime.UtcNow.AddHours(1)
            };
            await _context.AddAsync(refreshTokenEntity);
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
                            Success= false,
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
                        Success= false,
                        Message = "Access token has not yet expired",
                    };
                }

                // Check 4: Check refresh token exist in db
                var storedToken = _context.RefreshTokens.FirstOrDefault(x => x.Token == model.RefreshToken);
                if (storedToken == null)
                {
                    return new ApiResponse
                    {
                        Success= false,
                        Message= "Refresh token does not exist"
                    };
                }

                // Check 5: Check refresh token isUsed/revoked
                if (storedToken.IsUsed)
                {
                    return new ApiResponse
                    {
                        Success= false,
                        Message= "Refresh token has been used"
                    };
                }
                if (storedToken.IsRevoked)
                {
                    return new ApiResponse
                    {
                        Success= false,
                        Message= "Refresh token has been revoked"
                    };
                }

                // Check 6: Check refresh token isUsed/revoked
                var jti = tokenInVerification.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti).Value;
                if(storedToken.JwtId != jti)
                {
                    return new ApiResponse
                    {
                        Success= false,
                        Message= "Token doesn't match"
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
                    Success= true,
                    Message= "Renew token Success",
                    Data = token
                };
            }
            catch (Exception ex)
            {
                return new ApiResponse
                {
                    Success= false,
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
            return await _context.Users.Where(x => x.Username == user.Username && x.Password == user.Password).FirstOrDefaultAsync();
        }
        public async Task<bool> Regis(UserVM user)
        {
            try
            {
                //var newUser = _mapper.Map<User>(user);
                var newUsers = new User()
                {
                    Id = Guid.NewGuid(),
                    Name = user.Name,
                    Username = user.Username,
                    Password = user.Password,
                    Email= user.Email,
                    Phone= user.Phone,
                    Role = "User"
                };
                _context.Add(newUsers);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return false;
            }
        }
    }
}
