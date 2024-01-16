using BH.Model;
using BH.Model.General;
using BH.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Serilog;
using System.Diagnostics.Metrics;
using System.Xml.Linq;

namespace BH.Repository.Repos
{
	public class StoreRepository : IStoreRepository
	{
		private readonly BHDbContex context;

		public StoreRepository( BHDbContex context )
		{
			this.context = context;
		}

		public async Task<StoreProductData> AddProductToStore(int productId, int storeId, double productCount)
		{

			var foundStoreProduct = context.storeProductsData.FirstOrDefault( x => x.Store.Id == storeId && x.Product.Id == productId );
			if ( foundStoreProduct != null )
			{
				foundStoreProduct.Quantity+= productCount;
				await context.SaveChangesAsync();
				return foundStoreProduct;
			}
			else
			{
				var foundProduct = context.Products.FirstOrDefault( x => x.Id == productId );
				var foundStore = context.Store.FirstOrDefault( x => x.Id == storeId );
				if ( foundProduct == null )
				{
					Log.Error( $"Product with Id: {productId} not found, error adding product to store" );
					return null;
				}
				if ( foundStore == null )
				{
					Log.Error( $"Store with Id: {storeId} not found, error adding product to store" );
					return null;
				}
				StoreProductData spd = new StoreProductData( foundProduct, foundStore, productCount);			

				var entry = context.storeProductsData.Add( spd );
				await context.SaveChangesAsync();

				return entry.Entity;
			}

			return null;
		}

		public async Task<Store> CreateStore( Store store )
		{
			var entry = context.Store.Add( store );
			await context.SaveChangesAsync();
			return entry.Entity;
		}

		public async Task<double> DeleteProductFromStore( int productId, int storeId )
		{
			var foundStoreProduct = context.storeProductsData.FirstOrDefault( x => x.Store.Id == storeId && x.Product.Id == productId );
			if ( foundStoreProduct != null )
				foundStoreProduct.Quantity--;

			await context.SaveChangesAsync();

			return foundStoreProduct.Quantity;
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

		public Task<List<StoreProductData>> GetStoreProduct( int storeId )
		{
			var foundStore = context.Store.FirstOrDefault( x => x.Id == storeId );
			if ( foundStore != null )
				return Task.FromResult( foundStore.ProductsData.ToList() );

			return Task.FromResult( new List<StoreProductData>() );
		}

		public async Task<Store> UpdateStore( Store store )
		{
			var found = await context.Store.FirstOrDefaultAsync( x => x.Id == store.Id );

			if ( found == null )
				return store;

			found.Name = store.Name ;
			found.Adress = store.Adress ;
			found.City = store.City ;
			found.PostalCode = store.PostalCode ;
			found.Country = store.Country ;
			found.MobileNumber = store.MobileNumber ;
			found.Coordinate = store.Coordinate;

			await context.SaveChangesAsync();
			return found;
		}

	}
}
