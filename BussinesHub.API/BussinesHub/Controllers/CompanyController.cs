using BH.Model.General;
using BH.Repository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BussinesHub.Controllers
{
	public class CompanyController : BaseController
	{
		private readonly ICompanyRepository comapnyRepository;
		public CompanyController( ICompanyRepository comapnyRepository )
		{
			this.comapnyRepository = comapnyRepository;
		}

		[HttpPost]
		public async Task<IActionResult> CreateCompany( [FromBody] Company company, [FromQuery] string username )
		{
			if ( username != null )
				return Ok( comapnyRepository.CreateCompany( company, username ) );
			else
				return BadRequest( "No username" );
		}

		[HttpPost]
		public async Task<ActionResult> DeleteCompany( int companyId )
		{
			int deletedId = await comapnyRepository.DeleteCompany( companyId );
			if ( deletedId == -1 )
				NotFound( companyId );

			return Ok( deletedId );
		}


	}
}
