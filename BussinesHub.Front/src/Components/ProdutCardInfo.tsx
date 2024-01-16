import React from 'react';
import '../Styles/Companies/CompanyCardInfo.css';
import { Product } from '../Models/Product';

interface IProps {
	product: Product;
}

export const ProductCardInfo: React.FC<IProps> = ({ product }) => {
	return (
		<>
			{product && (
				<div className="cardInfoWrapper">
					<div className="cardInfoImage"></div>
					<h3>{product.name}</h3>
					<p className="cardInfoDesc">{product.description}</p>
					<p>{product.price} €</p>
				</div>
			)}
		</>
	);
};

export default ProductCardInfo;
