using System.ComponentModel.DataAnnotations;

namespace LearnWebAPI.ViewModels
{
    public class UserLogin
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
