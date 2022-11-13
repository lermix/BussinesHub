using BH.Model.General;
using BH.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BussinesHub.Controllers
{
	public class UserController : BaseController
	{
		private readonly IUserRepository userRepository;
		public UserController( IUserRepository userRepository )
		{
			this.userRepository = userRepository;
		}

		[HttpPost]
		public async Task<IActionResult> CreateUser( User user ) => Ok( userRepository.CreateUser( user ) );
		[HttpPost]
		public async Task<IActionResult> DeleteUser( int UserId )
		{
			int deletedId = await userRepository.DeleteUser( UserId );
			if ( deletedId == -1 )
				NotFound( UserId );

			return Ok( deletedId );
		}
		[HttpPost]
		public async Task<IActionResult> UpdateUser( User user ) => Ok( userRepository.UpdateUser( user ) );
		[HttpGet]
		public async Task<IActionResult> GetUsers() => Ok( userRepository.GetAllUsers() );

	}
}
