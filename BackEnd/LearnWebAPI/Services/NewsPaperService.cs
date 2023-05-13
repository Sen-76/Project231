using AutoMapper;
using BackEnd.Interfaces;
using BackEnd.Models;
using BackEnd.Paging;
using BackEnd.ViewModels.UserViewModels;
using LearnWebAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Configuration;

namespace BackEnd.Services
{
    public class NewsPaperService : INewsPaperServce
    {
        private readonly IMapper _mapper;
        private readonly Project231Context _context;
        private readonly ILogger<NewsPaperService> _logger;
        private readonly IConfiguration configuration;
        public NewsPaperService(IMapper mapper, Project231Context context, ILogger<NewsPaperService> logger)
        {
            _mapper = mapper;
            _context = context;
            _logger=logger;
        }
        public async Task<PaginatedList<NewsPaper>> GetListNewsPaper(int? pageIndex)
        {
            var AllNewsPaper = _context.NewsPapers.Where(x => x.IsDeleted == false).AsNoTracking();
            //var pageSize = configuration.GetValue("PageSize", 4);
            var PaginatedNewsPaper = await PaginatedList<NewsPaper>.CreateAsync(AllNewsPaper, pageIndex ?? 1, 4);
            return PaginatedNewsPaper;
        }
    }
}
