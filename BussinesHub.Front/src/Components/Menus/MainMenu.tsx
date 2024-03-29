import React, { useMemo, useState } from 'react';
import '../../Styles/MainMenu.css';
import { SetClassNameToClasses } from '../../Helper/jsHelper';
import { useNavigate } from 'react-router-dom';
import { GetUserFromLocal, IsUserInLocal, RemoveUserFromLocal } from '../../Store/LocalStorage';
import { deleteVerifiedUserAsCookie } from '../../Helper/CookieHelper';
import { User } from '../../Models/User';

export const enum TabsEnum {
	Companies,
	Products,
	Services,
}

interface IProps {
	seletecTabChanged: (tab: TabsEnum) => void;
}

export const MainMenu: React.FC<IProps> = ({ seletecTabChanged }) => {
	const navigate = useNavigate();

	const [expanded, setExpanded] = useState(true);
	const [user, setUser] = useState<User | null>(GetUserFromLocal());

	window.addEventListener('storage', () => {
		console.log(GetUserFromLocal());
		setUser(GetUserFromLocal());
	});

	const classnames = useMemo(() => {
		return {
			mainMenu: expanded ? 'mainMenuContainer' : 'mainMenuContainerCollapsed',
		};
	}, [expanded]);

	const handleExpansion = () => {
		if (expanded) {
			// SetClassNameToClasses('mainMenuContainer', 'mainMenuContainerCollapsed')
			SetClassNameToClasses('mainMenuHeader', 'mainMenuHeaderCollapsed');
			SetClassNameToClasses('mainMenuTopBtnCollapse', 'mainMenuTopBtnTransition');
			SetClassNameToClasses('mainMenuTop mainMenuTopExpaneded', 'mainMenuTop mainMenuTopCollapsed');
			SetClassNameToClasses('mainMenuBtn', 'mainMenuBtnCollapsed');
			SetClassNameToClasses('cardContainer', 'cardContainerMenuCollapsed');
			SetClassNameToClasses('mainMenuActionButton', 'mainMenuActionButtonCollapsed');
			SetClassNameToClasses('mainMenuBottom', 'mainMenuBottomCollapsed');
			setTimeout(() => {
				SetClassNameToClasses('mainMenuTopBtnTransition', 'mainMenuTopBtnExpand');
			}, 300);
		} else {
			// SetClassNameToClasses('mainMenuContainerCollapsed', 'mainMenuContainer')
			SetClassNameToClasses('mainMenuHeaderCollapsed', 'mainMenuHeader');
			SetClassNameToClasses('mainMenuTopBtnExpand', 'mainMenuTopBtnTransition');
			SetClassNameToClasses('mainMenuTop mainMenuTopCollapsed', 'mainMenuTop mainMenuTopExpaneded');
			SetClassNameToClasses('mainMenuBtnCollapsed', 'mainMenuBtn');
			SetClassNameToClasses('cardContainerMenuCollapsed', 'cardContainer');
			SetClassNameToClasses('mainMenuActionButtonCollapsed', 'mainMenuActionButton');
			SetClassNameToClasses('mainMenuBottomCollapsed', 'mainMenuBottom');
			setTimeout(() => {
				SetClassNameToClasses('mainMenuTopBtnTransition', 'mainMenuTopBtnCollapse');
			}, 300);
		}
		setExpanded(!expanded);
	};

	return (
		<>
			<div className={classnames.mainMenu}>
				<div className="mainMenuTop mainMenuTopExpaneded">
					<p className="mainMenuHeader">Poslovno središte</p>
					<button className="mainMenuTopBtnCollapse" onClick={handleExpansion}></button>
				</div>
				<div className="mainMenuBtnContainer">
					<div className="mainMenuBtn" onClick={() => seletecTabChanged(TabsEnum.Companies)}>
						<h2>🏢</h2>
						<p>Tvrtke</p>
					</div>
					<div className="mainMenuBtn" onClick={() => seletecTabChanged(TabsEnum.Products)}>
						<h2>📦</h2>
						<p>Svi proizvodi</p>
					</div>
					<div className="mainMenuBtn">
						<h2>🛠️</h2>
						<p>Usluge</p>
					</div>
				</div>
				{!user && (
					<div className="mainMenuBottom">
						<button className="mainMenuActionButton" onClick={() => navigate('CreateAccount')}>
							Registracija
						</button>
						<button className="mainMenuActionButton" onClick={() => navigate('Login')}>
							Prijava
						</button>
					</div>
				)}
				{user && (
					<div className="mainMenuBottom">
						<button className="mainMenuActionButton" onClick={() => navigate('UserAccount')}>
							Moj račun
						</button>
						<button
							className="mainMenuActionButton"
							onClick={() => {
								RemoveUserFromLocal();
								deleteVerifiedUserAsCookie();
							}}
						>
							Odjava
						</button>
					</div>
				)}
			</div>
		</>
	);
};
