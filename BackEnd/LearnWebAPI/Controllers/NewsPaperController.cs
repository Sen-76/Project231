using AutoMapper;
using BackEnd.Interfaces;
using BackEnd.ViewModels.UserViewModels;
using LearnWebAPI.Interfaces;
using LearnWebAPI.Models;
using LearnWebAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsPaperController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly INewsPaperServce _newsPaperService;
        private readonly ILogger<ControllerBase> _logger;
        public NewsPaperController(IMapper mapper, INewsPaperServce newsPaperService, ILogger<ControllerBase> logger)
        {
            _mapper = mapper;
            _newsPaperService = newsPaperService;
            _logger = logger;
        }
        //[Authorize]
        [HttpGet("GetListNewsPaper")]
        public IActionResult GetNewsPaperList(int? pageIndex)
        {
            try
            {
                var listNewsPapers = _newsPaperService.GetListNewsPaper(pageIndex).Result;
                return Ok(new ApiResponse
                {
                    Success= true,
                    Data = listNewsPapers
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }
}
