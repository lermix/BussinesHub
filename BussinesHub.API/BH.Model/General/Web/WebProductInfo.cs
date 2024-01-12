namespace BH.Model.General.Web
{
	public class WebProductInfo
	{
        public int Id { get; set; }
        public Product Product { get; set; }
        public virtual ICollection<LabelValue> LabelValues { get; set; }
    }
}
