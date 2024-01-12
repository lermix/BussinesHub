import { useEffect, useState } from 'react';
import '../../Styles/Companies/CompanyProducts.css';
import { useNavigate } from 'react-router-dom';
import { Company } from '../../Models/Company';
import CreateNewOrEditProduct from './CreateNewProduct';
import { Product } from '../../Models/Product';
import { ApiCompany } from '../../Api/CompanyController';

interface IProps {
	company: Company;
}

const enum Tabs {
	Products,
	Categories,
}

export const CompanyProducts: React.FC<IProps> = ({ company }) => {
	const [products, setProducts] = useState<Product[]>([]);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

	useEffect(() => {
		ApiCompany.getCompanyProducts(company.id).then((res) => setProducts(res));
	}, []);

	return (
		<>
			<div className="companyProductsWrapper">
				<div className="companyProductsList">
					<div className="companyProductsListHeader">
						<h3>Popis proizvoda</h3>
						<div className="CompanyProductsRoundBtn" onClick={() => setSelectedProduct(null)}>
							+
						</div>
					</div>
					<ul>
						{products.map((product) => (
							<li onClick={() => setSelectedProduct(product)}>{product.name}</li>
						))}
					</ul>
				</div>
				<div className="companyProductsEditor">
					<CreateNewOrEditProduct
						company={company}
						onNewProduct={(product) => {
							setSelectedProduct(null);
							setProducts([...products, product]);
						}}
						onEditProduct={(product) => setProducts(products.map((item) => (item.id == product.id ? product : item)))}
						onDeleteProduct={(productId) => {
							setSelectedProduct(null);
							setProducts([...products.filter((x) => x.id != productId)]);
						}}
						productToEdit={selectedProduct}
					/>
				</div>
			</div>
		</>
	);
};

export default CompanyProducts;
