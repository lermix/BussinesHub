using BH.Model.General;

namespace BH.Repository.Interfaces
{
	public interface IStoreRepository
	{
		public Task<Store> CreateStore( Store store );
		public Task<int> DeleteStore( int storeId );
		public Task<Store> UpdateStore( Store store );
		public Task<List<StoreProductData>> GetStoreProduct( int storeId );
		public Task<StoreProductData> AddProductToStore( int productId, int storeId, double productCount);
		public Task<double> DeleteProductFromStore( int productId, int storeId );

	}
}
