import React, { useState } from 'react'
import '../../Styles/CreateCompany.css'
import Login from '../Users/Login'
import { Input } from '../../basicComponents/Input/Input'
import { Company, CompanyClass } from '../../Models/Company'
import { requests } from '../../Api/agent'

export const CreateCompany: React.FC = () => {
	const [storesAvaliable, setStoresAvaliable] = useState<boolean>(false)
	const [company, setCompany] = useState<Company>(new CompanyClass())
	const [companyCreated, setCompanyCreated] = useState<boolean>(false)
	const [companyInEdit, setCompanyInEdit] = useState<boolean>(false)

	const apiActions = {
		createCompany: (company: Company): Promise<Company> => requests.post(`Company/CreateCompany?username=${verifiedUser?.username}`, company),
		EditCompany: (company: Company): Promise<Company> => requests.post(`Company/EditCompany`, company),
	}

	const CreateCompanyClick = () => {
		apiActions.createCompany(company).then((res) => {
			document.cookie = `companyInEdit=` + res + `;path=/`
			setCompany(res)
			setCompanyCreated(true)
			setStoresAvaliable(true)
		})
	}

	const EditCompany = () => {
		apiActions.EditCompany(company).then((res) => {
			document.cookie = `companyInEdit=` + res + `;path=/`
			setCompany(res)
			setStoresAvaliable(true)
			setCompanyInEdit(false)
		})
	}

	const storeStyles = `.CreateCompanyAddBtn:hover {
	background-color: #88dbbc;
	color: #112d32;
	cursor: pointer;
  }
  `

	return (
		<>
			{storesAvaliable && <style>{storeStyles}</style>}
			{false && <Login />}
			{true && (
				<>
					<div className="createCompanyContainer">
						<div className="createCompanyHeader">
							<h2>Kompanija</h2>
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
								onChange={(value: string) => setCompany({ ...company, name: value })}
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
								<button className="CreateCompanyAddBtn">+</button>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	)
}

export default CreateCompany
