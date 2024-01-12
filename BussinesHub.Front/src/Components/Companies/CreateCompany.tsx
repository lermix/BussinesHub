import React, { ChangeEvent, useEffect, useState } from 'react';
import '../../Styles/CreateCompany.css';
import Login from '../Users/Login';
import { Input } from '../../BasicComponents/Input/Input';
import { Company, CompanyClass } from '../../Models/Company';
import { useNavigate } from 'react-router-dom';
import { GetUserFromLocal } from '../../Store/LocalStorage';
import { ApiCompany } from '../../Api/CompanyController';
import CreateCompanyStore from './CreateCompanyStore';
import { Store } from '../../Models/Store';
import { Textarea } from '../../BasicComponents/Input/Textarea';

interface IProps {
	initalCompany?: Company | null;
	CloseAction?: () => void | null;
}

export const CreateCompany: React.FC<IProps> = ({ initalCompany, CloseAction }) => {
	const navigate = useNavigate();

	const [storesAvaliable, setStoresAvaliable] = useState<boolean>(initalCompany ? true : false);
	const [company, setCompany] = useState<Company>(initalCompany ?? new CompanyClass());
	const [companyCreated, setCompanyCreated] = useState<boolean>(initalCompany ? true : false);
	const [companyInEdit, setCompanyInEdit] = useState<boolean>(initalCompany ? true : false);
	const [showCreateStore, setShowCreateStore] = useState<boolean>(false);
	const [selectedStore, setSelectedStore] = useState<Store | null>(null);

	useEffect(() => {
		if (initalCompany) {
			setCompany(initalCompany);
			setCompanyInEdit(false);
			setStoresAvaliable(true);
			setCompanyCreated(true);
		}
	}, [initalCompany]);

	const CreateCompanyClick = () => {
		ApiCompany.createCompany(company, GetUserFromLocal()?.username ?? '').then((res) => {
			setCompanyCreated(true);
			setCompany(res);
			setStoresAvaliable(true);
		});
	};

	const EditCompany = () => {
		ApiCompany.EditCompany(company).then((res) => {
			setCompany(res);
			setStoresAvaliable(true);
			setCompanyInEdit(false);
		});
	};

	const storeStyles = `.CreateCompanyRoundBtn:hover {
	background-color: #88dbbc;
	color: #112d32;
	cursor: pointer;
  }
  `;

	return (
		<>
			{storesAvaliable && <style>{storeStyles}</style>}
			{false && <Login />}
			{true && (
				<>
					<div className="createCompanyContainer">
						<div className="createCompanyHeader">
							<h2>Tvrtka</h2>
							<div className="CreateCompanyRoundBtn createCompanyHomeBtn" onClick={() => navigate('/')}></div>
							{CloseAction && <div className="CreateCompanyRoundBtn createCompanyBackBtn" onClick={() => CloseAction()}></div>}
						</div>
						<div className="CreateCompanyForm">
							<Input
								className="CreateCompanyinput"
								type="text"
								width={'15vw'}
								height={30}
								text={'ime tvrtke'}
								value={company.name}
								onChange={(value: string) => setCompany({ ...company, name: value })}
							/>
							<Input
								className="CreateCompanyinput"
								type="text"
								width={'15vw'}
								height={30}
								text={'adresa'}
								value={company.adress}
								onChange={(value: string) => setCompany({ ...company, adress: value })}
							/>
							<Input
								className="CreateCompanyinput"
								type="text"
								width={'15vw'}
								height={30}
								text={'grad'}
								value={company.city}
								onChange={(value: string) => setCompany({ ...company, city: value })}
							/>
							<Input
								className="CreateCompanyinput"
								type="text"
								width={'15vw'}
								height={30}
								text={'poštanski broj'}
								value={company.postalCode}
								onChange={(value: string) => setCompany({ ...company, postalCode: value })}
							/>
							<Input
								className="CreateCompanyinput"
								type="text"
								width={'15vw'}
								height={30}
								text={'država'}
								value={company.country}
								onChange={(value: string) => setCompany({ ...company, country: value })}
							/>
							<Input
								className="CreateCompanyinput"
								type="text"
								width={'15vw'}
								height={30}
								text={'oib'}
								value={company.identificationNumber}
								onChange={(value: string) => setCompany({ ...company, identificationNumber: value })}
							/>
							<Input
								className="CreateCompanyinput"
								type="text"
								width={'15vw'}
								height={30}
								text={'telefonski broj'}
								value={company.phoneNumber}
								onChange={(value: string) => setCompany({ ...company, phoneNumber: value })}
							/>
							<Textarea
								className="CreateCompanyinput"
								width={'15vw'}
								height={120}
								text={'Opis'}
								value={company.description}
								onChange={(value: string) => setCompany({ ...company, description: value })}
							/>
							{companyCreated ? (
								companyInEdit ? (
									<button className="createCompanyBtn" onClick={EditCompany}>
										Potvrdi
									</button>
								) : (
									<button className="createCompanyBtn" onClick={() => setCompanyInEdit(true)}>
										Uredi
									</button>
								)
							) : (
								<button className="createCompanyBtn" onClick={CreateCompanyClick}>
									Kreiraj
								</button>
							)}
						</div>
					</div>
					<div className="createCompanyStoreContainer" style={storesAvaliable && !companyInEdit ? { opacity: 1 } : { opacity: 0.7 }}>
						<div className="ccscLeft">
							<div className="createCompanyHeader">
								<h2>Poslovnice</h2>
								<button
									className="CreateCompanyRoundBtn"
									onClick={() => {
										setShowCreateStore(true);
										setSelectedStore(null);
									}}
								>
									+
								</button>
							</div>
							<ul>
								{company.stores.map((st) => (
									<li onClick={() => setSelectedStore(st)}>{st.name}</li>
								))}
							</ul>
						</div>
						<div className="ccscRight">
							{showCreateStore && (
								<CreateCompanyStore
									company={company}
									onStoreCreated={(store) => setCompany({ ...company, stores: [...company.stores, store] })}
								/>
							)}
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default CreateCompany;
