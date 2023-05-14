using LearnWebAPI.Models;

namespace BackEnd.Models
{
    public class Comment
    {
        public Guid Id { get; set; }
        public Guid NewsPaperId { get; set; }
        public NewsPaper? NewsPaper { get; set; }
        public Guid UserId { get; set; }
        public User? User { get; set; }
        public string Content { get; set; }
        public DateTime PostTime { get; set; }
        public bool IsDeleted { get; set; }
    }
}
