import React, { useState } from 'react';
import '../../Styles/Companies/CompanyCategories.css';
import { Category } from '../../Models/Category';
import { ApiCompany } from '../../Api/CompanyController';

interface IProps {
	categories: Category[];
	setSelecteCategory: React.Dispatch<React.SetStateAction<Category | null>>;
	onDeleteCategory?: (categoryId: number) => void | undefined;
	allowDelete: boolean;
}

const CategoryTree: React.FC<IProps> = ({ categories, setSelecteCategory, onDeleteCategory, allowDelete }) => {
	const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

	const toggleExpand = (categoryId: number) => {
		setExpandedCategories((prevExpanded) => {
			if (prevExpanded.includes(categoryId)) {
				return prevExpanded.filter((id) => id !== categoryId);
			} else {
				return [...prevExpanded, categoryId];
			}
		});
	};

	const isCategoryExpanded = (categoryId: number) => {
		return expandedCategories.includes(categoryId);
	};

	const renderCategory = (category: Category): JSX.Element => {
		const isExpanded = isCategoryExpanded(category.id);

		return (
			<ul key={category.id}>
				<li
					onClick={(event) => {
						setSelecteCategory(category);
						event.stopPropagation();
					}}
				>
					<p className="catTreeParagraph">
						{category.children && category.children?.length > 0 && (
							<span
								onClick={(event) => {
									toggleExpand(category.id);
									event.stopPropagation();
								}}
							>
								{isExpanded ? <span>📂 </span> : <span>📁 </span>}
							</span>
						)}
						{category.name}{' '}
						{allowDelete && (
							<b onClick={() => ApiCompany.removeCompanyCategory(category.id).then((res) => onDeleteCategory && onDeleteCategory(res))}>
								-
							</b>
						)}
					</p>
					{category.children && category.children.length > 0 && (
						<div>
							{isExpanded && (
								<CategoryTree
									categories={category.children}
									setSelecteCategory={setSelecteCategory}
									onDeleteCategory={onDeleteCategory}
									allowDelete={allowDelete}
								/>
							)}
						</div>
					)}
				</li>
			</ul>
		);
	};

	return <div>{categories.map((category) => renderCategory(category))}</div>;
};

export default CategoryTree;
