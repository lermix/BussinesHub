using BH.Model.General;

namespace BH.Model.Dtos
{
	public class StoreDto
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Adress { get; set; }
		public string City { get; set; }
		public string PostalCode { get; set; }
		public string Country { get; set; }
		public string? MobileNumber { get; set; }
		public CompanyDto ParentCompany { get; set; }
		public Coordinate Coordinate { get; set; }
		public virtual ICollection<int> ImagesIds { get; set; }
	}
}
