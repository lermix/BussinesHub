export interface Category {
	id: number;
	name: string;
	parentId: number | undefined;
	children: Category[] | null;
}

export class CategoryClass implements Category {
	id = 0;
	name = '';
	parentId = undefined;
	children = [];
}
