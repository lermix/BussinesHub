using BH.Model.General;
using BH.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BussinesHub.Controllers
{
	public class ProductController : BaseController
	{
		private readonly IProductRepository productRepository;
		public ProductController( IProductRepository productRepository )
		{
			this.productRepository = productRepository;
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
		public async Task<IActionResult> CreateProduct( Product product ) => Ok( productRepository.CreateProduct( product ) );
		[HttpPost]
		public async Task<IActionResult> UpdateProduct( Product product ) => Ok( productRepository.UpdateProduct( product ) );
	}
}
