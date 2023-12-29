import React, { useEffect, useState } from 'react';
import '../Styles/MainDisplay.css';
import '../Styles/CompaniesGrid.css';
import '../Styles/Scrollbar.css';
import { MainMenu } from './Menus/MainMenu';
import CompaniesGrid from './Companies/CompaniesGrid';
import { GetUserFromLocal } from '../Store/LocalStorage';

export const mainDisplay: React.FC = () => {
	const [username, setUsrname] = useState<string | null>(GetUserFromLocal()?.username ?? null);

	window.addEventListener('storage', () => {
		setUsrname(null);
	});

	return (
		<>
			<div className="mainDisplay">
				<MainMenu />
				<CompaniesGrid />
			</div>
			<div className="mainDisplayBottom">{username && <div className="mdbLoggedUser">Logged in as: {username}</div>}</div>
		</>
	);
};

export default mainDisplay;
