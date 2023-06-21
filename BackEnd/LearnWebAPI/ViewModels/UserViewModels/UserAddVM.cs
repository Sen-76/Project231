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
        [RegularExpression(@"^[a-zA-Z0-9~!+#$%^&*=`{}.|_'?\/-]{1,64}@(?=[a-zA-Z0-9]{1,253}(\.[a-zA-Z0-9-]{1,253}){1,255}$)[a-zA-Z0-9.-]{1,255}$")]
        public string? Email { get; set; }
        [RegularExpression(@"^\d{10}$")]
        public string? Phone { get; set; }
    }
}
