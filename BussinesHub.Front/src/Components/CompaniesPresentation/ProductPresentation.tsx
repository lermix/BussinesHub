import React from 'react';
import '../../Styles/CompaniesPresentation/ProductPresentation.css';
import { Product } from '../../Models/Product';
import img1 from '../../Images/abstract.jpg';
import img2 from '../../Images/abs3.jpg';
interface IProps {
	product: Product;
}

export const ProductPresentation: React.FC<IProps> = ({ product }) => {
	return (
		<>
			<div className="productPresentationWrapper">
				<div className="ppTop">
					<div className="ppSideImages">
						<img src={img1}></img>
						<img src={img2}></img>
					</div>
					<div className="ppImage"></div>
					<div className="ppInfo">
						<h2>{product.name}</h2>
						<p className="ppInfoCode">Šifra: {product.code}</p>
						<p> {product.description}</p>
						<p>{product.price}€</p>
					</div>
				</div>
				<div className="ppDivider"></div>
				<div className="ppBottom">
					<h2>Dodatne informacije</h2>
					<table>
						{product.additionalInfos.map((x) => (
							<tr>
								<td>
									<p>{x.infoName}</p>
								</td>
								<td>
									<p>{x.infoValue}</p>
								</td>
							</tr>
						))}
					</table>
				</div>
			</div>
		</>
	);
};

export default ProductPresentation;
