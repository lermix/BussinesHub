import { Company, CompanyClass } from './Company';

export interface Store {
	id: number;
	name: string;
	adress: string;
	city: string;
	postalCode: string;
	country: string;
	mobileNumber: string | null;
	parentCompany: Company;
	imagesIds: number[];
}

export class StoreClass implements Store {
	id = 0;
	name = '';
	adress = '';
	city = '';
	postalCode = '';
	country = '';
	mobileNumber = '';
	parentCompany = new CompanyClass();
	imagesIds = [];
}
