using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BH.Model.General
{
	public class Store
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Adress { get; set; }
		public string City { get; set; }
		public string PostalCode { get; set; }
		public string Country { get; set; }
		public string? MobileNumber { get; set; }	
		public Company ParentCompany { get; set; }
		public virtual ICollection<Image> Images { get; set; }
		public virtual ICollection<StoreProductData> ProductsData { get; set; }
	}
}
