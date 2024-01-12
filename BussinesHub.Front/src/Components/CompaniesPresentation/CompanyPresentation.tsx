import React, { useEffect, useState } from 'react';
import { Company } from '../../Models/Company';
import { useSelector } from 'react-redux';
import { AppState } from '../../Store/rootReducer';
import '../../Styles/CompaniesPresentation/CompanyPresentation.css';
import { Product } from '../../Models/Product';
import { ApiCompany } from '../../Api/CompanyController';
import ProductPresentation from './ProductPresentation';
import { useAppDispatch } from '../../Store/hooks';
import { GetCategoriesForCompany } from '../../Store/shared/actions';
import { Category } from '../../Models/Category';
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
							<button className="presentationMenuBtn">Proizvodi</button>
							<button className="presentationMenuBtn">O nama</button>
						</div>
					</div>

					<div className="presentationContent">
						<div className="ProductFilter">
							<div className="MainProductFilter">
								{categories
									.filter((x) => !x.parentId)
									.map((x) => (
										<p>{x.name}</p>
									))}
							</div>
							<div className="AdditionalProductFilter"></div>
						</div>
						<div className="cardContainer cardContainerProduct">
							{products.map((product) => (
								<div className="card cardProduct">
									<ProductPresentation product={product} />
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
