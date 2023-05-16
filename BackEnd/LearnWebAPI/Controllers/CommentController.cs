using AutoMapper;
using BackEnd.Interfaces;
using BackEnd.ViewModels.NewFolder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ICommentService _commentService;
        private readonly ILogger<ControllerBase> _logger;
        public CommentController(IMapper mapper, ICommentService commentService, ILogger<ControllerBase> logger)
        {
            _mapper = mapper;
            _commentService = commentService;
            _logger = logger;
        }

        [HttpGet("GetListComment")]
        public IActionResult GetListComment(int? pageIndex, string newsPaperId)
        {
            var result = _commentService.GetListComments(pageIndex, newsPaperId).Result;
            return Ok(result);
        }

        [HttpPost("AddComment")]
        public IActionResult AddComment(string content, string newspaperId)
        {
            var result = _commentService.AddComment(content, newspaperId).Result;
            return Ok(result);
        }

        [HttpPost("DeleteComment")]
        public IActionResult DeleteComment(string commentId)
        {
            var result = _commentService.DeleteComment(commentId).Result;
            return Ok(result);
        }

    }
}
