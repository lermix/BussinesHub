import { useEffect, useState } from 'react';
import '../../Styles/Companies/CompanyCategories.css';
import { useNavigate } from 'react-router-dom';
import { Company } from '../../Models/Company';
import CreateNewOrEditProduct from './CreateNewProduct';
import { Product } from '../../Models/Product';
import { ApiCompany } from '../../Api/CompanyController';
import { Category, CategoryClass } from '../../Models/Category';
import { Input } from '../../BasicComponents/Input/Input';
import CategoryTree from './CategoryTree';
import { GetCategoriesForCompany } from '../../Store/shared/actions';
import { useAppDispatch } from '../../Store/hooks';
import { useSelector } from 'react-redux';
import { AppState } from '../../Store/rootReducer';

interface IProps {
	company: Company;
}

interface IStateProps {
	categories: Category[];
}

export const CompanyCategories: React.FC<IProps> = ({ company }) => {
	const dispatch = useAppDispatch();
	const { categories } = useSelector<AppState, IStateProps>((state: AppState): IStateProps => {
		return {
			categories: state.shared.companyCategories,
		};
	});

	const [selectedCategory, setSelecteCategory] = useState<Category | null>(null);
	const [newCategory, setNewCategory] = useState<Category>(new CategoryClass());

	useEffect(() => {
		newCategory.parentId = selectedCategory?.id;
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
							ApiCompany.createCompanyCategory(newCategory, company.id).then((res) => dispatch(GetCategoriesForCompany(company.id)));
							setSelecteCategory(null);
						}}
					>
						+
					</div>
				</div>
				<div className="companyCategoriesTree">
					<h3>Popis kategorija</h3>
					<CategoryTree
						categories={categories}
						setSelecteCategory={setSelecteCategory}
						allowDelete={true}
						onDeleteCategory={() => dispatch(GetCategoriesForCompany(company.id))}
					/>
				</div>
			</div>
		</>
	);
};

export default CompanyCategories;
