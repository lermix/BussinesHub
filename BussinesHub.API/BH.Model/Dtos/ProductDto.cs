using BH.Model.General;

namespace BH.Model.Dtos
{
	public class ProductDto
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
        public int CompanyId { get; set; }
        public virtual List<int> CategoriesIds { get; set; } = new List<int>();
		public virtual List<int> ImagesIds { get; set; } = new List<int>();
		public virtual List<ProductAdditionalInfo> AdditionalInfos { get; set; } = new List<ProductAdditionalInfo>();

	}
}
