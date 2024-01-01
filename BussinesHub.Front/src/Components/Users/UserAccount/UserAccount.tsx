import { useEffect, useState } from 'react';
import { ApiUser } from '../../../Api/UserController';
import { GetUserFromLocal } from '../../../Store/LocalStorage';
import '../../../Styles/UserAccount/UserAccount.css';
import { User } from '../../../Models/User';
import { Company } from '../../../Models/Company';
import { useNavigate } from 'react-router-dom';
import UACompanyDisplay from './UACompanyDisplay';
import CreateCompany from '../../Companies/CreateCompany';
import CompanyManagament from '../../Companies/CompanyManagament';

export const UserAccount: React.FC = () => {
	const navigate = useNavigate();

	const [user, setUser] = useState<User | null>(GetUserFromLocal());
	const [userCompanies, setUserCompanies] = useState<Company[]>([]);
	const [companyToEditInfo, setCompanyToEditInfo] = useState<Company | null>(null);
	const [companyToEditProducts, setCompanyToEditProducts] = useState<Company | null>(null);
	window.addEventListener('storage', () => {
		console.log(GetUserFromLocal());
		setUser(GetUserFromLocal());
	});

	useEffect(() => {
		ApiUser.GetUserCompanies(user?.username ?? '').then((res) => setUserCompanies(res));
	}, []);

	return (
		<>
			{user && !companyToEditInfo && !companyToEditProducts && (
				<div className="userAccWrapper">
					<div className="userAccMain">
						<div className="userAccMenuBtnontainer">
							<button
								className="userAccMenuBtn"
								onClick={() => ApiUser.GetUserCompanies(user?.username ?? '').then((res) => setUserCompanies(res))}
							>
								<p>Tvrtke</p>
							</button>
							<button className="userAccMenuBtn" onClick={() => navigate('/')}>
								<p>Povratak</p>
							</button>
						</div>
						<UACompanyDisplay
							userCompanies={userCompanies}
							setCompanyToEdit={setCompanyToEditInfo}
							setCompanyToEditProducts={setCompanyToEditProducts}
						/>
					</div>
				</div>
			)}
			{companyToEditInfo && <CreateCompany initalCompany={companyToEditInfo} CloseAction={() => setCompanyToEditInfo(null)} />}
			{companyToEditProducts && <CompanyManagament company={companyToEditProducts} CloseAction={() => setCompanyToEditProducts(null)} />}
		</>
	);
};

export default UserAccount;
