using BH.Model.General;

namespace BH.Model.Dtos
{
	public class CategoryDto
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public int? ParentId { get; set; }
		public virtual ICollection<CategoryDto>? Children { get; set; } = new List<CategoryDto>();
	}
}
