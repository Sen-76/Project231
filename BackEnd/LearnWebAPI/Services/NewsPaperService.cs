using AutoMapper;
using BackEnd.Interfaces;
using BackEnd.Models;
using BackEnd.Paging;
using BackEnd.ViewModels.NewFolder;
using BackEnd.ViewModels.UserViewModels;
using LearnWebAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Configuration;

namespace BackEnd.Services
{
    public class NewsPaperService : INewsPaperService
    {
        private readonly IMapper _mapper;
        private readonly Project231Context _context;
        private readonly ILogger<NewsPaperService> _logger;
        private readonly IConfiguration _configuration;
        public NewsPaperService(IMapper mapper, Project231Context context, ILogger<NewsPaperService> logger, IConfiguration configuration)
        {
            _mapper = mapper;
            _context = context;
            _logger=logger;
            _configuration = configuration;
        }

        public async Task<ApiResponse> AddNewsPaper(NewsPaperAddVM newsPaper)
        {
            try
            {
                var newsPapers = new NewsPaper()
                {
                    Id = Guid.NewGuid(),
                    Title = newsPaper.Title,
                    Content = newsPaper.Content,
                    Description = newsPaper.Description,
                    CreatedDate = DateTime.UtcNow,
                    Status = StatusType.Posted,
                    UserId = Guid.Parse("A0985EB2-6509-4526-BB11-99EDCCD88DDB"),
                };
                await _context.AddAsync(newsPapers);
                await _context.SaveChangesAsync();
                return new ApiResponse
                {
                    Success= true,
                    Data = newsPapers
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return new ApiResponse
                {
                    Success= true,
                };
            }
        }

        public async Task<PaginatedList<NewsPaper>> GetListNewsPaper(int? pageIndex)
        {
            //var AllNewsPaper = _context.NewsPapers.Where(x => x.Status == StatusType.Published).AsNoTracking();
            var AllNewsPaper = _context.NewsPapers.Where(x => x.Status == StatusType.Posted).AsNoTracking();
            var pageSize = _configuration.GetValue("PageSize", 4);
            var PaginatedNewsPaper = await PaginatedList<NewsPaper>.CreateAsync(AllNewsPaper, pageIndex ?? 1, pageSize);
            return PaginatedNewsPaper;
        }

        public NewsPaper isExist(Guid id)
        {
            return _context.NewsPapers.Where(x => x.Id== id).SingleOrDefault();
        }

        public async Task<ApiResponse> UpdateNewsPaper(NewsPaperUpdateVM newsPaper)
        {
            try
            {
                var newsPapers = await _context.NewsPapers.Where(x => x.Id.Equals(newsPaper.Id) && x.Status != StatusType.Deleted).FirstOrDefaultAsync();
                if (newsPapers != null)
                {
                    newsPapers.Id = newsPaper.Id;
                    newsPapers.Title = newsPaper.Title;
                    newsPapers.Content = newsPaper.Content;
                    newsPapers.Description = newsPaper.Description;
                    newsPapers.ModifiedDate = DateTime.UtcNow;
                    _context.Update(newsPapers);
                    await _context.SaveChangesAsync();
                    return new ApiResponse
                    {
                        Success= true,
                        Data = newsPapers
                    };
                }
                return new ApiResponse
                {
                    Success= false,
                    Message = "Account doesn't exist"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return new ApiResponse
                {
                    Success= true,
                };
            }
        }

        public async Task<ApiResponse> DeleteNewsPaper(Guid id)
        {
            try
            {
                var newsPaper = await _context.NewsPapers.Where(x => x.Id.Equals(id)).FirstOrDefaultAsync();
                if (newsPaper != null)
                {
                    newsPaper.Status = StatusType.Deleted;
                    _context.Update(newsPaper);
                    await _context.SaveChangesAsync();
                    return new ApiResponse
                    {
                        Success= true,
                        Data = newsPaper
                    };
                }
                return new ApiResponse
                {
                    Success= false,
                    Message = "Newspaper doesn't exist"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return new ApiResponse
                {
                    Success= false,
                };
            }
        }

        public async Task<ApiResponse> PublishNewsPaper(Guid id)
        {
            try
            {
                var newsPaper = await _context.NewsPapers.Where(x => x.Id.Equals(id) && x.Status == StatusType.Posted).FirstOrDefaultAsync();
                if (newsPaper != null)
                {
                    newsPaper.Status = StatusType.Published;
                    _context.Update(newsPaper);
                    await _context.SaveChangesAsync();
                    return new ApiResponse
                    {
                        Success= true,
                        Data = newsPaper
                    };
                }
                return new ApiResponse
                {
                    Success= false,
                    Message = "Newspaper doesn't exist"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return new ApiResponse
                {
                    Success= false,
                };
            }
        }
    }
}
