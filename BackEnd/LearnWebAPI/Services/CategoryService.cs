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
        public async Task<bool> AddCategory(string name)
        {
            try
            {
                var newUsers = new Category()
                {
                    Id = Guid.NewGuid(),
                    Name = name,
                };
                _context.Add(newUsers);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return false;
            }
        }
        public async Task<bool> DeleteCategory(string cateId)
        {
            try
            {
                var newUsers = _context.Categories.Where(x => x.Id.Equals(Guid.Parse(cateId))).FirstOrDefault();
                _context.Remove(newUsers);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return false;
            }
        }
    }
}
