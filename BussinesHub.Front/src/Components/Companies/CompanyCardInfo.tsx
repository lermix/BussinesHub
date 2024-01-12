import React, { useEffect, useState } from 'react';
import '../../Styles/Companies/CompanyCardInfo.css';
import { Company } from '../../Models/Company';

interface IProps {
	company: Company | undefined;
}

export const CompanyCardInfo: React.FC<IProps> = ({ company }) => {
	const [companyInner, setCompanyInner] = useState<Company | undefined>(company);

	useEffect(() => {
		setCompanyInner(company);
	}, [company]);

	return (
		<>
			{companyInner && (
				<div className="cardInfoWrapper">
					<div className="cardInfoImage"></div>
					<h3>{companyInner.name}</h3>
					<p>{companyInner.description}</p>
				</div>
			)}
		</>
	);
};

export default CompanyCardInfo;
