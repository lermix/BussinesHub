import React, { useState } from 'react';
import '../../Styles/CreateCompany.css';
import Login from '../Users/Login';
import { Input } from '../../BasicComponents/Input/Input';
import { Company, CompanyClass } from '../../Models/Company';
import { requests } from '../../Api/agent';
import { useNavigate } from 'react-router-dom';
import { GetUserFromLocal } from '../../Store/LocalStorage';

interface IProps {
	initalCompany: Company | null;
	CloseAction: () => void | null;
}

export const CreateCompany: React.FC<IProps> = ({ initalCompany, CloseAction }) => {
	const navigate = useNavigate();

	const [storesAvaliable, setStoresAvaliable] = useState<boolean>(false);
	const [company, setCompany] = useState<Company>(initalCompany ?? new CompanyClass());
	const [companyCreated, setCompanyCreated] = useState<boolean>(initalCompany ? true : false);
	const [companyInEdit, setCompanyInEdit] = useState<boolean>(initalCompany ? true : false);

	const apiActions = {
		createCompany: (company: Company, username: string): Promise<Company> => requests.post(`Company/CreateCompany?username=${username}`, company),
		EditCompany: (company: Company): Promise<Company> => requests.post(`Company/EditCompany`, company),
	};

	const CreateCompanyClick = () => {
		apiActions.createCompany(company, GetUserFromLocal()?.username ?? '').then((res) => {
			setCompanyCreated(true);
			setCompany(res);
			setStoresAvaliable(true);

			console.log(res);
		});
	};

	const EditCompany = () => {
		apiActions.EditCompany(company).then((res) => {
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
							<h2>Kompanija</h2>
							<div className="CreateCompanyRoundBtn createCompanyHomeBtn" onClick={() => navigate('/')}></div>
							{CloseAction && <div className="CreateCompanyRoundBtn createCompanyBackBtn" onClick={() => CloseAction()}></div>}
						</div>
						<div className="CreateCompanyForm">
							<Input
								className="CreateCompanyinput"
								type="text"
								width={'15vw'}
								height={30}
								text={'ime kompanije'}
								onChange={(value: string) => setCompany({ ...company, name: value })}
							/>
							<Input
								className="CreateCompanyinput"
								type="text"
								width={'15vw'}
								height={30}
								text={'adresa'}
								onChange={(value: string) => setCompany({ ...company, adress: value })}
							/>
							<Input
								className="CreateCompanyinput"
								type="text"
								width={'15vw'}
								height={30}
								text={'grad'}
								onChange={(value: string) => setCompany({ ...company, city: value })}
							/>
							<Input
								className="CreateCompanyinput"
								type="text"
								width={'15vw'}
								height={30}
								text={'poštanski broj'}
								onChange={(value: string) => setCompany({ ...company, postalCode: value })}
							/>
							<Input
								className="CreateCompanyinput"
								type="text"
								width={'15vw'}
								height={30}
								text={'država'}
								onChange={(value: string) => setCompany({ ...company, country: value })}
							/>
							<Input
								className="CreateCompanyinput"
								type="text"
								width={'15vw'}
								height={30}
								text={'oib'}
								onChange={(value: string) => setCompany({ ...company, identificationNumber: value })}
							/>
							<Input
								className="CreateCompanyinput"
								type="text"
								width={'15vw'}
								height={30}
								text={'telefonski broj'}
								onChange={(value: string) => setCompany({ ...company, phoneNumber: value })}
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
								<button className="CreateCompanyRoundBtn">+</button>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default CreateCompany;
