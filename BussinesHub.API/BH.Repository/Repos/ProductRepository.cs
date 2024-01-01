using BH.Model;
using BH.Model.General;
using BH.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BH.Repository.Repos
{
	public class ProductRepository : IProductRepository
	{
		private readonly BHDbContex context;
		public ProductRepository( BHDbContex context )
		{
			this.context = context;
		}

		public async Task<List<int>?> AddProductCategory( int productId, int categoryId )
		{
			var product = await context.Products.Include(x => x.Categories).FirstOrDefaultAsync( x => x.Id == productId );
			var category = await context.Categories.FirstOrDefaultAsync( x => x.Id == categoryId);

			product.Categories.Add( category );
			await context.SaveChangesAsync();

			return product.Categories.Select( x => x.Id).ToList();
		}

		public async Task<Product> CreateProduct( Product product, int companyId )
		{			
			var company = await context.Companies.FirstOrDefaultAsync( x => x.Id == companyId );
			if ( company == null )
				throw new ArgumentNullException( $"Company with Id {companyId} not found" );			

			product.Company = company;
			var entry = await context.Products.AddAsync( product );

			await context.SaveChangesAsync();
			return entry.Entity;
		}

		public async Task<int> DeleteProduct( int ProductId )
		{
			var found = context.Products.FirstOrDefault( x => x.Id == ProductId );
			if ( found != null )
			{
				context.Products.Remove( found );
				await context.SaveChangesAsync();
				return ProductId ;
			}
			else
				return -1;
		}

		public async Task<List<int>> RemoveProductCategory( int productId, int categoryId )
		{
			var product = await context.Products.Include( x => x.Categories ).FirstOrDefaultAsync( x => x.Id == productId );
			var category = await context.Categories.FirstOrDefaultAsync( x => x.Id == categoryId );

			product.Categories.Remove( category );

			await context.SaveChangesAsync();

			return product.Categories.Select( x => x.Id ).ToList();

		}

		public async Task<Product> UpdateProduct( Product product )
		{
			var entry = context.Products.Update(product);
			await context.SaveChangesAsync();
			return entry.Entity;
		}
	}
}
