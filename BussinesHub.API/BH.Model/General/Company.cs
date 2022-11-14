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
		public virtual ICollection<Store> Stores { get; set; }
		public virtual ICollection<Analitic>? Analitics { get; set; }
	}
}