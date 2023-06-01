using BackEnd.Models;
using LearnWebAPI.Models;

namespace BackEnd.ViewModels.NewsDetailViewModels
{
    public class NewsPaperDetailVM
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string? Description { get; set; }
        public string? Image { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? PublishedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int Rate { get; set; }
        public int VoteCount { get; set; }
        public int Like { get; set; }
        public int Dislike { get; set; }
        public User Author { get; set; }
        public Guid next { get; set; }
        public Guid prev { get; set; }
    }
}
