import React, { useEffect, useState } from 'react';
import '../../Styles/MainMenu.css';
import { Company } from '../../Models/Company';
import { ApiCompany } from '../../Api/CompanyController';
import CompanyCardInfo from './CompanyCardInfo';
import { useAppDispatch } from '../../Store/hooks';
import { SetcompanyToDisplay } from '../../Store/shared/actions';
import { Navigate, useNavigate } from 'react-router-dom';

export const CompaniesGrid: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [companies, setCompanies] = useState<Company[]>([]);

	useEffect(() => {
		ApiCompany.GetAllCompanies().then((res) => setCompanies(res));
	}, []);

	return (
		<>
			<div className="cardContainer">
				{companies.map((company) => (
					<div
						className="card"
						onClick={() => {
							dispatch(SetcompanyToDisplay(company));
							navigate('/companyPresentation');
						}}
					>
						<CompanyCardInfo company={company} />
					</div>
				))}
			</div>
		</>
	);
};

export default CompaniesGrid;
