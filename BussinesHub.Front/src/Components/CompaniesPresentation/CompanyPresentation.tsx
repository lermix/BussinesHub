import React, { useEffect, useState } from 'react';
import { Company } from '../../Models/Company';
import { useSelector } from 'react-redux';
import { AppState } from '../../Store/rootReducer';
import '../../Styles/CompaniesPresentation/CompanyPresentation.css';
import { Product } from '../../Models/Product';
import { ApiCompany } from '../../Api/CompanyController';
import ProductPresentationCard from './ProductPresentationCard';
import { useAppDispatch } from '../../Store/hooks';
import { GetCategoriesForCompany } from '../../Store/shared/actions';
import { Category } from '../../Models/Category';
import CategoryTree from '../Companies/CategoryTree';
interface IStateProps {
	company: Company | null;
	categories: Category[];
}

export const CompanyPresentation: React.FC = () => {
	const dispatch = useAppDispatch();

	const { company, categories } = useSelector<AppState, IStateProps>((state: AppState): IStateProps => {
		return {
			company: state.shared.companyToDisplay,
			categories: state.shared.companyCategories,
		};
	});

	const [products, setProducts] = useState<Product[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
	const [selectedCategorie, setSelectedCategorie] = useState<Category | null>(null);

	useEffect(() => {
		if (company) {
			ApiCompany.getCompanyProducts(company.id).then((res) => setProducts(res));
			dispatch(GetCategoriesForCompany(company.id));
		}
	}, []);

	return (
		<>
			{company && (
				<div className="presentationWrapper">
					<div className="presentationHeader">
						<h1>{company.name}</h1>
						<div className="presentationMenu">
							<button
								className="presentationMenuBtn"
								onClick={() => {
									setSelectedCategorie(null);
								}}
							>
								Proizvodi
							</button>
							<button className="presentationMenuBtn">O nama</button>
						</div>
					</div>

					<div className="presentationContent">
						<div className="ProductFilter">
							<div className="MainProductFilter">
								<CategoryTree categories={categories} allowDelete={false} setSelecteCategory={(cat) => setSelectedCategorie(cat)} />
							</div>
							<div className="AdditionalProductFilter"></div>
						</div>
						<div className="cardContainer cardContainerProduct">
							{products
								.filter((x) => {
									if (selectedCategorie) return x.categoriesIds.includes(selectedCategorie?.id);
									else return true;
								})
								.map((product) => (
									<div className="card cardProduct">
										<ProductPresentationCard product={product} />
									</div>
								))}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default CompanyPresentation;
