using BH.Model.General.Web;

namespace BH.Model.General
{
	public class Product
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; } = "";
		public double Price { get; set; }
		public string Code { get; set; }
		public double VatPercantage { get; set; }
		public double DiscountPercanatage { get; set; }
		public bool Shipping { get; set; } = true;
		public bool Avaliable { get; set; } = true;
		public int MainImageId { get; set; }
		public virtual ICollection<Category> Categories { get; set; } = new List<Category>();
		public virtual ICollection<Image> Images { get; set; }
		public virtual ICollection<StoreProductData> StoresData { get; set; }
		public virtual ICollection<UserProductData> UsersProductData { get; set; }
		public virtual ICollection<Analitic> Analitics { get; set; }
		public virtual ICollection<WebTabProducts> webTabProducts { get; set; }
		public Company Company { get; set; }
	}
}