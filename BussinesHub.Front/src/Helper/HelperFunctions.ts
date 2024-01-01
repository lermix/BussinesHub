import { Category } from '../Models/Category';

export function getAllTreeItems(tree: Category[]): Category[] {
	const result: Category[] = [];

	function traverse(categories: Category[] | null) {
		if (!categories) return;

		for (const category of categories) {
			result.push(category);
			if (category.children) {
				traverse(category.children);
			}
		}
	}

	traverse(tree);
	return result;
}
