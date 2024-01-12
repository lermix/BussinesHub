export interface ProductAdditionalInfo {
	id: number;
	infoName: string;
	infoValue: string;
}

export class ProductAdditionalInfoClass implements ProductAdditionalInfo {
	id = 0;
	infoName = '';
	infoValue = '';
}
