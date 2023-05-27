using AutoMapper;
using BackEnd.Interfaces;
using BackEnd.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsDetailController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly INewsDetailService _newsDetailService;
        private readonly ILogger<ControllerBase> _logger;
        public NewsDetailController(IMapper mapper, INewsDetailService newsDetailService, ILogger<ControllerBase> logger)
        {
            _mapper = mapper;
            _newsDetailService = newsDetailService;
            _logger = logger;
        }

        [HttpGet("GetNewDetail")]
        public IActionResult GetNewDetail(string newId)
        {
            var result = _newsDetailService.GetNewsDetail(newId).Result;
            return Ok(result);
        }

        [HttpPost("Like")]
        public IActionResult Like(string newId)
        {
            var result = _newsDetailService.Like(newId).Result;
            return Ok(result);
        }

        [HttpPost("DisLike")]
        public IActionResult DisLike(string newId)
        {
            var result = _newsDetailService.DisLike(newId).Result;
            return Ok(result);
        }

        [HttpPost("UnLike")]
        public IActionResult UnLike(string newId)
        {
            var result = _newsDetailService.UnLike(newId).Result;
            return Ok(result);
        }

        [HttpPost("UnDisLike")]
        public IActionResult UnDisLike(string newId)
        {
            var result = _newsDetailService.UnDisLike(newId).Result;
            return Ok(result);
        }

        [HttpPost("Rate")]
        public IActionResult Rate(string newId, int rate)
        {
            var result = _newsDetailService.Rate(newId, rate).Result;
            return Ok(result);
        }
    }
}
