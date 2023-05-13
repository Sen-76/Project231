using BackEnd.ViewModels.UserViewModels;
using LearnWebAPI.Models;

namespace LearnWebAPI.Interfaces
{
    public interface IUserService
    {
        Task<User> Login(UserLogin user);
        Task<bool> Regis(UserVM user);
        Task<TokenModel> GenerateToken(User user);
        Task<ApiResponse> RenewToken(TokenModel model);
    }
}
