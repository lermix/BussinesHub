import { useState } from 'react';
import '../../Styles/UserAccount/UserAccount.css';
import { useNavigate } from 'react-router-dom';
import CompanyProducts from './CompanyProducts';
import { Company } from '../../Models/Company';
import { table } from 'console';
import CompanyCategories from './CompanyCategories';

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
						<button className="userAccMenuBtn" onClick={() => setActiveTab(Tabs.Products)}>
							<p>Proizvodi</p>
						</button>
						<button className="userAccMenuBtn" onClick={() => setActiveTab(Tabs.Categories)}>
							<p>Kategorije</p>
						</button>
						<button className="userAccMenuBtn" onClick={() => CloseAction()}>
							<p>Povratak</p>
						</button>
					</div>
					{activeTab == Tabs.Products && <CompanyProducts company={company} />}
					{activeTab == Tabs.Categories && <CompanyCategories company={company} />}
				</div>
			</div>
		</>
	);
};

export default CompanyManagament;
