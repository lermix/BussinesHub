export interface Category {
	id: number;
	name: string;
	parent: Category | null;
	children: Category[] | null;
}

export class CategoryClass implements Category {
	id = 0;
	name = '';
	parent = null;
	children = [];
}
