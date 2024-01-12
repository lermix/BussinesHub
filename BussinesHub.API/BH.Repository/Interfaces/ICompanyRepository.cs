using BH.Model.Dtos;
using BH.Model.General;

namespace BH.Repository.Interfaces
{
	public interface ICompanyRepository
	{
		public Task<Company> CreateCompany( Company store, string username );
		public Task<int> DeleteCompany( int companyId );
		public Task<Company> UpdateCompany( Company store );
		public Task<List<Store>> GetCompanyStores( int companyId );
		public Task<int> DeleteStoreFromCompany( int storeId, int companyId );
		public Task<Store> CreateStore( int companyId, Store store );
		Task<List<Product>> GetCompanyProducts( int companyId );
		Task<List<Category>?> GetCompanyCategories( int companyId );
		Task<Category?> CreateCompanyCategory( Category category, int companyId );
		Task<int> RemoveCompanyStore( int storeId, int companyId );
		Task<Store> AddCompanyStore( Store store, int companyId );
		Task<int> RemoveCompanyCategory( int categoryId );
		Task<List<Company>> GetAllCompanies();
	}
}
