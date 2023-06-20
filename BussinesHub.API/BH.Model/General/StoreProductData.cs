using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BH.Model.General
{
	public class StoreProductData
	{
		public int Id { get; set; }
		public Product Product { get; set; }
		public Store Store { get; set; }
		public double Quantity { get; set; }
	}
}
