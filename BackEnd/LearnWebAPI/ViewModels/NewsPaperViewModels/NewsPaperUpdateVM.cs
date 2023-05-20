namespace BackEnd.ViewModels.NewFolder
{
    public class NewsPaperUpdateVM
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string? Description { get; set; }
        public List<Guid> CategoryId { get; set; }
    }
}
