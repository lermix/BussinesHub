namespace BH.Model.General.Web
{
    public abstract class WebTab
    {
        public int Id { get; set; }

        public string Header { get; set; } = "no_name";
        public bool DisplayHeader { get; set; } = true;
        public int MenuItemId { get; set; }
        public MenuItem? MenuItem { get; set; }

    }
}