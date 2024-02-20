using BH.Database.Migrations;
using BH.Model;
using BH.Model.Dtos;
using BH.Model.General;
using BH.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace BH.Repository.Repos
{
	public class CompanyRepository : ICompanyRepository
	{
		private readonly BHDbContex context;
		public CompanyRepository( BHDbContex context )
		{
			this.context = context;
		}

		public async Task<Store> AddCompanyStore( Store store, int companyId )
		{
			var company = await context.Companies.FirstOrDefaultAsync( x => x.Id == companyId );
			store.ParentCompany = company;

			if ( store.Images == null )
				store.Images = new List<Image>();

			var entry = await context.Store.AddAsync( store );

			await context.SaveChangesAsync();

			return store;
		}
		public async Task<Company> CreateCompany( Company comapny, string username )
		{
			var foundUser = await context.Users.Include( x => x.Companies ).FirstOrDefaultAsync( x => x.Username == username );
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

			Category parent = await context.Categories.FirstOrDefaultAsync( x => x.Id == category.Parent.Id );

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

		public async Task<List<Company>> GetAllCompanies()
		{
			return await context.Companies.ToListAsync();
		}

		public async Task<List<ProductAdditionalInfo>> GetCompanyAdditionalInfos( int companyId )
		{
			return await context.ProductAdditionalInfos
				.Include( x => x.Product ).ThenInclude( x => x.Company )
				.Include( x => x.Categories )
				.Where( x => x.Product.Company.Id == companyId )
				.ToListAsync();
		}

		public async Task<List<Category>?> GetCompanyCategories( int companyId )
		{
			return ( await context.Companies.Include( x => x.Categories ).FirstOrDefaultAsync( x => x.Id == companyId ) )?.Categories
				.Where( cat => cat.Parent == null ).ToList() ?? new List<Category>();
		}

		public async Task<List<Product>> GetCompanyProducts( int companyId )
		{
			return ( await context.Companies
				.Include( x => x.Products ).ThenInclude( x => x.Categories )
				.Include( x => x.Products ).ThenInclude( x => x.Images )
				.Include( x => x.Products ).ThenInclude( x => x.AdditionalInfos )
				.FirstOrDefaultAsync( x => x.Id == companyId ) )?.Products.ToList() ?? new List<Product>();
		}


		public Task<List<Store>> GetCompanyStores( int companyId )
		{
			var foundCompany = context.Companies.Include( x => x.Stores ).FirstOrDefault( x => x.Id == companyId );
			if ( foundCompany != null )
				if ( foundCompany.Stores != null )
					return Task.FromResult( foundCompany.Stores.ToList() );

			return Task.FromResult( new List<Store>() );
		}

		public async Task<List<GraphDataDto>> GetGraphData( int companyId )
		{
			var foundCompany = context.Companies.Include( x => x.Categories ).ThenInclude( x => x.Products ).FirstOrDefault( x => x.Id == companyId );
			if ( foundCompany == null )
				return new List<GraphDataDto>();

			List<GraphDataDto> result = new List<GraphDataDto>();

			foreach ( var item in foundCompany.Categories )			
				result.Add( new GraphDataDto() { CategoryName = item.Name, ProductCount = item.Products.Count } );
			
			return result;
		}

		public async Task<int> RemoveCompanyCategory( int categoryId )
		{
			var category = await context.Categories.Include( x => x.Children ).FirstOrDefaultAsync( x => x.Id == categoryId );
			if ( category == null )
				return -1;

			if ( category.Children != null )
			{
				var children = category.Children.Select( x => x.Id ).ToList();

				foreach ( var childId in children )
					await RemoveCompanyCategory( childId );

			}

			context.Categories.Remove( category );
			await context.SaveChangesAsync();


			return categoryId;
		}

		public async Task<int> RemoveCompanyStore( int storeId, int companyId )
		{
			var store = await context.Store.FirstOrDefaultAsync( x => x.Id == storeId );
			var company = await context.Companies.FirstOrDefaultAsync( x => x.Id == companyId );

			company.Stores.Remove( store );
			await context.SaveChangesAsync();

			context.Store.Remove( store );

			await context.SaveChangesAsync();
			return store.Id;
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
