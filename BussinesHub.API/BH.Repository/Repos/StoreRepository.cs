using BH.Model;
using BH.Model.General;
using BH.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BH.Repository.Repos
{
	public class StoreRepository : IStoreRepository
	{
		private readonly BHDbContex context;
		public StoreRepository( BHDbContex context )
		{
			this.context = context;
		}

		public async Task<Product> AddProductToStore( Product product, int storeId )
		{
			var foundStore = context.Store.FirstOrDefault( x => x.Id == storeId );
			if ( foundStore != null )
			{
				foundStore.Products.Add( product );
				await context.SaveChangesAsync();
				return product;
			}

			return null;
		}

		public async Task<Store> CreateStore( Store store )
		{
			var entry = context.Store.Add( store );
			await context.SaveChangesAsync();
			return entry.Entity;
		}

		public async Task<int> DeleteProductFromStore( int productId, int storeId )
		{
			var foundStore = context.Store.FirstOrDefault( x => x.Id == storeId );
			if ( foundStore != null )
			{
				var foundProduct = foundStore.Products.FirstOrDefault( x => x.Id == productId );
				if ( foundProduct != null )
				{
					foundStore.Products.Remove( foundProduct );
					await context.SaveChangesAsync();
					return productId;
				}
			}
			return -1;
		}

		public async Task<int> DeleteStore( int storeId )
		{
			var found = context.Store.FirstOrDefault( x => x.Id == storeId );
			if ( found != null )
			{
				context.Store.Remove( found );
				await context.SaveChangesAsync();
				return storeId;
			}
			else
				return -1;
		}

		public Task<List<Product>> GetStoreProduct( int storeId )
		{
			var foundStore = context.Store.FirstOrDefault( x => x.Id == storeId );
			if ( foundStore != null )			
				return Task.FromResult( foundStore.Products.ToList() );

			return Task.FromResult( new List<Product>() );
		}

		public async Task<Store> UpdateStore( Store store )
		{
			var entry = context.Entry( store );
			entry.State = EntityState.Modified;
			await context.SaveChangesAsync();
			return entry.Entity;
		}
	}
}
