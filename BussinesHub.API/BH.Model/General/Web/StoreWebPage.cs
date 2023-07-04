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
        public virtual ICollection<MenuItem> MenuItems { get; set; }
    }
}
