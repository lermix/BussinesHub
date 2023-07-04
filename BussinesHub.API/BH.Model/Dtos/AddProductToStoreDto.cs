namespace BH.Model.Dtos
{
	public class AddProductToStoreDto
	{
        public int ProductId { get; set; }
        public double ProductCount { get; set; }
        public int StoreId { get; set; }
    }
}
