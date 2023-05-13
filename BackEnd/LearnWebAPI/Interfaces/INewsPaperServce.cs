using BackEnd.Models;
using BackEnd.Paging;

namespace BackEnd.Interfaces
{
    public interface INewsPaperServce
    {
        Task<PaginatedList<NewsPaper>> GetListNewsPaper(int? pageIndex);
    }
}
