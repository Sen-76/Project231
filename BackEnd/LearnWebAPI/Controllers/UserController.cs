using AutoMapper;
using BackEnd.ViewModels.UserViewModels;
using LearnWebAPI.Interfaces;
using LearnWebAPI.Models;
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
        public IActionResult Login(UserLogin user)
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
        public IActionResult Regis(UserVM user)
        {
            try
            {
                var userLogin = _userService.Regis(user).Result;
                if (userLogin == false)
                {
                    return NotFound();
                }
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }
}
