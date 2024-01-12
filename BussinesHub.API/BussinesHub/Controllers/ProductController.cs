using AutoMapper;
using BH.Database.Migrations;
using BH.Model.Dtos;
using BH.Model.General;
using BH.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BussinesHub.Controllers
{
	public class ProductController : BaseController
	{
		private readonly IProductRepository productRepository;
		private readonly IMapper mapper;
		public ProductController( IProductRepository productRepository, IMapper mapper )
		{
			this.productRepository = productRepository;
			this.mapper = mapper;
		}

		[HttpPost]
		public async Task<IActionResult> DeleteProduct( int ProductId )
		{
			int deletedId = await productRepository.DeleteProduct( ProductId );
			if ( deletedId == -1 )
				NotFound( ProductId );

			return Ok( deletedId );
		}

		[HttpPost]
		public async Task<IActionResult> CreateProduct( [FromBody]ProductDto product, [FromQuery]int companyId ) => Ok( await productRepository.CreateProduct( mapper.Map<Product>(product), companyId ) );
		[HttpPost]
		public async Task<IActionResult> UpdateProduct( Product product ) => Ok( await productRepository.UpdateProduct( product ) );

		[HttpGet]
		public async Task<IActionResult> AddProductCategory( int productId, int categoryId ) => Ok( await productRepository.AddProductCategory( productId, categoryId ) );

		[HttpGet]
		public async Task<IActionResult> RemoveProductCategory( int productId, int categoryId ) => Ok( await productRepository.RemoveProductCategory( productId, categoryId ) );

		[HttpGet]
		public async Task<IActionResult> AddProductAdditionalInfo( [FromQuery]int productId, [FromBody]ProductAdditionalInfoDto additionalInfo ) => Ok( await productRepository.AddProductAdditionalInfo( productId, mapper.Map<ProductAdditionalInfo>(additionalInfo) ) );
		[HttpGet]
		public async Task<IActionResult> RemoveAdditionalInfo( int productId, int additionalInfoId ) => Ok( await productRepository.RemoveAdditionalInfo( productId, additionalInfoId ) );
		[HttpGet]
		public async Task<IActionResult> GetProductAdditionalInfo( int productId ) => Ok( await productRepository.GetProductAdditionalInfo( productId ) );
	}

}
