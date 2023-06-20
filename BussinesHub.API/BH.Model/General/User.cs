namespace BH.Model.General
{
	public class User
	{
		public int Id { get; set; }
		public string Username { get; set; }
		public string Name { get; set; }
		public string? MiddleName { get; set; }
		public string Surname { get; set; }
		public string Email { get; set; }
		public string Password { get; set; }
		public string? MobileNumber { get; set; }
		public UserFuncEnum userFuncEnum { get; set; }
		public virtual ICollection<UserPermission> UserPermissions { get; set; }
		public virtual ICollection<UserProductData> Products { get; set; }
		public virtual ICollection<Company>? Companies { get; set; }

	}
}
