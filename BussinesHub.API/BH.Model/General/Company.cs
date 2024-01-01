namespace BH.Model.General
{
	public class Company
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string IdentificationNumber { get; set; }
		public string Adress { get; set; }
		public string City { get; set; }
		public string PostalCode { get; set; }
		public string Country { get; set; }
		public string PhoneNumber { get; set; }
		public virtual ICollection<Store> Stores { get; set; } = new List<Store>();
		public virtual ICollection<Analitic>? Analitics { get; set; } = new List<Analitic>();
		public virtual ICollection<User> Users { get; set; } = new List<User>();
		public virtual ICollection<Product> Products { get; set; } = new List<Product>();
		public virtual ICollection<Category> Categories { get; set; } = new List<Category>();
	}
}