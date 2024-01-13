namespace BH.Model.General
{
	public class ProductAdditionalInfo
	{
        public int Id { get; set; }
        public string InfoName { get; set; }
        public string InfoValue { get; set; }
		public virtual ICollection<Category> Categories { get; set; } = new List<Category>();
		public Product Product { get; set; }
    }
}
