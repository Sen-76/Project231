using BackEnd.Paging;
using BackEnd.ViewModels.UserViewModels;
using LearnWebAPI.Models;

namespace LearnWebAPI.Interfaces
{
    public interface IUserService
    {
        Task<User> Login(UserLogin user);
        Task<bool> Regis(UserAddVM user);
        Task<TokenModel> GenerateToken(User user);
        Task<ApiResponse> RenewToken(TokenModel model);
        Task<ApiResponse> UpdateUser(UserUpdateVM user);
        Task<ApiResponse> SendMail(string Email);
        Task<ApiResponse> ResetPass(ResetPassVM user);
        Task<ApiResponse> FetchAllUser(int? pageIndex);
        Task<ApiResponse> BanUser(string id);
        Task<ApiResponse> UnBanUser(string id);
        Task<ApiResponse> AdminUpdateUser(User user);
        Task<ApiResponse> AdminAddUser(User user);
        Task<ApiResponse> GetUserById(string id);
    }
}
