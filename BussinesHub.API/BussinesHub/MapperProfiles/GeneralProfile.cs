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
			CreateMap<Product, ProductDto>()
				.ForMember( dest => dest.ImagesIds, opt => opt.MapFrom( src => src.Images.Select( x => x.Id) ) )
				.ForMember( dest => dest.CategoriesIds, opt => opt.MapFrom( src => src.Categories.Select( x => x.Id) ) )
				.ReverseMap();
			CreateMap<Category, CategoryDto>().ReverseMap();

		}
	}
}
