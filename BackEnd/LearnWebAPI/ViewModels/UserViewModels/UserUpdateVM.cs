namespace BackEnd.ViewModels.UserViewModels
{
    public class UserUpdateVM
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Avatar { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}
