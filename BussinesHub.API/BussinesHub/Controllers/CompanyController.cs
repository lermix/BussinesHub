using AutoMapper;
using BH.Model.Dtos;
using BH.Model.General;
using BH.Repository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;

namespace BussinesHub.Controllers
{
	public class CompanyController : BaseController
	{
		private readonly ICompanyRepository comapnyRepository;
		private readonly IMapper mapper;
		public CompanyController( ICompanyRepository comapnyRepository, IMapper mapper )
		{
			this.comapnyRepository = comapnyRepository;
			this.mapper = mapper;
		}

		[HttpPost]
		public async Task<IActionResult> CreateCompany( [FromBody] CompanyDto company, [FromQuery] string username )
		{
			if ( username != null )
				return Ok( mapper.Map<CompanyDto>( await comapnyRepository.CreateCompany( mapper.Map<Company>( company ), username ) ) );
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
		public async Task<IActionResult> GetCompanyStores( int companyId ) => Ok( await comapnyRepository.GetCompanyStores( companyId ) );
		[HttpPost]
		public async Task<IActionResult> AddCompanyStores( StoreDto store, int companyId ) => Ok( mapper.Map<StoreDto>(await comapnyRepository.AddCompanyStore( mapper.Map<Store>(store), companyId ) ));
		[HttpGet]
		public async Task<IActionResult> RemoveCompanyStores( int storeId, int companyId) => Ok( await comapnyRepository.RemoveCompanyStore( storeId, companyId ) );
		[HttpGet]
		public async Task<IActionResult> GetCompanyProducts( int companyId ) => Ok( mapper.Map<List<ProductDto>>( await comapnyRepository.GetCompanyProducts( companyId ) ) );
		[HttpGet]
		public async Task<IActionResult> GetCompanyCategories( int companyId ) => Ok( mapper.Map<List<CategoryDto>>( mapper.Map<List<CategoryDto>>(await comapnyRepository.GetCompanyCategories( companyId ) ) ));
		[HttpPost]
		public async Task<IActionResult> CreateCompanyCategory( [FromBody] CategoryDto category, [FromQuery] int companyId ) => Ok( await comapnyRepository.CreateCompanyCategory( mapper.Map<Category>( category ), companyId ) );

		[HttpPost]
		public async Task<IActionResult> CreateStore( [FromBody] Store store, [FromQuery] int companyId ) =>
			Ok( await comapnyRepository.CreateStore( companyId, store ) );
		[HttpPost]
		public async Task<IActionResult> EditCompany( [FromBody] CompanyDto company ) =>
			Ok( await comapnyRepository.UpdateCompany( mapper.Map<Company>( company )) );
	}
}
