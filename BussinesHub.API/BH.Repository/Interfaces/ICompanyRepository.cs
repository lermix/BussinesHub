using BH.Model.General;

namespace BH.Repository.Interfaces
{
	public interface ICompanyRepository
	{
		public Task<Company> CreateCompany( Company store, string username );
		public Task<int> DeleteCompany( int companyId );
		public Task<Company> UpdateCompany( Company store );
		public Task<List<Store>> GetCompanyStores( int companyId );
		public Task<Company> AddStoreToCompany( int storeId, int companyId );
		public Task<int> DeleteStoreFromCompany( int storeId, int companyId );
	}
}
