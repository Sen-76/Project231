using AutoMapper;
using BackEnd.Interfaces;
using BackEnd.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ICategoryService _categoryService;
        private readonly ILogger<ControllerBase> _logger;
        public CategoryController(IMapper mapper, ICategoryService categoryService, ILogger<ControllerBase> logger)
        {
            _mapper = mapper;
            _categoryService = categoryService;
            _logger = logger;
        }

        [HttpPost("AddCate")]
        [Authorize(Roles = "Admin")]
        public IActionResult AddCate(string name)
        {
            var result = _categoryService.AddCategory(name).Result;
            return Ok(result);
        }

        [HttpPost("DeleteCate")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteCate(string cateId)
        {
            var result = _categoryService.DeleteCategory(cateId).Result;
            return Ok(result);
        }

        [HttpGet("GetCate")]
        public IActionResult GetCate()
        {
            var result = _categoryService.ListAllCategory().Result;
            return Ok(result);
        }
    }
}
