namespace LearnWebAPI.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Avatar { get; set; }
        public DateTime DateOfBirth { get; set; }
        public RoleType Role { get; set; }
    }

    public enum RoleType : byte
    {
        User = 0,
        Writer = 1,
        Leader = 2,
        Editor = 3,
        Admin = 4
    }
}
