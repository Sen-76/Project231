using AutoMapper;
using BackEnd.Interfaces;
using BackEnd.Models;
using BackEnd.Paging;
using BackEnd.ViewModels.NewFolder;
using LearnWebAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BackEnd.Services
{
    public class CommentService : ICommentService
    {
        private readonly IMapper _mapper;
        private readonly Project231Context _context;
        private readonly ILogger<CommentService> _logger;
        private readonly IConfiguration _configuration;
        public CommentService(IMapper mapper, Project231Context context, ILogger<CommentService> logger, IConfiguration configuration)
        {
            _mapper = mapper;
            _context = context;
            _logger=logger;
            _configuration=configuration;
        }

        public async Task<PaginatedList<Comment>> GetListComments(int? pageIndex, string NewsPaperId)
        {
            var AllComments = _context.Comments.Include(x => x.User).Where(x => x.IsDeleted == false && x.NewsPaperId.Equals(Guid.Parse(NewsPaperId))).AsNoTracking();
            var pageSize = _configuration.GetValue("PageSize", 10);
            var PaginatedComments = await PaginatedList<Comment>.CreateAsync(AllComments, pageIndex ?? 1, pageSize);
            return PaginatedComments;
        }
        public async Task<ApiResponse> AddComment(string content, string newspaperId, Guid userId)
        {
            try
            {
                var comment = new Comment()
                {
                    Id = Guid.NewGuid(),
                    Content = content,
                    IsDeleted= false,
                    PostTime= DateTime.UtcNow,
                    UserId = userId,
                    NewsPaperId = Guid.Parse(newspaperId),
                };
                await _context.AddAsync(comment);
                await _context.SaveChangesAsync();
                return new ApiResponse
                {
                    Success= true,
                    Data = comment
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return new ApiResponse
                {
                    Success= false,
                    Message= ex.Message
                };
            }
        }
        public async Task<ApiResponse> UpdateComment(string content, string commentId, Guid userId)
        {
            try
            {
                var comment = _context.Comments.Where(x => x.Id == Guid.Parse(commentId) && x.UserId == userId).FirstOrDefault();
                comment.Content = content;
                _context.Update(comment);
                await _context.SaveChangesAsync();
                return new ApiResponse
                {
                    Success= true,
                    Data = comment
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return new ApiResponse
                {
                    Success= false,
                };
            }
        }
        public async Task<ApiResponse> DeleteComment(string commentId, Guid userId)
        {
            try
            {
                var comment = _context.Comments.Where(x => x.Id == Guid.Parse(commentId) && x.UserId == userId).FirstOrDefault();
                if (comment != null)
                {
                    comment.IsDeleted = true;
                    _context.Update(comment);
                    await _context.SaveChangesAsync();
                    return new ApiResponse
                    {
                        Success = false,
                        Data = comment
                    };
                }
                return new ApiResponse
                {
                    Success = true,
                    Message = "Không có quyền đừng có mà vớ vẩn"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return new ApiResponse
                {
                    Success= true,
                };
            }
        }
    }
}
