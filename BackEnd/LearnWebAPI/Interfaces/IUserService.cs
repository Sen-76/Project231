using BackEnd.Paging;
using BackEnd.ViewModels.UserViewModels;
using LearnWebAPI.Models;

namespace LearnWebAPI.Interfaces
{
    public interface IUserService
    {
        Task<User> Login(UserLogin user);
        Task<ApiResponse> Regis(UserAddVM user);
        Task<TokenModel> GenerateToken(User user);
        Task<ApiResponse> RenewToken(TokenModel model);
        Task<ApiResponse> UpdateUser(UserUpdateVM user);
        Task<ApiResponse> SendMail(string Email);
        Task<ApiResponse> ResetPass(ResetPassVM user);
        Task<ApiResponse> FetchAllUser(int? pageIndex, string search);
        Task<ApiResponse> BanUser(string id);
        Task<ApiResponse> UnBanUser(string id);
        Task<ApiResponse> AdminUpdateUser(UserAdminUpdateVM user);
        Task<ApiResponse> AdminAddUser(UserAdminAddVM user);
        Task<ApiResponse> GetUserById(string id);
    }
}
