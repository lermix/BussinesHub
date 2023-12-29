using AutoMapper;
using BH.Model.Dtos;
using BH.Model.General;
using BH.Repository.Interfaces;
using BussinesHub.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BussinesHub.Controllers
{
	public class SecurityController : BaseController
	{
		private readonly JwtTokenService _tokenService;
		private readonly IClaimProvider _claimProvider;
		private readonly IConfiguration _config;
		private readonly IUserRepository _userRepository;
		private readonly ISymmetricEncryptionDecryptionManager _encryptor;
		private readonly IMapper _mapper;



		public SecurityController( JwtTokenService tokenService, IClaimProvider claimProvider, IConfiguration config, IUserRepository userRepository, ISymmetricEncryptionDecryptionManager encryptor, IMapper mapper )
		{
			_tokenService = tokenService;
			_claimProvider = claimProvider;
			_config = config;
			_userRepository = userRepository;
			_encryptor = encryptor;
			_mapper = mapper;
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="loginDto"></param>
		/// <returns></returns>
		[HttpPost]
		[AllowAnonymous]
		public async Task<ActionResult> Login( [FromBody] LoginDto loginDto )
		{
			try
			{
				List<Claim> claims = new List<Claim>();
				await Task.Run( () => claims = _claimProvider.GetRoles( loginDto.Username, loginDto.Password ) );

				if ( claims == null )
					return Unauthorized();
				else
				{
					User? user = await _userRepository.GetUser( loginDto.Username, _encryptor.Encrypt( loginDto.Password ) );
					bool hasCompany = ( await _userRepository.GetUserCompanies( loginDto.Password ) ).Any();
					if ( user == null )
						return NotFound("User not found");
					else
					{
						var verifiedUser = _tokenService.CreateToken( claims );
						UserDto userDto = _mapper.Map<UserDto>( user );
						userDto.Roles = verifiedUser.Roles;
						userDto.Token = verifiedUser.Token;
						userDto.HasCompany = hasCompany;

						return Ok( userDto );
					}

				}
			}
			catch ( Exception ex )
			{
				return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
			}

		}

		[HttpGet]
		[AllowAnonymous]
		public ActionResult CheckUserToken()
		{

			var allowedRoles = _config.GetSection( "Roles" ).GetChildren().Select( x => x.Value );
			var roles = HttpContext.User.Claims
							.Where( x => x.Type == ClaimTypes.Role )
							.Select( x => x.Value );
			if ( roles?.Intersect( allowedRoles ).Count() > 0 )
				return Ok( true );


			return Ok( false );
		}

	}
}
