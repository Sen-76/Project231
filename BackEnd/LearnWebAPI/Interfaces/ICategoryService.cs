using LearnWebAPI.Models;

namespace BackEnd.Interfaces
{
    public interface ICategoryService
    {
        Task<ApiResponse> AddCategory(string name);
        Task<ApiResponse> DeleteCategory(string cateId);
        Task<ApiResponse> ListAllCategory();
    }
}
