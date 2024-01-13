import React, { useEffect, useState } from 'react';
import '../../Styles/Companies/EditProductAdditionalInfo.css';
import { Product } from '../../Models/Product';
import { ProductAdditionalInfo, ProductAdditionalInfoClass } from '../../Models/AdditionalInfo';
import { ApiProducts } from '../../Api/ProductsController';
import { AddressInfo } from 'net';
import { setGeneralError } from '../../Helper/generalError';
import { Input } from '../../BasicComponents/Input/Input';
import { ApiCompany } from '../../Api/CompanyController';

interface IProps {
	product: Product;
	onClose: () => void;
}

const EditProductAdditionalInfo: React.FC<IProps> = ({ product, onClose }) => {
	const [additionalInfos, setAdditionalInfos] = useState<ProductAdditionalInfo[]>([]);
	const [additionalInfo, setAdditionalInfo] = useState<ProductAdditionalInfo>(new ProductAdditionalInfoClass(product.categoriesIds));
	const [companyAdditionlInfos, setCompanyAdditionlInfos] = useState<ProductAdditionalInfo[]>([]);
	const [companyAdditionlInfosVisible, setCompanyAdditionlInfosVisible] = useState<boolean>(false);
	const [showValues, setShowValues] = useState<boolean>(false);

	const [filterValue, setFilterValue] = useState<string>('');

	useEffect(() => {
		ApiProducts.GetProductAdditionalInfo(product.id)
			.then((res) => setAdditionalInfos(res))
			.catch((ex) => setGeneralError(ex));
		ApiCompany.GetCompanyAdditionalInfos(product.companyId).then((res) => setCompanyAdditionlInfos(res));
	}, []);

	function uniqueArray<T>(ar: T[]): T[] {
		var j: any = {};

		ar.forEach(function (v) {
			j[v + '::' + typeof v] = v;
		});

		return Object.keys(j).map(function (v) {
			return j[v];
		});
	}

	return (
		<>
			{companyAdditionlInfosVisible && (
				<div className="exisitngAdittionalInfosWindowBackground">
					<div className="exisitngAdittionalInfosWindow">
						<div className="epaiwHeader">
							<p
								onClick={() => {
									setCompanyAdditionlInfosVisible(false);
									setShowValues(false);
								}}
							>
								X
							</p>
						</div>
						<Input
							text="pretraži:"
							className="exisitngAdittionalInfosWindowFilter"
							type="text"
							width={'15vw'}
							height={30}
							onChange={(value: string) => setFilterValue(value)}
						/>
						<ul>
							{showValues &&
								[...new Map(companyAdditionlInfos.map((item) => [item['infoValue'], item])).values()]
									.filter((x) => product.categoriesIds.find((y) => x.categorieIds.includes(y)))
									?.filter((x) => x.infoValue.includes(filterValue))
									.filter((x) => x.infoName == additionalInfo.infoName)
									.map((x) => (
										<li
											onClick={() => {
												setAdditionalInfo({ ...additionalInfo, infoValue: x.infoValue });
												setCompanyAdditionlInfosVisible(false);
												setShowValues(false);
											}}
										>
											{x.infoValue}
										</li>
									))}
							{!showValues &&
								[...new Map(companyAdditionlInfos.map((item) => [item['infoName'], item])).values()]
									.filter((x) => product.categoriesIds.find((y) => x.categorieIds.includes(y)))
									?.filter((x) => x.infoName.includes(filterValue))

									.map((x) => (
										<li
											onClick={() => {
												setAdditionalInfo({ ...additionalInfo, infoName: x.infoName });
												setCompanyAdditionlInfosVisible(false);
											}}
										>
											{x.infoName}
										</li>
									))}
						</ul>
					</div>
				</div>
			)}

			<div className="editProductAdditionalInfobackground">
				<div className="editProductAdditionalInfoWindow">
					<div className="epaiwHeader">
						<p onClick={() => onClose()}>X</p>
					</div>
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
						<button className="defaultBtn epaiwBtn" onClick={() => setCompanyAdditionlInfosVisible(true)}>
							Postojeće
						</button>
						<Input
							text="naziv:"
							className="createAdditionalInfoInput"
							type="text"
							width={'15vw'}
							height={30}
							value={additionalInfo.infoValue}
							onChange={(value: string) => setAdditionalInfo({ ...additionalInfo, infoValue: value })}
						/>
						<button
							className="defaultBtn epaiwBtn"
							onClick={() => {
								setCompanyAdditionlInfosVisible(true);
								setShowValues(true);
							}}
						>
							Postojeće
						</button>
						<button
							disabled={additionalInfo.infoName.length === 0 || additionalInfo.infoValue.length === 0}
							className="defaultBtn epaiwBtn"
							onClick={() => {
								console.log(additionalInfo);
								ApiProducts.AddProductAdditionalInfo(product.id, additionalInfo).then((res) => {
									res && setAdditionalInfos([...additionalInfos, res]);
									setAdditionalInfo(new ProductAdditionalInfoClass(product.categoriesIds));

									(companyAdditionlInfos.length === 0 || companyAdditionlInfos.find((x) => x.infoName == x.infoName)) &&
										setCompanyAdditionlInfos([...companyAdditionlInfos, res]);
								});
							}}
						>
							Dodaj
						</button>
					</div>

					<table>
						<tr>
							<th>Naziv dodatne informacije</th>
							<th>tekst dodatne informacije</th>
							<th></th>
						</tr>
						{additionalInfos.map((x) => (
							<tr>
								<td>{x.infoName}</td>
								<td>{x.infoValue}</td>
								<td
									className="epaiwDelete"
									style={{ width: 30 }}
									onClick={() =>
										ApiProducts.RemoveAdditionalInfo(product.id, x.id).then((res) => {
											setAdditionalInfos([...additionalInfos.filter((info) => info.id != res)]),
												setCompanyAdditionlInfos([...companyAdditionlInfos.filter((x) => x.id !== res)]);
										})
									}
								>
									<p>Obriši</p>
								</td>
							</tr>
						))}
					</table>
				</div>
			</div>
		</>
	);
};

export default EditProductAdditionalInfo;
