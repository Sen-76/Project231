using AutoMapper;
using LearnWebAPI.Models;
using LearnWebAPI.ViewModels;

namespace LearnWebAPI.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserVM>();
        }
    }
}
