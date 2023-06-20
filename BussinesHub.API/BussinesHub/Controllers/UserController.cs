using AutoMapper;
using BH.Model.Dtos;
using BH.Model.General;
using BH.Repository.Interfaces;
using BussinesHub.Security;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BussinesHub.Controllers
{
	public class UserController : BaseController
	{
		private readonly IUserRepository userRepository;
		public readonly IMapper mapper;

		private readonly JwtTokenService _tokenService;

		public UserController(IUserRepository userRepository, IMapper mapper, IClaimProvider claimProvider, JwtTokenService tokenService)
		{
			this.userRepository = userRepository;
			this.mapper = mapper;
			_tokenService=tokenService;
		}

		[HttpPost]
		public async Task<IActionResult> CreateUser(UserDto userDto)
		{
			if ( userDto == null )
				return BadRequest( "User is null" );

			User user = mapper.Map<User>( userDto );
			user.userFuncEnum = UserFuncEnum.Default;
			await userRepository.CreateUser( user );

			try
			{
				List<Claim> claims = new List<Claim>
				{
					new Claim( ClaimTypes.Role, "User"),
					new Claim( ClaimTypes.Name, userDto.Name ),
				};
				return Ok( _tokenService.CreateToken( claims ) );
			}
			catch ( Exception ex )
			{
				return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
			}
		}

		[HttpPost]
		public async Task<IActionResult> DeleteUser(int UserId)
		{
			int deletedId = await userRepository.DeleteUser( UserId );
			if ( deletedId == -1 )
				NotFound( UserId );

			return Ok( deletedId );
		}
		[HttpPost]
		public async Task<IActionResult> UpdateUser(User user) => Ok( await userRepository.UpdateUser( user ) );
		[HttpGet]
		public async Task<IActionResult> GetUsers() => Ok( await userRepository.GetAllUsers() );
		[HttpGet]
		public async Task<IActionResult> GetUserCompanies(string username) => Ok( await userRepository.GetUserCompanies( username ) );

	}
}
