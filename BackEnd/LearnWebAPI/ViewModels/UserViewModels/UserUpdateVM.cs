using System.ComponentModel.DataAnnotations;

namespace BackEnd.ViewModels.UserViewModels
{
    public class UserUpdateVM
    {
        [Required]
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Avatar { get; set; }
        public DateTime? DateOfBirth { get; set; }
    }
}
