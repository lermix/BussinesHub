export interface ProductAdditionalInfo {
	id: number;
	infoName: string;
	infoValue: string;
	categorieIds: number[];
}

export class ProductAdditionalInfoClass implements ProductAdditionalInfo {
	constructor(categories: number[]) {
		this.categorieIds = categories;
	}

	id = 0;
	infoName = '';
	infoValue = '';
	categorieIds: number[] = [];
}
