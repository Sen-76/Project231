using LearnWebAPI.Models;

namespace BackEnd.Models
{
    public class NewsPaperDetail
    {
        public Guid Id { get; set; }
        public Guid NewsPaperId { get; set; }
        public NewsPaper? NewsPaper { get; set; }
        public Guid UserId { get; set; }
        public User? User { get; set; }
        public int? Rate { get; set; }
        public bool? Like { get; set; }
        public bool? Dislike { get; set; }
    }
}
