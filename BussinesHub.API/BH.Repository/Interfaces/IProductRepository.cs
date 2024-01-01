using BH.Model.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BH.Repository.Interfaces
{
	public interface IProductRepository
	{
		public Task<int> DeleteProduct( int ProductId);
		public Task<Product> CreateProduct( Product product, int companyId);
		public Task<Product> UpdateProduct( Product product );
	}
}
