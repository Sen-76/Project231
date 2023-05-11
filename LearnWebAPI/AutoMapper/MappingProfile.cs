using AutoMapper;
using LearnWebAPI.Models;
using LearnWebAPI.ViewModels;

namespace LearnWebAPI.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserVM>()
                .ForMember(x => x.Id, otp => otp.MapFrom(src => Guid.NewGuid().ToString()))
                .ForMember(x => x.Email, otp => otp.MapFrom(src => src.Email ?? ""))
                .ForMember(x => x.Phone, otp => otp.MapFrom(src => src.Phone ?? ""))
                .ForMember(x => x.Role, otp => otp.MapFrom(src => src.Role ?? "User"))
            ;
        }
    }
}
