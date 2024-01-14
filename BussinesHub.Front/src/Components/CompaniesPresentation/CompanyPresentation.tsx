import React, { useCallback, useEffect, useState } from 'react';
import { Company } from '../../Models/Company';
import { useSelector } from 'react-redux';
import { AppState } from '../../Store/rootReducer';
import '../../Styles/CompaniesPresentation/CompanyPresentation.css';
import { Product } from '../../Models/Product';
import { ApiCompany } from '../../Api/CompanyController';
import ProductPresentationCard from './ProductPresentationCard';
import { useAppDispatch } from '../../Store/hooks';
import { GetCategoriesForCompany, SetcompanyToDisplay } from '../../Store/shared/actions';
import { Category } from '../../Models/Category';
import CategoryTree from '../Companies/CategoryTree';
import { ProductAdditionalInfo } from '../../Models/AdditionalInfo';
import { setGeneralError } from '../../Helper/generalError';
interface IStateProps {
	categories: Category[];
}

export const CompanyPresentation: React.FC = () => {
	const dispatch = useAppDispatch();

	const { categories } = useSelector<AppState, IStateProps>((state: AppState): IStateProps => {
		return {
			categories: state.shared.companyCategories,
		};
	});

	const [company, setCompany] = useState<Company | null>(null);
	const [products, setProducts] = useState<Product[]>([]);
	const [selectedCategorie, setSelectedCategorie] = useState<Category | null>(null);
	const [showCatFilter, setShowCatFilter] = useState<boolean>(false);
	const [companyAdditionalInfo, setCompanyAdditionalInfo] = useState<ProductAdditionalInfo[]>([]);
	const [additonalInfoFilters, setAdditonalInfoFilters] = useState<ProductAdditionalInfo[]>([]);

	useEffect(() => {
		ApiCompany.GetAllCompanies().then((res) => setCompany(res.find((x) => x.id === Number(localStorage.getItem('companyToDisplay'))) ?? null));
	}, []);

	useEffect(() => {
		if (company) {
			ApiCompany.getCompanyProducts(company.id).then((res) => setProducts(res));
			dispatch(GetCategoriesForCompany(company.id));
			ApiCompany.GetCompanyAdditionalInfos(company.id)
				.then((res) => setCompanyAdditionalInfo(res))
				.catch((error) => setGeneralError(error));
		}
	}, [company]);

	const filterByAdditionalInfo = (product: Product): boolean => {
		let retValue: boolean = false;
		if (additonalInfoFilters.length === 0) return true;
		for (let i = 0; i < product.additionalInfos.length; i++) {
			const pInfo = product.additionalInfos[i];
			for (let j = 0; j < additonalInfoFilters.length; j++) {
				const fInfo = additonalInfoFilters[j];
				if (pInfo.infoName === fInfo.infoName) {
					if (pInfo.infoValue == fInfo.infoValue) retValue = true;
					else return false;
				}
			}
		}

		return retValue;
	};

	return (
		<>
			{' '}
			<div className="presentationWrapper">
				{company && (
					<>
						<div className="presentationHeader">
							<h1>{company.name}</h1>
							<div className="presentationMenu">
								<button
									className="presentationMenuBtn"
									onClick={() => {
										setSelectedCategorie(null);
										setAdditonalInfoFilters([]);
									}}
								>
									Proizvodi
								</button>
								<button className="presentationMenuBtn">O nama</button>
							</div>
						</div>

						{showCatFilter && (
							<div className="cpwBackground">
								<div className="companyPresentationCatSelectWindwow">
									<CategoryTree
										categories={categories}
										allowDelete={false}
										setSelecteCategory={(cat) => {
											setSelectedCategorie(cat);
											setShowCatFilter(false);
											setAdditonalInfoFilters([]);
										}}
									/>
								</div>
							</div>
						)}

						<div className="presentationContent">
							<div className="ProductFilter">
								<button className="MainProductFilterCatBtn" onClick={() => setShowCatFilter(true)}>
									Kategorije
								</button>
								<div className="PresentationAdditionalProductFilter">
									{selectedCategorie && (
										<div>
											{[...new Map(companyAdditionalInfo.map((item) => [item['infoName'], item])).values()]
												.filter((x) => x.categorieIds.includes(selectedCategorie.id))
												.map((info) => (
													<div className="papfHolder">
														<span>{info.infoName}</span>
														<select
															id={info.infoName}
															onChange={() => {
																var selectBox: any = document.getElementById(info.infoName);
																var selectedValue = selectBox.options[selectBox.selectedIndex].value;
																if (selectedValue.length === 0)
																	setAdditonalInfoFilters([
																		...additonalInfoFilters.filter((x) => x.infoName !== info.infoName),
																	]);
																else {
																	if (additonalInfoFilters.find((x) => x.infoName == info.infoName)) {
																		setAdditonalInfoFilters([
																			...additonalInfoFilters.filter((x) => x.infoName !== info.infoName),
																			{
																				id: 0,
																				infoName: info.infoName,
																				infoValue: selectedValue,
																			} as ProductAdditionalInfo,
																		]);
																	} else
																		setAdditonalInfoFilters([
																			...additonalInfoFilters,
																			{
																				id: 0,
																				infoName: info.infoName,
																				infoValue: selectedValue,
																			} as ProductAdditionalInfo,
																		]);
																}
															}}
														>
															<option value={''}></option>
															{[...new Map(companyAdditionalInfo.map((item) => [item['infoValue'], item])).values()]
																.filter((x) => x.infoName === info.infoName)
																.map((iv) => (
																	<option value={iv.infoValue}>{iv.infoValue}</option>
																))}
														</select>
													</div>
												))}
										</div>
									)}
								</div>
							</div>
							<div className="cardContainer cardContainerProduct">
								{products
									.filter((x) => {
										if (selectedCategorie) return x.categoriesIds.includes(selectedCategorie?.id);
										else return true;
									})
									.filter((x) => filterByAdditionalInfo(x))
									.map((product) => (
										<div className="card cardProduct">
											<ProductPresentationCard product={product} />
										</div>
									))}
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default CompanyPresentation;
