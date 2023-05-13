using System.ComponentModel.DataAnnotations;

namespace BackEnd.ViewModels.UserViewModels
{
    public class UserLogin
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
