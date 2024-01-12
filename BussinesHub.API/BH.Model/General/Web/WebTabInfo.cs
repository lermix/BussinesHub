namespace BH.Model.General.Web
{
	public class WebTabInfo: WebTab
	{
        public virtual ICollection<LabelValue> LabelValues { get; set; }        
    }
}
