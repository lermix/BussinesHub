using BH.Model.General;
using BH.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BussinesHub.Controllers
{
	public class StoreController : BaseController
	{

		private readonly IStoreRepository storeRepository;
		public StoreController( IStoreRepository storeRepository )
		{
			this.storeRepository = storeRepository;
		}

		[HttpPost]
		public async Task<IActionResult> CreateStore( Store store ) => Ok( storeRepository.CreateStore( store ) );

		[HttpPost]
		public async Task<ActionResult> DeleteStore( int storeId )
		{
			int deletedId = await storeRepository.DeleteStore( storeId );
			if(deletedId == -1)
				NotFound(storeId);

			return Ok( deletedId );
		}

		[HttpPost]
		public async Task<ActionResult> UpdateStore( Store store ) => Ok( storeRepository.UpdateStore( store ) );

		[HttpGet]
		public async Task<ActionResult> GetStoreProduct( int storeId ) => Ok( storeRepository.GetStoreProduct( storeId ) );
		[HttpPost]
		public async Task<ActionResult> AddProductToStore([FromBody] Product product,[FromQuery] int storeId ) => Ok( storeRepository.AddProductToStore( product, storeId ) );
		[HttpPost]
		public async Task<ActionResult> DeleteProductFromStore( int productId, int storeId )
		{
			var deletedId =  await storeRepository.DeleteProductFromStore( productId, storeId );
			if(deletedId == -1)
				return NotFound( productId );

			return Ok( deletedId );
		}
	}
}
