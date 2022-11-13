namespace BH.Model.General
{
	public class Analitic
	{
		public int Id { get; set; }
		public Company Company { get; set; }
		public Product? Product { get; set; }
		public bool IsView { get { return Product == null;  } }
		public bool IsRegisterdUser { get { return User != null; } }
		public User? User { get; set; }
		public DateTime Date { get; set; }
		public string Country { get; set; }
		public string City { get; set; }
		public string Region { get; set; }
		public double Longitude { get; set; }
		public double Latitude { get; set; }

	}
}
