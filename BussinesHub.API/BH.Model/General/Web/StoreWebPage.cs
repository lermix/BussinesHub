using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BH.Model.General.Web
{
    public class StoreWebPage
    {
        public int Id { get; set; }
        public virtual ICollection<MenuItem> MenuItems { get; set; } = new List<MenuItem>();
        public virtual ICollection<WebTab> WebTabItems { get; set; } = new List<WebTab>();
        public int CompanyId { get; set; }
        public Company Company { get; set; }
    }
}
