using AutoMapper;
using BackEnd.Interfaces;
using BackEnd.Models;
using BackEnd.Paging;
using BackEnd.ViewModels.NewFolder;
using BackEnd.ViewModels.NewsPaperViewModels;
using BackEnd.ViewModels.UserViewModels;
using LearnWebAPI.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
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
                    Image = newsPaper.Image,
                    CreatedDate = DateTime.UtcNow,
                    Status = Models.StatusType.Posted,
                    UserId = Guid.Parse("1a6e8503-ee14-4ee9-95c1-9e5d2205e653"),
                };
                await _context.AddAsync(newsPapers);
                await _context.SaveChangesAsync();
                var newsPaperDetail = new NewsPaperDetail()
                {
                    Id = Guid.NewGuid(),
                    NewsPaperId = newsPapers.Id,
                    UserId = Guid.Parse("1a6e8503-ee14-4ee9-95c1-9e5d2205e653")
                };
                await _context.AddAsync(newsPaperDetail);
                await _context.SaveChangesAsync();
                foreach (var item in newsPaper.CategoryId)
                {
                    var sqlQuery = "INSERT INTO [CategoryNewsPaper] ([CategoriesId], [NewsPapersId]) VALUES (@CategoryId, @NewsPaperId)";
                    await _context.Database.ExecuteSqlRawAsync(sqlQuery,
                        new SqlParameter("@CategoryId", item),
                        new SqlParameter("@NewsPaperId", newsPapers.Id));
                }
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
            var AllNewsPaper = _context.NewsPapers.Include("Categories")
                        .Where(x => x.Status != Models.StatusType.Deleted)
                        .AsNoTracking();
            var pageSize = _configuration.GetValue("PageSize", 4);
            var PaginatedNewsPaper = await PaginatedList<NewsPaper>.CreateAsync(AllNewsPaper, pageIndex ?? 1, pageSize);
            return PaginatedNewsPaper;
        }
      
        public async Task<ApiResponse> GetNewsPaperByCate(string cateId)
        {
            var categoryId = Guid.Parse(cateId);
            var test = _context.NewsPapers.Take(10)
                .Where(x => x.Categories.Any(c => c.Id == categoryId))
                .ToList();
            var cates = await _context.Categories.Where(x => x.Id == categoryId).FirstOrDefaultAsync();
            var testt = new NewsPaperByCateVM()
            {
                cate = cates,
                news = test
            };
            return new ApiResponse
            {
                Success= true,
                Data = testt
            };
        }

        public NewsPaper isExist(Guid id)
        {
            return _context.NewsPapers.Where(x => x.Id== id).SingleOrDefault();
        }

        public async Task<ApiResponse> UpdateNewsPaper(NewsPaperUpdateVM newsPaper)
        {
            try
            {
                var newsPapers = await _context.NewsPapers.Where(x => x.Id.Equals(newsPaper.Id) && x.Status != Models.StatusType.Deleted).FirstOrDefaultAsync();
                if (newsPapers != null)
                {
                    newsPapers.Title = newsPaper.Title;
                    newsPapers.Content = newsPaper.Content;
                    newsPapers.Description = newsPaper.Description;
                    newsPapers.Image = newsPaper.Image;
                    newsPapers.ModifiedDate = DateTime.UtcNow;
                    _context.Update(newsPapers);
                    var sqlDeleteQuery = "DELETE FROM [CategoryNewsPaper] WHERE [NewsPapersId] = @NewsPaperId";
                    await _context.Database.ExecuteSqlRawAsync(sqlDeleteQuery,
                        new SqlParameter("@NewsPaperId", newsPapers.Id));
                    foreach (var item in newsPaper.CategoryId)
                    {
                        var sqlAddQuery = "INSERT INTO [CategoryNewsPaper] ([CategoriesId], [NewsPapersId]) VALUES (@CategoryId, @NewsPaperId)";
                        await _context.Database.ExecuteSqlRawAsync(sqlAddQuery,
                             new SqlParameter("@CategoryId", item),
                             new SqlParameter("@NewsPaperId", newsPapers.Id));
                    }
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
                    newsPaper.Status = Models.StatusType.Deleted;
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
                var newsPaper = await _context.NewsPapers.Where(x => x.Id.Equals(id) && x.Status == Models.StatusType.Posted).FirstOrDefaultAsync();
                if (newsPaper != null)
                {
                    newsPaper.Status = Models.StatusType.Published;
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

        //Admin
        public async Task<PaginatedList<NewsPaper>> FetchNewsPaper(int? pageIndex)
        {
            var AllNews = _context.NewsPapers.AsNoTracking();
            var pageSize = _configuration.GetValue("PageSize", 10);
            var PaginatedNewsPaper = await PaginatedList<NewsPaper>.CreateAsync(AllNews, pageIndex ?? 1, pageSize);
            return PaginatedNewsPaper;
        }
        public async Task<ApiResponse> AdminDeleteNewsPaper(Guid id)
        {
            try
            {
                var newsPaper = await _context.NewsPapers.Where(x => x.Id.Equals(id)).FirstOrDefaultAsync();
                if (newsPaper != null)
                {
                    newsPaper.Status = Models.StatusType.Deleted;
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
        public async Task<ApiResponse> AdminUpdateNewsPaper(NewsPaperUpdateVM newsPaper)
        {
            try
            {
                var newsPapers = await _context.NewsPapers.Where(x => x.Id.Equals(newsPaper.Id) && x.Status != Models.StatusType.Deleted).FirstOrDefaultAsync();
                if (newsPapers != null)
                {
                    newsPapers.Title = newsPaper.Title;
                    newsPapers.Content = newsPaper.Content;
                    newsPapers.Description = newsPaper.Description;
                    newsPapers.Image = newsPaper.Image;
                    newsPapers.ModifiedDate = DateTime.UtcNow;
                    _context.Update(newsPapers);
                    var sqlDeleteQuery = "DELETE FROM [CategoryNewsPaper] WHERE [NewsPapersId] = @NewsPaperId";
                    await _context.Database.ExecuteSqlRawAsync(sqlDeleteQuery,
                        new SqlParameter("@NewsPaperId", newsPapers.Id));
                    foreach (var item in newsPaper.CategoryId)
                    {
                        var sqlAddQuery = "INSERT INTO [CategoryNewsPaper] ([CategoriesId], [NewsPapersId]) VALUES (@CategoryId, @NewsPaperId)";
                        await _context.Database.ExecuteSqlRawAsync(sqlAddQuery,
                             new SqlParameter("@CategoryId", item),
                             new SqlParameter("@NewsPaperId", newsPapers.Id));
                    }
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
        public async Task<ApiResponse> AdminAddNewsPaper(NewsPaperAddVM newsPaper)
        {
            try
            {
                var newsPapers = new NewsPaper()
                {
                    Id = Guid.NewGuid(),
                    Title = newsPaper.Title,
                    Content = newsPaper.Content,
                    Description = newsPaper.Description,
                    Image = newsPaper.Image,
                    CreatedDate = DateTime.UtcNow,
                    Status = Models.StatusType.Posted,
                    UserId = Guid.Parse("1a6e8503-ee14-4ee9-95c1-9e5d2205e653"),
                };
                await _context.AddAsync(newsPapers);
                await _context.SaveChangesAsync();
                var newsPaperDetail = new NewsPaperDetail()
                {
                    Id = Guid.NewGuid(),
                    NewsPaperId = newsPapers.Id,
                    UserId = Guid.Parse("1a6e8503-ee14-4ee9-95c1-9e5d2205e653")
                };
                await _context.AddAsync(newsPaperDetail);
                await _context.SaveChangesAsync();
                foreach (var item in newsPaper.CategoryId)
                {
                    var sqlQuery = "INSERT INTO [CategoryNewsPaper] ([CategoriesId], [NewsPapersId]) VALUES (@CategoryId, @NewsPaperId)";
                    await _context.Database.ExecuteSqlRawAsync(sqlQuery,
                        new SqlParameter("@CategoryId", item),
                        new SqlParameter("@NewsPaperId", newsPapers.Id));
                }
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
        public async Task<ApiResponse> AdminPublishNewsPaper(Guid id)
        {
            try
            {
                var newsPaper = await _context.NewsPapers.Where(x => x.Id.Equals(id) && x.Status == Models.StatusType.Posted).FirstOrDefaultAsync();
                if (newsPaper != null)
                {
                    newsPaper.Status = Models.StatusType.Published;
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
        public async Task<ApiResponse> AdminUnPublishNewsPaper(Guid id)
        {
            try
            {
                var newsPaper = await _context.NewsPapers.Where(x => x.Id.Equals(id) && x.Status == Models.StatusType.Posted).FirstOrDefaultAsync();
                if (newsPaper != null)
                {
                    newsPaper.Status = Models.StatusType.Posted;
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
