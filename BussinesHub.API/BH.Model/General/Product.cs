namespace BH.Model.General
{
	public class Product
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; } = "";
		public double Price { get; set; }
		public string? Code { get; set; }
		public double VatPercantage { get; set; }
		public double DiscountPercanatage { get; set; }
		public bool Shipping { get; set; } = true;
		public bool Avaliable { get; set; } = true;
		public virtual ICollection<Category> Categories { get; set; } = new List<Category>();
		public virtual ICollection<Image> Images { get; set; }
		public virtual ICollection<Store> Stores { get; set; }
		public virtual ICollection<Analitic> Analitics { get; set; }
	}
}