namespace BH.Model.General
{
	public class UserPermission
	{
		public int Id { get; set; }
		public User User{ get; set; }
		public PermissionEnum PermissionType { get; set; }
		public string AppliedObjectTable { get; set; }
		public int AppliedObjectId { get; set; }
	}
}
