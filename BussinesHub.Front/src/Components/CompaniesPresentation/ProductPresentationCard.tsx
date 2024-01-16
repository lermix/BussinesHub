import React from 'react';
import '../../Styles/CompaniesPresentation/ProductPresentationCard.css';
import { Product } from '../../Models/Product';
interface IProps {
	product: Product;
}

export const ProductPresentationCard: React.FC<IProps> = ({ product }) => {
	return (
		<>
			<div className="productPresentationCardWrapper">
				<div className="productCardImage"></div>
				<div className="productCardName">{product.name}</div>
				<div className="productCardDescription">{product.description}</div>
				<div className="productCardPrice">{product.price}€</div>
			</div>
		</>
	);
};

export default ProductPresentationCard;
