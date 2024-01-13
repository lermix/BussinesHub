namespace BH.Model.Dtos
{
	public class ProductAdditionalInfoDto
	{
		public int Id { get; set; }
		public string InfoName { get; set; }
		public string InfoValue { get; set; }
		public List<int> CategorieIds { get; set; }
	}
}
