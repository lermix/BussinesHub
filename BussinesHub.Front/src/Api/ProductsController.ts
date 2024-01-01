import { Product } from '../Models/Product';
import { requests } from './agent';

export const ApiProducts = {
	CreateProduct: (product: Product, companyId: number): Promise<Product> => requests.post(`Product/CreateProduct?companyId=${companyId}`, product),
	UpdateProduct: (product: Product): Promise<Product> => requests.post(`Product/UpdateProduct`, product),
};
