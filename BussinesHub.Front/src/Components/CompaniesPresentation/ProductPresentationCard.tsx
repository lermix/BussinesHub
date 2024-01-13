import React from 'react';
import '../../Styles/CompaniesPresentation/ProductPresentation.css';
import { Product } from '../../Models/Product';
interface IProps {
	product: Product;
}

export const ProductPresentationCard: React.FC<IProps> = ({ product }) => {
	return (
		<>
			<div className="productPresentationWrapper">
				<div className="productImage"></div>
				<div className="productName">{product.name}</div>
				<div className="productDescription">{product.description}</div>
				<div className="productPrice">{product.price}€</div>
			</div>
		</>
	);
};

export default ProductPresentationCard;
