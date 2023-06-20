using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BH.Model.General
{
	public class UserProductData
	{
		public int Id { get; set; }
		public User User { get; set; }
		public Product Product { get; set; }
		public double Quantity { get; set; }
	}
}
