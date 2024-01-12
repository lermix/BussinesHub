namespace BH.Model.General.Web
{
	public class WebTabProducts: WebTab
	{
        public virtual ICollection<WebProductInfo> ProductInfos { get; set; }
    }
}
