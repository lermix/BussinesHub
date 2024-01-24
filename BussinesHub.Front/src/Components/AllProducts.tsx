import React, { useEffect, useState } from 'react';
import '../Styles/MainMenu.css';
import { ApiCompany } from '../Api/CompanyController';
import ProductCardInfo from './ProdutCardInfo';
import { Product } from '../Models/Product';

export const Allproducts: React.FC = () => {
	const [allProducts, setAllProducts] = useState<Product[]>([]);

	useEffect(() => {
		GetAll().then((res) => setAllProducts(res));
	}, []);

	const GetAll = async () => {
		const all: Product[] = [];
		const companies = await ApiCompany.GetAllCompanies();
		const promise = new Promise((resolve, reject) => {
			companies.forEach(async (x, i) => {
				(await ApiCompany.getCompanyProducts(x.id)).forEach((product) => {
					console.log(product);
					all.push(product);
				});
				if (i === companies.length - 1) resolve(all);
			});
		});
		await promise;
		return all;
	};

	return (
		<>
			<div className="cardContainer">
				{allProducts.map((product) => (
					<div className="card">
						<ProductCardInfo product={product} />
					</div>
				))}
			</div>
		</>
	);
};

export default Allproducts;
