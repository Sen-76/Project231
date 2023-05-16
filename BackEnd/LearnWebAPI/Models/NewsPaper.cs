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
        public DateTime? PublishedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public Guid UserId { get; set; }
        public User? User { get; set; }
        public StatusType Status { get; set; }
        public List<Category>? Categories { get; set; }
    }
    public enum StatusType : byte
    {
        Posted = 0,
        Published = 1,
        Deleted = 2,
    }
}
