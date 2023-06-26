using AutoMapper;
using BackEnd.ViewModels.UserViewModels;
using LearnWebAPI.Interfaces;
using LearnWebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using BackEnd.Ultity;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    [Authorize(Roles = "Admin")]
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

        [HttpGet("UserById")]
        public IActionResult UserById(string id)
        {
            var result = _userService.GetUserById(id).Result;
            return Ok(result);
        }

        [HttpGet("FetchUser")]
        public IActionResult FetchUser(int pageIndex, string? search)
        {
            var result = _userService.FetchAllUser(pageIndex, search).Result;
            return Ok(result);
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
        public IActionResult UpdateUser([FromForm] UserAdminUpdateVM user)
        {
            var result = _userService.AdminUpdateUser(user).Result;
            return Ok(result);
        }
        [HttpPost("AddUser")]
        public IActionResult AddUser([FromForm] UserAdminAddVM user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var result = _userService.AdminAddUser(user).Result;
            return Ok(result);
        }

    }
}
