using BH.Model.Dtos;
using BussinesHub.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BussinesHub.Controllers
{
	[Route( "api/[controller]" )]
	[ApiController]
	public class SecurityController : ControllerBase
	{
		private readonly JwtTokenService _tokenService;
		private readonly IClaimProvider _claimProvider;

		public SecurityController(JwtTokenService tokenService, IClaimProvider claimProvider)
		{
			_tokenService = tokenService;
			_claimProvider = claimProvider;
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="loginDto"></param>
		/// <returns></returns>
		[HttpPost]
		[AllowAnonymous]
		public async Task<ActionResult> Login([FromBody] LoginDto loginDto)
		{
			try
			{
				List<Claim> claims = new List<Claim>();
				await Task.Run( () => claims = _claimProvider.GetRoles(loginDto.Username, loginDto.Password) );

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

	}
}
