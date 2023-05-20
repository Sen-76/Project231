using LearnWebAPI.Models;

namespace BackEnd.Interfaces
{
    public interface INewsDetailService
    {
        Task<ApiResponse> GetNewsDetail(string newsId);
        Task<ApiResponse> Like(string newsId);
        Task<ApiResponse> DisLike(string newsId);
        Task<ApiResponse> Rate(string newsId, int rate);
    }
}
