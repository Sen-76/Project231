using LearnWebAPI.Models;

namespace BackEnd.Models
{
    public class NewsPaper
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime PublishedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
        public bool IsDeleted { get; set; }
    }
}
