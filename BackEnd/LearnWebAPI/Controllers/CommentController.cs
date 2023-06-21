using AutoMapper;
using BackEnd.Interfaces;
using BackEnd.Ultity;
using BackEnd.ViewModels.NewFolder;
using LearnWebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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

        [Authorize]
        [HttpPost("AddComment")]
        public IActionResult AddComment(string content, string newspaperId)
        {
            var user = GetCurrentUser.CurrentUser(HttpContext.User.Identity);
            var result = _commentService.AddComment(content, newspaperId, user.Id).Result;
            return Ok(result);
        }

        [Authorize]
        [HttpPost("UpdateComment")]
        public IActionResult UpdateComment(string content, string commentId)
        {
            var user = GetCurrentUser.CurrentUser(HttpContext.User.Identity);
            var result = _commentService.UpdateComment(content, commentId, user.Id).Result;
            return Ok(result);
        }

        [Authorize]
        [HttpPost("DeleteComment")]
        public IActionResult DeleteComment(string commentId)
        {
            var user = GetCurrentUser.CurrentUser(HttpContext.User.Identity);
            var result = _commentService.DeleteComment(commentId, user.Id).Result;
            return Ok(result);
        }

    }
}
