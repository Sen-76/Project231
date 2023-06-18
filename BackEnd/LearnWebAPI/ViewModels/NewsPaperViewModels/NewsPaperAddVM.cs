using LearnWebAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace BackEnd.ViewModels.NewFolder
{
    public class NewsPaperAddVM
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public string Content { get; set; }
        public string? Description { get; set; }
        public IFormFile Image { get; set; }
        public string? CategoryId { get; set; }
    }
}
