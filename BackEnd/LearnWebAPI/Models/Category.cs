using System.Text.Json.Serialization;

namespace BackEnd.Models
{
    public class Category
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        [JsonIgnore]
        public List<NewsPaper>? NewsPapers { get; set; }
    }
}
