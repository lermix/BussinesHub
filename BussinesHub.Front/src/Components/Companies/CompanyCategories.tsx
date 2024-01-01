import { useEffect, useState } from 'react';
import '../../Styles/Companies/CompanyCategories.css';
import { useNavigate } from 'react-router-dom';
import { Company } from '../../Models/Company';
import CreateNewOrEditProduct from './CreateNewProduct';
import { Product } from '../../Models/Product';
import { ApiCompany } from '../../Api/CompanyController';
import { Category, CategoryClass } from '../../Models/Category';
import { setGeneralError } from '../../Helper/generalError';
import { Input } from '../../BasicComponents/Input/Input';
import CategoryTree from './CategoryTree';

interface IProps {
	company: Company;
}

export const CompanyCategories: React.FC<IProps> = ({ company }) => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [selectedCategory, setSelecteCategory] = useState<Category | null>(null);
	const [newCategory, setNewCategory] = useState<Category>(new CategoryClass());
	useEffect(() => {
		ApiCompany.getCompanyCategories(company.id)
			.then((res) => setCategories(res))
			.catch((ex) => setGeneralError(ex));
	}, []);

	useEffect(() => {
		newCategory.parent = selectedCategory;
	}, [selectedCategory]);
	return (
		<>
			<div className="companyCategoriesWrapper">
				{selectedCategory && (
					<div className="companyCategoriesSelectedCat">
						<p>Dodavanje pod kategoriju: {selectedCategory?.name}</p>
						<div
							className="CompanyCategoriesRoundBtn"
							onClick={() => {
								setSelecteCategory(null);
							}}
						>
							x
						</div>
					</div>
				)}
				<div className="companyCategoriesListHeader">
					<Input
						text="ime kategorije:"
						className="CreateCompanyInput"
						type="text"
						width={'15vw'}
						height={30}
						value={newCategory?.name}
						onChange={(value: string) => setNewCategory({ ...newCategory, name: value })}
					/>

					<div
						className="CompanyCategoriesRoundBtn"
						onClick={() => {
							ApiCompany.createCompanyCategory(newCategory, company.id).then((res) =>
								ApiCompany.getCompanyCategories(company.id).then((cats) => setCategories(cats)),
							);
							setSelecteCategory(null);
						}}
					>
						+
					</div>
				</div>
				<div className="companyCategoriesTree">
					<h3>Popis kategorija</h3>
					<CategoryTree categories={categories} setSelecteCategory={setSelecteCategory} />
				</div>
			</div>
		</>
	);
};

export default CompanyCategories;
