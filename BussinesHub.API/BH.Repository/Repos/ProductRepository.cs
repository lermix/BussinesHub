using BH.Model;
using BH.Model.General;
using BH.Repository.Interfaces;

namespace BH.Repository.Repos
{
	public class ProductRepository : IProductRepository
	{
		private readonly BHDbContex context;
		public ProductRepository( BHDbContex context )
		{
			this.context = context;
		}

		public async Task<Product> CreateProduct( Product product )
		{
			var entry = context.Products.Add( product );
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

		public async Task<Product> UpdateProduct( Product product )
		{
			var entry = context.Products.Update(product);
			await context.SaveChangesAsync();
			return entry.Entity;
		}
	}
}
