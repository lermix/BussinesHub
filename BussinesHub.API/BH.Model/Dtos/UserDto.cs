namespace BH.Model.Dtos
{
	public class UserDto
	{
		public int Id { get; set; }
		public string Username { get; set; }
		public string Name { get; set; }
		public string? MiddleName { get; set; }
		public string Surname { get; set; }
		public string Email { get; set; }
		public string Password { get; set; }
		public string? MobileNumber { get; set; }
        public string Roles{ get; set; }
        public string Token { get; set; }
        public bool HasCompany { get; set; }
    }
}
