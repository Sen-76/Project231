using BackEnd.Models;

namespace BackEnd.ViewModels.NewsPaperViewModels
{
    public class NewsPaperByCateVM
    {
        public Category cate { get; set; }
        public List<NewsPaper> news { get; set; }
    }
}
