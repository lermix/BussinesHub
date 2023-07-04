using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BH.Model.General.Web
{
	public class WebTabProducts: WebTab
	{
        public virtual ICollection<WebProductInfo> ProductInfos { get; set; }
    }
}
