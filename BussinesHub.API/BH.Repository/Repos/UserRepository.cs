using BH.Model;
using BH.Model.General;
using BH.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BH.Repository.Repos
{
	public class UserRepository : IUserRepository
	{
		private readonly BHDbContex context;
		public UserRepository( BHDbContex context )
		{
			this.context = context;
		}

		public async Task<Company> AddCompanyToUser( string username, int companyId )
		{
			var foundCompany = context.Companies.FirstOrDefault( x => x.Id == companyId );
			var foundUser = context.Users.FirstOrDefault( x => x.Username == username );
			if ( foundCompany != null && foundUser != null )
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

		public async Task<string> DeleteUser( string username )
		{
			var found = context.Users.FirstOrDefault( x => x.Username == username );
			if ( found != null )
			{
				context.Users.Remove( found );
				await context.SaveChangesAsync();
				return username;
			}
			else
				return "";
		}

		public async Task<List<User>> GetAllUsers()
		{
			return context.Users.ToList();
		}

		public async Task<User?> GetUser( string username, string password )
		{
			return await context.Users.FirstOrDefaultAsync( x => x.Username == username && x.Password == password );
		}

		public async Task<List<Company>> GetUserCompanies( string username )
		{
			var foundUser = context.Users.Include(x => x.Companies).FirstOrDefault( x => x.Username == username );
			if ( foundUser != null )
				if ( foundUser.Companies != null )
					return await Task.FromResult(foundUser.Companies.ToList());

			return new List<Company>();
		}

		public async Task<Company> SetUserCompany( string username, int companyId )
		{
			if(string.IsNullOrEmpty( username ))
				throw new ArgumentNullException("username is empty or null");

			var company = await context.Companies.FirstOrDefaultAsync(x => x.Id == companyId);
			if ( company == null )
				throw new ArgumentNullException( $"Company with id: {companyId} not found" );

			var user = await context.Users.FirstOrDefaultAsync( x => x.Username.Equals( username ) );

			if ( user == null )
				throw new ArgumentNullException( $"User with username: {username} not found" );


			if ( user.Companies == null)
				user.Companies = new List<Company>();

			user.Companies.Add( company );

			await context.SaveChangesAsync();
			return company;
		}

		public async Task<User> UpdateUser( User user )
		{
			var entry = context.Users.Update( user );
			await context.SaveChangesAsync();
			return entry.Entity;
		}
	}
}
