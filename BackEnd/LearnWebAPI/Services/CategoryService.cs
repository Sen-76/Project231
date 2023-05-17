using AutoMapper;
using BackEnd.Interfaces;
using BackEnd.Models;
using BackEnd.ViewModels.UserViewModels;
using LearnWebAPI.Models;
using LearnWebAPI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace BackEnd.Services
{
    public class CategoryService : ICategoryService

    {
        private readonly IMapper _mapper;
        private readonly Project231Context _context;
        private readonly ILogger<CategoryService> _logger;
        public CategoryService(IMapper mapper, Project231Context context, ILogger<CategoryService> logger)
        {
            _mapper = mapper;
            _context = context;
            _logger = logger;
        }
        public async Task<ApiResponse> AddCategory(string name)
        {
            try
            {
                var cate = new Category()
                {
                    Id = Guid.NewGuid(),
                    Name = name,
                };
                _context.Add(cate);
                await _context.SaveChangesAsync();
                return new ApiResponse
                {
                    Success= true,
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
        public async Task<ApiResponse> DeleteCategory(string cateId)
        {
            try
            {
                var cate = _context.Categories.Where(x => x.Id.Equals(Guid.Parse(cateId))).FirstOrDefault();
                _context.Remove(cate);
                await _context.SaveChangesAsync();
                return new ApiResponse
                {
                    Success= true,
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
        public async Task<ApiResponse> ListAllCategory()
        {
            try
            {
                var cateList = _context.Categories.ToList();
                return new ApiResponse
                {
                    Success= true,
                    Data = cateList
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
