using BackEnd.Models;
using BackEnd.Paging;
using LearnWebAPI.Models;

namespace BackEnd.Interfaces
{
    public interface ICommentService
    {
        Task<PaginatedList<Comment>> GetListComments(int? pageIndex, string NewsPaperId);
        Task<ApiResponse> GetAllComments(string? filter);
        Task<ApiResponse> DeleteCommentAdmin(string commentId);
        Task<ApiResponse> RestoreDeleteCommentAdmin(string commentId);
        Task<ApiResponse> AddComment(string content, string newspaperId, Guid userId);
        Task<ApiResponse> DeleteComment(string commentId, Guid userId);
        Task<ApiResponse> UpdateComment(string content, string commentId, Guid userId);
    }
}
