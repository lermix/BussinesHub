using AutoMapper;
using BH.Model.Dtos;
using BH.Model.General;

namespace BussinesHub.MapperProfiles
{
	public class GeneralProfile : Profile
	{
		public GeneralProfile()
		{
			CreateMap<UserDto, User>();
			CreateMap<User, UserDto>();
			CreateMap<CompanyDto, Company>().ReverseMap();
		}
	}
}
