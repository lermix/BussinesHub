using AutoMapper;
using BH.Model.Dtos;
using BH.Model.General;
using BH.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BussinesHub.Controllers
{
	public class UserController : BaseController
	{
		private readonly IUserRepository userRepository;
		public readonly IMapper mapper;

		public UserController( IUserRepository userRepository, IMapper mapper )
		{
			this.userRepository = userRepository;
			this.mapper = mapper;
		}

		[HttpPost]
		public async Task<IActionResult> CreateUser( UserDto userDto )
		{
			if ( userDto == null )
				return BadRequest( "User is null" );

			User user = mapper.Map<User>( userDto );
			user.userFuncEnum = UserFuncEnum.Default;
			await userRepository.CreateUser( user );
			return Ok( );
		}

		[HttpPost]
		public async Task<IActionResult> DeleteUser( int UserId )
		{
			int deletedId = await userRepository.DeleteUser( UserId );
			if ( deletedId == -1 )
				NotFound( UserId );

			return Ok( deletedId );
		}
		[HttpPost]
		public async Task<IActionResult> UpdateUser( User user ) => Ok( userRepository.UpdateUser( user ) );
		[HttpGet]
		public async Task<IActionResult> GetUsers() => Ok( userRepository.GetAllUsers() );
		[HttpPost]
		public async Task<IActionResult> AddCompanyToUser( int userId, int companyId ) => Ok( userRepository.AddCompanyToUser( userId, companyId ) );


	}
}
