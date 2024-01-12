namespace BH.Model.General
{
	public class ProductAdditionalInfo
	{
        public int Id { get; set; }
        public string InfoName { get; set; }
        public string InfoValue { get; set; }
        public Product Product { get; set; }
    }
}
