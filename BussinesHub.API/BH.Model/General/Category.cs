namespace BH.Model.General
{
	public class Category
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public Category? Parent { get; set; }
		public virtual ICollection<Category>? Children { get; set; } = new List<Category>();
		public virtual ICollection<Product> Products { get; set; } = new List<Product>();
	}
}
