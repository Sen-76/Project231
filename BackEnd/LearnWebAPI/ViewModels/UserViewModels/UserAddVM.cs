using System.ComponentModel.DataAnnotations;

namespace BackEnd.ViewModels.UserViewModels
{
    public class UserAddVM
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Avatar { get; set; }
        public DateTime? DateOfBirth { get; set; }
    }
}
