import { Coordinate, CoordinateClass } from './Coordinate';

export interface Store {
	id: number;
	name: string;
	adress: string;
	city: string;
	postalCode: string;
	country: string;
	mobileNumber: string;
	ParentCompanyId: number;
	coordinate: Coordinate;
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
	ParentCompanyId = -1;
	coordinate = new CoordinateClass();
	imagesIds = [];
}
