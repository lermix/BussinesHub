using BH.Model.General;

namespace BH.Repository.Interfaces
{
	public interface IStoreRepository
	{
		public Task<Store> CreateStore( Store store );
		public Task<int> DeleteStore( int storeId );
		public Task<Store> UpdateStore( Store store );
		public Task<List<Product>> GetStoreProduct( int storeId );
		public Task<Product> AddProductToStore( Product product, int SsoreId );
		public Task<int> DeleteProductFromStore( int productId, int storeId );

	}
}
