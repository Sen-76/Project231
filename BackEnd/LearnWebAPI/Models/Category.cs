namespace BackEnd.Models
{
    public class Category
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<NewsPaper>? NewsPapers { get; set; }
    }
}
