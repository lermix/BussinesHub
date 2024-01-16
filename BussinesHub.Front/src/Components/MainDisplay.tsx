import React, { useEffect, useState } from 'react';
import '../Styles/MainDisplay.css';
import '../Styles/CompaniesGrid.css';
import '../Styles/Scrollbar.css';
import { MainMenu, TabsEnum } from './Menus/MainMenu';
import CompaniesGrid from './Companies/CompaniesGrid';
import { GetUserFromLocal } from '../Store/LocalStorage';
import Allproducts from './AllProducts';

export const mainDisplay: React.FC = () => {
	const [username, setUsrname] = useState<string | null>(GetUserFromLocal()?.username ?? null);
	const [selectedTab, setSelectedTab] = useState<TabsEnum>(TabsEnum.Companies);
	window.addEventListener('storage', () => {
		setUsrname(null);
	});

	return (
		<>
			<div className="mainDisplay">
				<MainMenu seletecTabChanged={(tab) => setSelectedTab(tab)} />
				{selectedTab === TabsEnum.Companies && <CompaniesGrid />}
				{selectedTab === TabsEnum.Products && <Allproducts />}
			</div>
			<div className="mainDisplayBottom">{username && <div className="mdbLoggedUser">Logged in as: {username}</div>}</div>
		</>
	);
};

export default mainDisplay;
