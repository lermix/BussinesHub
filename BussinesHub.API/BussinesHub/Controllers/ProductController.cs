using AutoMapper;
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
	}
}
