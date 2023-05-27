using AutoMapper;
using BackEnd.Interfaces;
using BackEnd.Models;
using BackEnd.ViewModels.NewsDetailViewModels;
using LearnWebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Services
{
    public class NewsDetailService : INewsDetailService
    {
        private readonly IMapper _mapper;
        private readonly Project231Context _context;
        private readonly ILogger<NewsDetailService> _logger;
        public NewsDetailService(IMapper mapper, Project231Context context, ILogger<NewsDetailService> logger)
        {
            _mapper = mapper;
            _context = context;
            _logger = logger;
        }
        public async Task<ApiResponse> GetNewsDetail(string newsId)
        {
            try
            {
                NewsPaperDetailVM detail = new NewsPaperDetailVM();
                List<NewsPaper> newss = await _context.NewsPapers.ToListAsync();
                for (int i = 0; i < newss.Count; i++)
                {
                    if (newss[i].Id == Guid.Parse(newsId))
                    {
                        if (newss.Count > 1)
                            detail.prev = newss[i - 1].Id;
                        if (i < newss.Count - 1)
                            detail.next = newss[i + 1].Id;
                    }
                }
                List<NewsPaperDetail> newsdetal = await _context.NewsPaperDetails.Where(x => x.NewsPaperId == Guid.Parse(newsId)).ToListAsync();
                NewsPaper news = await _context.NewsPapers.Where(x => x.Id == Guid.Parse(newsId)).FirstOrDefaultAsync();
                User author = await _context.Users.Where(x => x.Id == news.UserId).FirstOrDefaultAsync();
                var countLike = 0;
                var countDisLike = 0;
                var count = 0;
                var totalRate = 0;
                var averageRate = 0;
                foreach (var item in newsdetal)
                {
                    if (item.Like == true)
                    {
                        countLike++;
                    }
                    if (item.Dislike == true)
                    {
                        countDisLike++;
                    }
                    if (item.Rate > 0)
                    {
                        count++;
                        totalRate += (int)(item.Rate);
                    }
                }
                if (count != 0)
                {
                    averageRate = totalRate/count;
                }
                detail.Id = news.Id;
                detail.Title = news.Title;
                detail.Content= news.Content;
                detail.Description = news.Description;
                detail.CreatedDate = news.CreatedDate;
                detail.PublishedDate = news.PublishedDate;
                detail.ModifiedDate = news.ModifiedDate;
                detail.Like = countLike;
                detail.Dislike = countDisLike;
                detail.VoteCount = count;
                detail.Rate = averageRate;
                detail.Author = author;
                return new ApiResponse
                {
                    Success= true,
                    Data= detail
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
        public async Task<ApiResponse> Like(string newsId)
        {
            try
            {
                NewsPaperDetail newsdetal = await _context.NewsPaperDetails.Where(x => x.NewsPaperId == Guid.Parse(newsId) && x.UserId == Guid.Parse("117D2DE8-7B3C-45CA-9DA1-958C38D57BE7")).FirstOrDefaultAsync();
                newsdetal.Like = true;
                newsdetal.Dislike = false;
                _context.Update(newsdetal);
                await _context.SaveChangesAsync();
                return new ApiResponse
                {
                    Success= true,
                    Data= newsdetal
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
        public async Task<ApiResponse> UnLike(string newsId)
        {
            try
            {
                NewsPaperDetail newsdetal = await _context.NewsPaperDetails.Where(x => x.NewsPaperId == Guid.Parse(newsId) && x.UserId == Guid.Parse("117D2DE8-7B3C-45CA-9DA1-958C38D57BE7")).FirstOrDefaultAsync();
                newsdetal.Like = false;
                _context.Update(newsdetal);
                await _context.SaveChangesAsync();
                return new ApiResponse
                {
                    Success= true,
                    Data= newsdetal
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
        public async Task<ApiResponse> DisLike(string newsId)
        {
            try
            {
                NewsPaperDetail newsdetal = _context.NewsPaperDetails.Where(x => x.NewsPaperId == Guid.Parse(newsId) && x.UserId == Guid.Parse("117D2DE8-7B3C-45CA-9DA1-958C38D57BE7")).FirstOrDefault();
                newsdetal.Like = false;
                newsdetal.Dislike = true;
                _context.Update(newsdetal);
                await _context.SaveChangesAsync();
                return new ApiResponse
                {
                    Success= true,
                    Data= newsdetal
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
        public async Task<ApiResponse> UnDisLike(string newsId)
        {
            try
            {
                NewsPaperDetail newsdetal = _context.NewsPaperDetails.Where(x => x.NewsPaperId == Guid.Parse(newsId) && x.UserId == Guid.Parse("117D2DE8-7B3C-45CA-9DA1-958C38D57BE7")).FirstOrDefault();
                newsdetal.Dislike = false;
                _context.Update(newsdetal);
                await _context.SaveChangesAsync();
                return new ApiResponse
                {
                    Success= true,
                    Data= newsdetal
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
        public async Task<ApiResponse> Rate(string newsId, int rate)
        {
            try
            {
                NewsPaperDetail newsdetal = _context.NewsPaperDetails.Where(x => x.NewsPaperId == Guid.Parse(newsId) && x.UserId == Guid.Parse("117D2DE8-7B3C-45CA-9DA1-958C38D57BE7")).FirstOrDefault();
                newsdetal.Rate = rate;
                _context.Update(newsdetal);
                await _context.SaveChangesAsync();
                return new ApiResponse
                {
                    Success= true,
                    Data= newsdetal
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
