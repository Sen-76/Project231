using AutoMapper;
using LearnWebAPI.Interfaces;
using LearnWebAPI.Models;
using LearnWebAPI.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet("Login")]
        public IActionResult Login(string user, string password)
        {
            try
            {
                var userLogin = _userService.Login(user, password);
                if(userLogin == null)
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
        [HttpPost("Regis")]
        public IActionResult Regis(UserVM user)
        {
            try
            {
                var userLogin = _userService.Regis(user);
                if (userLogin == null)
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


        //[HttpGet("{id}")]
        //public IActionResult GetById(string id)
        //{
        //    try
        //    {
        //        var hanghoa = hanghoas.SingleOrDefault(h => h.Id == Guid.Parse(id));
        //        if (hanghoa == null)
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            return Ok(hanghoa);
        //        }
        //    }
        //    catch(Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
        //[HttpPost]
        //public IActionResult Create(UserVM hanghoaVM)
        //{
        //    var hanghoa = new User
        //    {
        //        Id = Guid.NewGuid(),
        //        Name = hanghoaVM.Name,
        //        Description= hanghoaVM.Description,
        //        Price= hanghoaVM.Price,
        //    };
        //    hanghoas.Add(hanghoa);
        //    return Ok(new
        //    {
        //        Success = true,
        //        Data = hanghoas
        //    });
        //}
    }
}
