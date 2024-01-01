export interface Coordinate {
	id: number;
	longitude: number;
	latitude: number;
}

export class CoordinateClass implements Coordinate {
	id = 0;
	longitude = 0;
	latitude = 0;
}
