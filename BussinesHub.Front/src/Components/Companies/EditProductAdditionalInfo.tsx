import React, { useEffect, useState } from 'react';
import '../../Styles/Companies/EditProductAdditionalInfo.css';
import { Product } from '../../Models/Product';
import { ProductAdditionalInfo, ProductAdditionalInfoClass } from '../../Models/AdditionalInfo';
import { ApiProducts } from '../../Api/ProductsController';
import { AddressInfo } from 'net';
import { setGeneralError } from '../../Helper/generalError';
import { Input } from '../../BasicComponents/Input/Input';

interface IProps {
	product: Product;
	onClose: (newAdditionalInfo: ProductAdditionalInfo[]) => void;
}

const EditProductAdditionalInfo: React.FC<IProps> = ({ product }) => {
	const [additionalInfos, setAdditionalInfos] = useState<ProductAdditionalInfo[]>([]);
	const [additionalInfo, setAdditionalInfo] = useState<ProductAdditionalInfo>(new ProductAdditionalInfoClass());
	const [newAdditionalInfos, setNewAdditionalInfos] = useState<ProductAdditionalInfo[]>([]);

	useEffect(() => {
		ApiProducts.GetProductAdditionalInfo(product.id)
			.then((res) => setAdditionalInfos(res))
			.catch((ex) => setGeneralError(ex));
	}, []);

	return (
		<div className="editProductAdditionalInfobackground">
			<div className="editProductAdditionalInfoWindow">
				<div className="epaiwInputs">
					<Input
						text="naziv:"
						className="createAdditionalInfoInput"
						type="text"
						width={'15vw'}
						height={30}
						value={additionalInfo.infoName}
						onChange={(value: string) => setAdditionalInfo({ ...additionalInfo, infoName: value })}
					/>
					<Input
						text="naziv:"
						className="createAdditionalInfoInput"
						type="text"
						width={'15vw'}
						height={30}
						value={additionalInfo.infoValue}
						onChange={(value: string) => setAdditionalInfo({ ...additionalInfo, infoName: value })}
					/>
					<button
						className="defaultBtn epaiwBtn"
						onClick={() =>
							ApiProducts.AddProductAdditionalInfo(product.id, additionalInfo).then((res) => {
								setAdditionalInfos([...additionalInfos, res]);
								setNewAdditionalInfos([...newAdditionalInfos, res]);
							})
						}
					>
						Dodaj
					</button>
				</div>

				<table>
					<tr>
						<th>Naziv dodatne informacije</th>
						<th>tekst dodatne informacije</th>
					</tr>
					{additionalInfos.map((x) => (
						<tr>
							<td>{x.infoName}</td>
							<td>{x.infoValue}</td>
						</tr>
					))}
				</table>
			</div>
		</div>
	);
};

export default EditProductAdditionalInfo;
