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
			var foundUser = await context.Users.Include(x => x.Companies).FirstOrDefaultAsync( x => x.Username == username );
			if ( foundUser != null )
			{
				var entry = await context.Companies.AddAsync( comapny );
				if ( foundUser.Companies == null )
					foundUser.Companies = new List<Company>();
				foundUser.Companies.Add( comapny );
				await context.SaveChangesAsync();
				return entry.Entity;
			}
			return null;

		}

		public async Task<Category?> CreateCompanyCategory( Category category, int companyId )
		{
			var company = await context.Companies.FirstOrDefaultAsync( x => x.Id == companyId );
			if ( company == null )
				throw new ArgumentNullException( $"Company with Id {companyId} could not be found" );

			category.Company = company;

			Category parent = await context.Categories.FirstOrDefaultAsync( x => x.Id == category.Parent.Id);

			category.Parent = null;

			await context.Categories.AddAsync( category );

			await context.SaveChangesAsync();

			category.Parent = parent;

			await context.SaveChangesAsync();

			return category;
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

		public async Task<List<Category>?> GetCompanyCategories( int companyId )
		{
			return (await context.Companies.Include( x => x.Categories).FirstOrDefaultAsync( x => x.Id == companyId ))?.Categories
				.Where( cat => cat.Parent == null).ToList() ?? new List<Category>();
		}

		public async Task<List<Product>> GetCompanyProducts( int companyId )
		{
			return (await context.Companies.Include( x => x.Products).FirstOrDefaultAsync( x => x.Id == companyId ))?.Products.ToList() ?? new List<Product>();
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
