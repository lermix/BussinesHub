using System.Security.Claims;

namespace BussinesHub.Security
{
	public interface IClaimProvider
	{
		List<Claim> GetRoles(string username, string password);
	}
}
