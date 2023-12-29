import { useState } from 'react';
import '../../Styles/UserAccount/UserAccount.css';
import { useNavigate } from 'react-router-dom';
import CompanyProducts from './CompanyProducts';
import { Company } from '../../Models/Company';

interface IProps {
	CloseAction: () => void | null;
	company: Company;
}

const enum Tabs {
	Products,
	Categories,
}

export const CompanyManagament: React.FC<IProps> = ({ CloseAction, company }) => {
	const navigate = useNavigate();

	const [activeTab, setActiveTab] = useState<Tabs>(Tabs.Products);

	return (
		<>
			<div className="userAccWrapper">
				<div className="userAccMain">
					<div className="userAccMenuBtnontainer">
						<button className="userAccMenuBtn">
							<p>Proizvodi</p>
						</button>
						<button className="userAccMenuBtn">
							<p>Kategorije</p>
						</button>
						<button className="userAccMenuBtn" onClick={() => CloseAction()}>
							<p>Povratak</p>
						</button>
					</div>
					<CompanyProducts company={company} />
				</div>
			</div>
		</>
	);
};

export default CompanyManagament;
