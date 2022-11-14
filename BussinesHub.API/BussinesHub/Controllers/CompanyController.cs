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
		public async Task<IActionResult> DeleteCompany( [FromQuery] int companyId )
		{
			int deletedId = await comapnyRepository.DeleteCompany( companyId );
			if ( deletedId == -1 )
				NotFound( companyId );

			return Ok( deletedId );
		}

		[HttpGet]
		public async Task<IActionResult> GetCompanyStores( int companyId ) =>  Ok( await comapnyRepository.GetCompanyStores( companyId ));

		[HttpPost]
		public async Task<IActionResult> CreateStore( [FromBody] Store store, [FromQuery] int companyId ) =>
			Ok( await comapnyRepository.CreateStore( companyId, store ) );
		[HttpPost]
		public async Task<IActionResult> EditCompany( [FromBody] Company company) =>
			Ok( await comapnyRepository.UpdateCompany( company ) );
	}
}
