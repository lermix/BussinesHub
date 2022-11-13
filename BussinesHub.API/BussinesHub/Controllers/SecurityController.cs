using BH.Model.Dtos;
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


		public SecurityController( JwtTokenService tokenService, IClaimProvider claimProvider, IConfiguration config )
		{
			_tokenService = tokenService;
			_claimProvider = claimProvider;
			_config=config;
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
					return Ok( _tokenService.CreateToken( claims ) );
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
