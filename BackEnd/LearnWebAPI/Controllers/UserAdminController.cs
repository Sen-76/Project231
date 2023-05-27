using AutoMapper;
using LearnWebAPI.Interfaces;
using LearnWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

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
        [HttpGet("FetchUser")]
        [EnableQuery]
        public IActionResult FetchUser(int pageIndex)
        {
            var result = _userService.FetchAllUser(pageIndex).Result;
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
    }
}
