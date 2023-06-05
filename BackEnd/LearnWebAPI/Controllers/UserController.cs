using AutoMapper;
using BackEnd.ViewModels.NewFolder;
using BackEnd.ViewModels.UserViewModels;
using LearnWebAPI.Interfaces;
using LearnWebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace LearnWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        private readonly ILogger<ControllerBase> _logger;
        public UserController(IMapper mapper, IUserService userService, ILogger<ControllerBase> logger)
        {
            _mapper = mapper;
            _userService = userService;
            _logger = logger;
        }

        [HttpPost("RenewToken")]
        public IActionResult RenewToken(TokenModel model)
        {
            var renew = _userService.RenewToken(model).Result;
            if (renew != null)
            {
                return Ok(renew);
            }
            return Ok(renew);
        }

        [HttpPost("Login")]
        public IActionResult Login([FromBody] UserLogin user)
        {
            try
            {
                var userLogin = _userService.Login(user).Result;
                if (userLogin == null)
                {
                    return Ok(new ApiResponse
                    {
                        Success = false,
                        Message = "Invalid username or password"
                    });
                }

                // Cấp token
                var token = _userService.GenerateToken(userLogin).Result;
                return Ok(new ApiResponse
                {
                    Success = true,
                    Message = "Authenticate success",
                    Data = token
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("Regis")]
        public IActionResult Regis(UserAddVM user)
        {
            try
            {
                var userLogin = _userService.Regis(user).Result;
                if (userLogin.Success == false)
                {
                    return NotFound();
                }
                return Ok(userLogin);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("UpdateUser")]
        [Authorize(Roles = "Administrator")]
        public IActionResult UpdateUser(UserUpdateVM user)
        {
            try
            {
                var listNewsPapers = _userService.UpdateUser(user).Result;
                return Ok(listNewsPapers);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        
        [HttpPost("ForgotPass")]
        public IActionResult ForgotPass(string Email)
        {
            try
            {
                var listNewsPapers = _userService.SendMail(Email).Result;
                return Ok(listNewsPapers);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
      
        [HttpPost("ResetPass")]
        public IActionResult ResetPass(ResetPassVM user)
        {
            try
            {
                var listNewsPapers = _userService.ResetPass(user).Result;
                return Ok(listNewsPapers);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }
}
