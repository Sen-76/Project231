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
    }
}
