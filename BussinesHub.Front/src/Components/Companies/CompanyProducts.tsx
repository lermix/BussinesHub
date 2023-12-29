import { useState } from 'react';
import '../../Styles/Companies/CompanyProducts.css';
import { useNavigate } from 'react-router-dom';
import { Company } from '../../Models/Company';
import CreateNewProduct from './CreateNewProduct';

interface IProps {
	company: Company;
}

const enum Tabs {
	Products,
	Categories,
}

export const CompanyProducts: React.FC<IProps> = ({ company }) => {
	const navigate = useNavigate();

	return (
		<>
			<div className="companyProductsWrapper">
				<div className="companyProductsList">
					<div className="companyProductsListHeader">
						<h3>Popis proizvoda</h3>
						<div className="CompanyProductsRoundBtn ">+</div>
					</div>
					<ul>
						<li>a</li>
					</ul>
				</div>
				<div className="companyProductsEditor">
					<CreateNewProduct />
				</div>
			</div>
		</>
	);
};

export default CompanyProducts;
