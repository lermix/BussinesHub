import React from 'react';
import '../../Styles/Companies/CompanyCategories.css';
import { Category } from '../../Models/Category';

const CategoryTree: React.FC<{ categories: Category[]; setSelecteCategory: React.Dispatch<React.SetStateAction<Category | null>> }> = ({
	categories,
	setSelecteCategory,
}) => {
	const renderCategory = (category: Category): JSX.Element => {
		return (
			<ul key={category.id}>
				<li
					onClick={(event) => {
						setSelecteCategory(category);
						console.log(category);
						event.stopPropagation();
					}}
				>
					<p className="catTreeParagraph">{category.name}</p>
					{category.children && category.children.length > 0 && (
						<CategoryTree categories={category.children} setSelecteCategory={setSelecteCategory} />
					)}
				</li>
			</ul>
		);
	};

	return <div>{categories.map((category) => renderCategory(category))}</div>;
};

export default CategoryTree;
