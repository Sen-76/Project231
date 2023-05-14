using BackEnd.Models;
using BackEnd.Paging;
using LearnWebAPI.Models;

namespace BackEnd.Interfaces
{
    public interface ICommentService
    {
        Task<PaginatedList<Comment>> GetListComments(int? pageIndex, string NewsPaperId);
        Task<ApiResponse> AddComment(string content, string newspaperId);
    }
}
