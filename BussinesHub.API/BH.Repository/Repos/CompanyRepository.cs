using BH.Model;
using BH.Model.General;
using BH.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace BH.Repository.Repos
{
	public class CompanyRepository : ICompanyRepository
	{
		private readonly BHDbContex context;
		public CompanyRepository( BHDbContex context )
		{
			this.context = context;
		}
		public async Task<Company> AddStoreToCompany( int storeId, int companyId )
		{
			var foundCompany = context.Companies.FirstOrDefault( x => x.Id == companyId );
			var foundStore = context.Store.FirstOrDefault( x => x.Id == storeId );
			if ( foundStore != null && foundCompany != null )
			{
				foundCompany.Stores.Add( foundStore );
				await context.SaveChangesAsync();
				return foundCompany;
			}

			return null;
		}

		public async Task<Company> CreateCompany( Company comapny, string username )
		{
			var foundUser = context.Users.FirstOrDefault( x => x.Username == username );
			if ( foundUser != null )
			{
				var entry = context.Companies.Add( comapny );
				if ( foundUser.Companies == null )
					foundUser.Companies = new List<Company>();
				foundUser.Companies.Add( comapny );
				await context.SaveChangesAsync();
				return entry.Entity;
			}
			return null;

		}

		public async Task<Store> CreateStore( int companyId, Store store )
		{
			var foundCompany = context.Companies.FirstOrDefault( x => x.Id == companyId );			
			if ( foundCompany != null )
			{
				if ( foundCompany.Stores == null )
				{
					foundCompany.Stores = new List<Store>();
					foundCompany.Stores.Add( store );
				}
				else
					foundCompany.Stores.Add( store );

				await context.SaveChangesAsync();
				return store;
			}
			return null;

		}

		public async Task<int> DeleteCompany( int companyId )
		{
			var foundCompany = context.Companies.FirstOrDefault( x => x.Id == companyId );
			if ( foundCompany != null )
			{
				context.Companies.Remove( foundCompany );
				await context.SaveChangesAsync();
				return companyId;

			}
			return -1;
		}

		public async Task<int> DeleteStoreFromCompany( int storeId, int companyId )
		{
			var foundCopmany = context.Companies.FirstOrDefault( x => x.Id == companyId );
			if ( foundCopmany != null )
			{
				var foundStore = foundCopmany.Stores.FirstOrDefault( x => x.Id == storeId );
				if ( foundStore != null )
				{
					foundCopmany.Stores.Remove( foundStore );
					await context.SaveChangesAsync();
					return storeId;
				}
			}
			return -1;
		}



		public Task<List<Store>> GetCompanyStores( int companyId )
		{
			var foundCompany = context.Companies.Include(x => x.Stores).FirstOrDefault( x => x.Id == companyId );
			if ( foundCompany != null )
				if ( foundCompany.Stores != null )
					return Task.FromResult( foundCompany.Stores.ToList() );

			return Task.FromResult( new List<Store>() );
		}

		public async Task<Company> UpdateCompany( Company store )
		{
			var entry = context.Entry( store );
			entry.State = EntityState.Modified;
			await context.SaveChangesAsync();
			return entry.Entity;
		}
	}
}
