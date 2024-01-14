namespace BH.Model.Dtos
{
	public class CompanyDto
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string IdentificationNumber { get; set; }
		public string Adress { get; set; }
		public string City { get; set; }
		public string PostalCode { get; set; }
		public string Country { get; set; }
		public string PhoneNumber { get; set; }
        public string Description { get; set; }
        public virtual ICollection<StoreDto> Stores { get; set; } = new List<StoreDto>();

	}
}
