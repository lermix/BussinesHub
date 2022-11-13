using BH.Model;
using BH.Model.General;
using BH.Repository.Interfaces;

namespace BH.Repository.Repos
{
	public class UserRepository : IUserRepository
	{
		private readonly BHDbContex context;
		public UserRepository( BHDbContex context )
		{
			this.context = context;
		}

		public async Task<Company> AddCompanyToUser( int userId, int companyId )
		{
			var foundCompany = context.Companies.FirstOrDefault( x => x.Id == companyId );
			var foundUser = context.Users.FirstOrDefault( x => x.Id == userId );
			if( foundCompany != null && foundUser != null)
			{
				foundUser.Companies.Add( foundCompany );
				await context.SaveChangesAsync();
				return foundCompany;
			}

			return null;
		}

		public async Task<User> CreateUser( User user )
		{
			var entry = context.Users.Add( user );
			await context.SaveChangesAsync();
			return entry.Entity;
		}

		public async Task<int> DeleteUser( int UserId )
		{
			var found = context.Users.FirstOrDefault( x => x.Id == UserId );
			if ( found != null )
			{
				context.Users.Remove( found );
				await context.SaveChangesAsync();
				return UserId;
			}
			else
				return -1;
		}

		public async Task<List<User>> GetAllUsers()
		{
			return context.Users.ToList();
		}

		public async Task<User> UpdateUser( User user )
		{
			var entry = context.Users.Update( user );
			await context.SaveChangesAsync();
			return entry.Entity;
		}
	}
}
