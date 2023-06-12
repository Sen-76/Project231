using BackEnd.Models;
using BackEnd.Ultity;

namespace LearnWebAPI.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Avatar { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public RoleType Role { get; set; }
        public StatusType Status { get; set; }
    }

    public enum RoleType : byte
    {
        [EnumAttribute(0)]
        User = 0,
        [EnumAttribute(1)]
        Writer = 1,
        [EnumAttribute(2)]
        Leader = 2,
        [EnumAttribute(3)]
        Editor = 3,
        [EnumAttribute(4)]
        Admin = 4
    }

    public enum StatusType : byte
    {
        [EnumAttribute(0)]
        NotActive = 0,
        [EnumAttribute(1)]
        Active = 1,
        [EnumAttribute(2)]
        Banned = 2
    }
}
