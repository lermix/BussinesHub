using BH.Model.Dtos;
using BH.Model.General;

namespace BH.Repository.Interfaces
{
	public interface IUserRepository
	{
		public Task<User> CreateUser( User user );
		public Task<string> DeleteUser( string UserId );
		public Task<User> UpdateUser( User user );
		public Task<List<User>> GetAllUsers();
		public Task<Company> AddCompanyToUser( string username, int companyId );
		public Task<List<Company>> GetUserCompanies( string username );
		public Task<User?> GetUser(string username, string password);
		Task<Company> SetUserCompany( string username, int companyId );
	}
}
