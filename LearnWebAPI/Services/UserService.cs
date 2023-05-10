using AutoMapper;
using LearnWebAPI.Interfaces;
using LearnWebAPI.Models;
using LearnWebAPI.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace LearnWebAPI.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly Project231Context _context;
        public UserService(IMapper mapper, Project231Context context)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<User> Login(string user, string password)
        {
            return await _context.Users.Where(x => x.Username == user && x.Password == password).FirstOrDefaultAsync();
        }
        public async Task<User> Regis(UserVM user)
        {
            var newUser = _mapper.Map<User>(user);
            _context.Add(newUser);
            await _context.SaveChangesAsync();
            return newUser;
        }
    }
}
