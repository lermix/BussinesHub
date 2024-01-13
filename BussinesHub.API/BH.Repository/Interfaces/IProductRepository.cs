using BH.Model.Dtos;
using BH.Model.General;

namespace BH.Repository.Interfaces
{
	public interface IProductRepository
	{
		public Task<int> DeleteProduct( int ProductId);
		public Task<Product> CreateProduct( Product product, int companyId);
		public Task<Product> UpdateProduct( Product product );
		Task<List<int>> AddProductCategory( int productId, int categoryId );
		Task<List<int>> RemoveProductCategory( int productId, int categoryId );
		Task<ProductAdditionalInfo?> AddProductAdditionalInfo( int productId, ProductAdditionalInfo additionalInfo, List<int> categorieIds );
		Task<int> RemoveAdditionalInfo( int productId, int additionalInfoId );
		Task<List<ProductAdditionalInfo>> GetProductAdditionalInfo( int productId );
	}
}
