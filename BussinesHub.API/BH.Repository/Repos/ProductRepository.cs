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

		public async Task<ProductAdditionalInfo> AddProductAdditionalInfo( int productId, ProductAdditionalInfo additionalInfo, List<int> categorieIds )
		{
			var product = await context.Products.FirstOrDefaultAsync( x => x.Id == productId );
			if ( product == null )
				return null;

			foreach ( var catId in categorieIds )
			{
				var cat = await context.Categories.FirstOrDefaultAsync( x => x.Id == catId );
				if ( cat != null )
					additionalInfo.Categories.Add( cat );
			}

			product.AdditionalInfos.Add( additionalInfo );

			await context.SaveChangesAsync();

			return additionalInfo;
		}

		public async Task<List<int>?> AddProductCategory( int productId, int categoryId )
		{
			var product = await context.Products.Include( x => x.Categories ).FirstOrDefaultAsync( x => x.Id == productId );
			var category = await context.Categories.FirstOrDefaultAsync( x => x.Id == categoryId );

			product.Categories.Add( category );
			await context.SaveChangesAsync();

			return product.Categories.Select( x => x.Id ).ToList();
		}

		public async Task<Product> CreateProduct( Product product, int companyId )
		{
			var company = await context.Companies.FirstOrDefaultAsync( x => x.Id == companyId );
			if ( company == null )
				throw new ArgumentNullException( $"Company with Id {companyId} not found" );

			product.Company = company;
			await context.Products.AddAsync( product );

			await context.SaveChangesAsync();
			return product;
		}

		public async Task<int> DeleteProduct( int ProductId )
		{
			var found = context.Products.FirstOrDefault( x => x.Id == ProductId );
			if ( found != null )
			{
				context.Products.Remove( found );
				await context.SaveChangesAsync();
				return ProductId;
			}
			else
				return -1;
		}

		public async Task<List<ProductAdditionalInfo>> GetProductAdditionalInfo( int productId )
		{
			var product = await context.Products.Include( x => x.AdditionalInfos ).FirstOrDefaultAsync( x => x.Id == productId );
			if ( product == null )
				return new List<ProductAdditionalInfo>();

			return product.AdditionalInfos.ToList();
		}

		public async Task<int> RemoveAdditionalInfo( int productId, int additionalInfoId )
		{
			var product = await context.Products.Include( x => x.AdditionalInfos ).FirstOrDefaultAsync( x => x.Id == productId && x.AdditionalInfos.Any( x => x.Id == additionalInfoId ) );
			var additionalInfo = await context.ProductAdditionalInfos.FirstOrDefaultAsync( x => x.Id == additionalInfoId );
			if ( product == null || additionalInfo == null )
				return -1;
			product.AdditionalInfos.Remove( additionalInfo );
			await context.SaveChangesAsync();
			return additionalInfoId;
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
			var found = await context.Products.FirstOrDefaultAsync( x => x.Id == product.Id );
			found.Name = product.Name;
			found.Description = product.Description;
			found.Price = product.Price;
			found.Code = product.Code;
			found.VatPercantage = product.VatPercantage;
			found.DiscountPercanatage = product.DiscountPercanatage;
			await context.SaveChangesAsync();
			return found;
		}
	}
}
