import { Category } from './Category';
import { Image } from './Image';
import { Store } from './Store';
import { Analitic } from './Analitic';

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
	categories: Category[];
	images: Image[];
	stores: Store[];
	analitics: Analitic[];
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
	categories = [];
	images = [];
	stores = [];
	analitics = [];
}
