using System.Security.Claims;

namespace BussinesHub.Security
{
	public class TestClaimProvider : IClaimProvider
	{
		public List<Claim> GetRoles( string username, string password )
		{
			List<Claim> claims = new List<Claim> { new Claim( ClaimTypes.Name, username ) };
			claims.Add( new Claim( ClaimTypes.Role, "Admin" ) );

			return claims;
		}
	}
}
