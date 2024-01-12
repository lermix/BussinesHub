import { ProductAdditionalInfo } from '../Models/AdditionalInfo';
import { Product } from '../Models/Product';
import { requests } from './agent';

export const ApiProducts = {
	CreateProduct: (product: Product, companyId: number): Promise<Product> => requests.post(`Product/CreateProduct?companyId=${companyId}`, product),
	UpdateProduct: (product: Product): Promise<Product> => requests.post(`Product/UpdateProduct`, product),
	AddProductCategory: (productId: number, categoryId: number): Promise<number[]> =>
		requests.get(`Product/AddProductCategory?productId=${productId}&categoryId=${categoryId}`),
	RemoveProductCategory: (productId: number, categoryId: number): Promise<number[]> =>
		requests.get(`Product/RemoveProductCategory?productId=${productId}&categoryId=${categoryId}`),
	DeleteProduct: (productId: number): Promise<number> => requests.post(`Product/DeleteProduct?productId=${productId}`, {}),
	AddProductAdditionalInfo: (productId: number, aditionalInfo: ProductAdditionalInfo): Promise<ProductAdditionalInfo> =>
		requests.post(`Product/DeleteProduct?productId=${productId}`, { aditionalInfo }),
	RemoveAdditionalInfo: (productId: number, additionalInfoId: number): Promise<number> =>
		requests.get(`Product/RemoveAdditionalInfo?productId=${productId}&additionalInfoId=${additionalInfoId}`),
	GetProductAdditionalInfo: (productId: number): Promise<ProductAdditionalInfo[]> =>
		requests.get(`Product/RemoveProductCategory?productId=${productId}`),
};
