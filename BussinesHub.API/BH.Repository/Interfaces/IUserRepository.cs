using BH.Model.Dtos;
using BH.Model.General;

namespace BH.Repository.Interfaces
{
	public interface IUserRepository
	{
		public Task<User> CreateUser( User user );
		public Task<int> DeleteUser( int UserId );
		public Task<User> UpdateUser( User user );
		public Task<List<User>> GetAllUsers();
	}
}
