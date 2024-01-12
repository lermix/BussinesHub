namespace BH.Model.General.Web
{
    public class MenuItem
    {
        public int Id { get; set; }
        public string Name { get; set; } = "no_name";
        public bool Clickable { get; set; } = true;
        public virtual ICollection<MenuItem> MenuItems { get; set; } = new List<MenuItem>();
        public WebTab Tab { get; set; }
    }
}