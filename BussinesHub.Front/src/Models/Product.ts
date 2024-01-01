export interface Product {
	id: number;
	name: string;
	description: string;
	price: number;
	code: string | null;
	vatPercantage: number;
	discountPercanatage: number;
	shipping: boolean;
	avaliable: boolean;
	categoriesIds: number[];
	imagesIds: number[];
}

export class ProductClass implements Product {
	id = 0;
	name = '';
	description = '';
	price = 0;
	code = '';
	vatPercantage = 25;
	discountPercanatage = 0;
	shipping = true;
	avaliable = true;
	categoriesIds = [];
	imagesIds = [];
}
