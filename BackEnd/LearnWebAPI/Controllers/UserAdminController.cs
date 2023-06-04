using AutoMapper;
using LearnWebAPI.Interfaces;
using LearnWebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using System.Security.Claims;
namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAdminController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        private readonly ILogger<ControllerBase> _logger;
        public UserAdminController(IMapper mapper, IUserService userService, ILogger<ControllerBase> logger)
        {
            _mapper = mapper;
            _userService = userService;
            _logger = logger;
        }
        private User GetCurrentUser()
        {
            var identity = HttpContext.User.Identity;

            if (identity != null && identity.IsAuthenticated && identity is ClaimsIdentity claimsIdentity)
            {
                var userClaims = claimsIdentity.Claims;

                return new User
                {
                    Username = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value,
                    Role = Enum.Parse<RoleType>(userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Role)?.Value)
                };
            }
            return null;
        }
        
        [HttpGet("UserById")]
        public IActionResult UserById(string id)
        {
            var result = _userService.GetUserById(id).Result;
            return Ok(result);
        }
        [HttpGet("FetchUser")]
        [EnableQuery]
        public IActionResult FetchUser(int pageIndex)
        {
            var result = _userService.FetchAllUser(pageIndex).Result;
            return Ok(result);
            //var currentUser = GetCurrentUser();

            //if (currentUser != null)
            //{
            //    return Ok(currentUser);
            //}
            //return Unauthorized();
        }
        [HttpPost("BanUser")]
        public IActionResult BanUser(string id)
        {
            var result = _userService.BanUser(id).Result;
            return Ok(result);
        }
        [HttpPost("UnBanUser")]
        public IActionResult UnBanUser(string id)
        {
            var result = _userService.UnBanUser(id).Result;
            return Ok(result);
        }
        [HttpPost("UpdateUser")]
        public IActionResult UpdateUser(User user)
        {
            var result = _userService.AdminUpdateUser(user).Result;
            return Ok(result);
        }
        [HttpPost("AddUser")]
        public IActionResult AddUser(User user)
        {
            var result = _userService.AdminAddUser(user).Result;
            return Ok(result);
        }
   
    }
}
