using LearnWebAPI.Models;
using LearnWebAPI.ViewModels;

namespace LearnWebAPI.Interfaces
{
    public interface IUserService
    {
        Task<User> Login(string user, string password);
        Task<User> Regis(UserVM user);
    }
}
