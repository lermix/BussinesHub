import { useMemo, useState } from 'react';
import '../../../Styles/UserAccount/UACompanyDisplay.css';
import { Company } from '../../../Models/Company';
import { useNavigate } from 'react-router-dom';

interface IProps {
	userCompanies: Company[];
	setCompanyToEdit: React.Dispatch<React.SetStateAction<Company | null>>;
	setCompanyToEditProducts: React.Dispatch<React.SetStateAction<Company | null>>;
}

export const UACompanyDisplay: React.FC<IProps> = ({ userCompanies, setCompanyToEdit, setCompanyToEditProducts }) => {
	const navigate = useNavigate();
	const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

	return (
		<>
			<div className="userAccCompanySettings">
				{userCompanies.length > 0 && (
					<>
						<div className="userAccCompanyListContainer">
							<h2>Companies</h2>
							<ul className="userAccCompanyList">
								{userCompanies.map((company) => (
									<li onClick={() => setSelectedCompany(company)}>{company.name}</li>
								))}
							</ul>
						</div>
						{selectedCompany && (
							<div className="userAccCompanyControl">
								<div className="userAccCompanyInfo">
									<div className="userAccCompanyParagraphWraper">
										<b>Ime: </b>
										<p>{selectedCompany?.name}</p>
									</div>

									<div className="userAccCompanyParagraphWraper">
										<b>OIB:</b>
										<p>{selectedCompany?.identificationNumber}</p>
									</div>
									<div className="userAccCompanyParagraphWraper">
										<b>Adresa:</b>
										<p>{selectedCompany?.adress}</p>
									</div>
									<div className="userAccCompanyParagraphWraper">
										<b>Grad:</b>
										<p>{selectedCompany?.city}</p>
									</div>
									<div className="userAccCompanyParagraphWraper">
										<b>Poštanski broj:</b>
										<p>{selectedCompany?.postalCode}</p>
									</div>
									<div className="userAccCompanyParagraphWraper">
										<b>Država:</b>
										<p>{selectedCompany?.country}</p>
									</div>
									<div className="userAccCompanyParagraphWraper">
										<b>Broj mobitela:</b>
										<p>{selectedCompany?.phoneNumber}</p>
									</div>
								</div>
								<div className="userAccCompanyFunctions">
									<div className="uacFunctions1">
										<button className="defaultBtn" onClick={() => setCompanyToEdit(selectedCompany)}>
											Uredi podatke i poslovnice
										</button>
									</div>
									<div className="uacFunctions1">
										<button className="defaultBtn" onClick={() => setCompanyToEditProducts(selectedCompany)}>
											Upravljanje proizvodima
										</button>
									</div>
								</div>
							</div>
						)}
					</>
				)}
				{userCompanies.length === 0 && (
					<div className="UserAccNoCompanies">
						<p>Nemate aktivnu tvrtku</p>
						<button className="defaultBtn" onClick={() => navigate('/CreateCompany')}>
							Kreiraj tvrtku
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export default UACompanyDisplay;
