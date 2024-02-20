using AutoMapper;
using BH.Model.Dtos;
using BH.Model.General;
using BH.Repository.Interfaces;
using BH.Repository.Repos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;

namespace BussinesHub.Controllers
{
	public class CompanyController : BaseController
	{
		private readonly ICompanyRepository companyRepository;
		private readonly IMapper mapper;
		public CompanyController( ICompanyRepository comapnyRepository, IMapper mapper )
		{
			this.companyRepository = comapnyRepository;
			this.mapper = mapper;
		}

		[HttpPost]
		public async Task<IActionResult> CreateCompany( [FromBody] CompanyDto company, [FromQuery] string username )
		{
			if ( username != null )
				return Ok( mapper.Map<CompanyDto>( await companyRepository.CreateCompany( mapper.Map<Company>( company ), username ) ) );
			else
				return BadRequest( "No username" );
		}

		[HttpPost]
		public async Task<IActionResult> DeleteCompany( [FromQuery] int companyId )
		{
			int deletedId = await companyRepository.DeleteCompany( companyId );
			if ( deletedId == -1 )
				NotFound( companyId );

			return Ok( deletedId );
		}
		[HttpGet]
		public async Task<IActionResult> GetAllCompanies() => Ok(await companyRepository.GetAllCompanies());
		[HttpGet]
		public async Task<IActionResult> GetCompanyStores( int companyId ) => Ok( await companyRepository.GetCompanyStores( companyId ) );
		[HttpPost]
		public async Task<IActionResult> AddCompanyStores( StoreDto store, int companyId ) => Ok( mapper.Map<StoreDto>(await companyRepository.AddCompanyStore( mapper.Map<Store>(store), companyId ) ));
		[HttpGet]
		public async Task<IActionResult> RemoveCompanyStores( int storeId, int companyId) => Ok( await companyRepository.RemoveCompanyStore( storeId, companyId ) );
		[HttpGet]
		public async Task<IActionResult> GetCompanyProducts( int companyId ) => Ok( mapper.Map<List<ProductDto>>( await companyRepository.GetCompanyProducts( companyId ) ) );
		[HttpGet]
		public async Task<IActionResult> GetCompanyCategories( int companyId ) => Ok( mapper.Map<List<CategoryDto>>( mapper.Map<List<CategoryDto>>(await companyRepository.GetCompanyCategories( companyId ) ) ));
		[HttpPost]
		public async Task<IActionResult> CreateCompanyCategory( [FromBody] CategoryDto category, [FromQuery] int companyId ) => Ok( await companyRepository.CreateCompanyCategory( mapper.Map<Category>( category ), companyId ) );
		[HttpGet]
		public async Task<IActionResult> RemoveCompanyCategory( int categoryId ) => Ok(  await companyRepository.RemoveCompanyCategory( categoryId ) );

		[HttpPost]
		public async Task<IActionResult> CreateStore( [FromBody] Store store, [FromQuery] int companyId ) =>
			Ok( await companyRepository.CreateStore( companyId, store ) );
		[HttpPost]
		public async Task<IActionResult> EditCompany( [FromBody] CompanyDto company ) =>
			Ok( await companyRepository.UpdateCompany( mapper.Map<Company>( company )) );

		[HttpGet]
		public async Task<IActionResult> GetCompanyAdditionalInfos( int companyId ) => Ok( mapper.Map<List<ProductAdditionalInfoDto>>(await companyRepository.GetCompanyAdditionalInfos( companyId ) ));

		[HttpGet]
		public async Task<IActionResult> GetGraphData( int companyId ) => Ok( mapper.Map<List<GraphDataDto>>( await companyRepository.GetGraphData( companyId ) ) );
	}
}
