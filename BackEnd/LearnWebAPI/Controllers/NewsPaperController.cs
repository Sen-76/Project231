﻿using AutoMapper;
using BackEnd.Interfaces;
using BackEnd.ViewModels.NewFolder;
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
    //[Authorize]
    public class NewsPaperController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly INewsPaperService _newsPaperService;
        private readonly ILogger<ControllerBase> _logger;
        public NewsPaperController(IMapper mapper, INewsPaperService newsPaperService, ILogger<ControllerBase> logger)
        {
            _mapper = mapper;
            _newsPaperService = newsPaperService;
            _logger = logger;
        }

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

        [HttpPost("AddNewsPaper")]
        public IActionResult AddNewsPaper(NewsPaperAddVM newsPaper)
        {
            try
            {
                var listNewsPapers = _newsPaperService.AddNewsPaper(newsPaper).Result;
                return Ok(listNewsPapers);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("UpdateNewsPaper")]
        public IActionResult UpdateNewsPaper(NewsPaperUpdateVM newsPaper)
        {
            try
            {
                var listNewsPapers = _newsPaperService.UpdateNewsPaper(newsPaper).Result;
                return Ok(listNewsPapers);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("DeleteNewsPaper")]
        public IActionResult DeleteNewsPaper(Guid id)
        {
            try
            {
                var listNewsPapers = _newsPaperService.DeleteNewsPaper(id).Result;
                return Ok(listNewsPapers);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
   
        [HttpPost("PublishNewsPaper")]
        public IActionResult PublishNewsPaper(Guid id)
        {
            try
            {
                var listNewsPapers = _newsPaperService.PublishNewsPaper(id).Result;
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
