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
		public readonly ISymmetricEncryptionDecryptionManager _encryptor;

		private readonly JwtTokenService _tokenService;

		public UserController( IUserRepository userRepository, IMapper mapper, IClaimProvider claimProvider, JwtTokenService tokenService, ISymmetricEncryptionDecryptionManager encryptor )
		{
			this.userRepository = userRepository;
			this.mapper = mapper;
			_tokenService = tokenService;
			_encryptor = encryptor;
		}

		[HttpPost]
		public async Task<IActionResult> CreateUser(UserDto userDto)
		{
			if ( userDto == null )
				return BadRequest( "User is null" );

			User user = mapper.Map<User>( userDto );
			user.userFuncEnum = UserFuncEnum.Default;
			user.Password = _encryptor.Encrypt( userDto.Password );
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
		public async Task<IActionResult> DeleteUser(string username)
		{
			string deletedUsername = await userRepository.DeleteUser( username );
			if ( string.IsNullOrEmpty(deletedUsername))
				NotFound( username );

			return Ok( deletedUsername );
		}
		[HttpPost]
		public async Task<IActionResult> UpdateUser(User user) => Ok( await userRepository.UpdateUser( user ) );
		[HttpGet]
		public async Task<IActionResult> GetUsers() => Ok( await userRepository.GetAllUsers() );
		[HttpGet]
		public async Task<IActionResult> GetUserCompanies(string username) => Ok( await userRepository.GetUserCompanies( username ) );
		[HttpGet]
		public async Task<IActionResult> SetUserCompany( string username, int companyId ) => Ok( await userRepository.SetUserCompany( username, companyId ) );

	}
}
