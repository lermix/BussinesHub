using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BH.Model.General.Web
{
	public class WebTabInfo: WebTab
	{
        public virtual ICollection<LabelValue> LabelValues { get; set; }        
    }
}
