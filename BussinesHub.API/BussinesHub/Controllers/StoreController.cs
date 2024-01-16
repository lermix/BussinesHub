using AutoMapper;
using BH.Model.Dtos;
using BH.Model.General;
using BH.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BussinesHub.Controllers
{
	public class StoreController : BaseController
	{

		private readonly IStoreRepository storeRepository;
		private readonly IMapper mapper;
		public StoreController( IStoreRepository storeRepository, IMapper mapper )
		{
			this.storeRepository = storeRepository;
			this.mapper = mapper;
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
		public async Task<ActionResult> UpdateStore( StoreDto store ) => Ok( mapper.Map<StoreDto>( await storeRepository.UpdateStore( mapper.Map<Store>( store ))) );

		[HttpGet]
		public async Task<ActionResult> GetStoreProduct( int storeId ) => Ok( storeRepository.GetStoreProduct( storeId ) );
		[HttpPost]
		public async Task<ActionResult> AddProductToStore(AddProductToStoreDto productInfo ) => Ok( storeRepository.AddProductToStore( productInfo.ProductId, productInfo.StoreId, productInfo.ProductCount ) );
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
