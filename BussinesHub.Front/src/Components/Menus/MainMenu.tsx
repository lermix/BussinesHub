import React, { useState } from 'react'
import '../../Styles/MainMenu.css'
import { SetClassNameToClasses } from '../../Helper/jsHelper'
import { useNavigate } from 'react-router-dom'

export const MainMenu: React.FC = () => {
	const navigate = useNavigate()

	const [expanded, setExpanded] = useState(true)

	const handleExpasion = () => {
		if (expanded) {
			SetClassNameToClasses('mainMenuContainer', 'mainMenuContainerCollapsed')
			SetClassNameToClasses('mainMenuHeader', 'mainMenuHeaderCollapsed')
			SetClassNameToClasses('mainMenuTopBtnCollapse', 'mainMenuTopBtnTransition')
			SetClassNameToClasses('mainMenuTop mainMenuTopExpaneded', 'mainMenuTop mainMenuTopCollapsed')
			SetClassNameToClasses('mainMenuBtn', 'mainMenuBtnCollapsed')
			SetClassNameToClasses('cardContainer', 'cardContainerMenuCollapsed')
			SetClassNameToClasses('mainMenuActionButton', 'mainMenuActionButtonCollapsed')
			SetClassNameToClasses('mainMenuBottom', 'mainMenuBottomCollapsed')
			setTimeout(() => {
				SetClassNameToClasses('mainMenuTopBtnTransition', 'mainMenuTopBtnExpand')
			}, 300)
		} else {
			SetClassNameToClasses('mainMenuContainerCollapsed', 'mainMenuContainer')
			SetClassNameToClasses('mainMenuHeaderCollapsed', 'mainMenuHeader')
			SetClassNameToClasses('mainMenuTopBtnExpand', 'mainMenuTopBtnTransition')
			SetClassNameToClasses('mainMenuTop mainMenuTopCollapsed', 'mainMenuTop mainMenuTopExpaneded')
			SetClassNameToClasses('mainMenuBtnCollapsed', 'mainMenuBtn')
			SetClassNameToClasses('cardContainerMenuCollapsed', 'cardContainer')
			SetClassNameToClasses('mainMenuActionButtonCollapsed', 'mainMenuActionButton')
			SetClassNameToClasses('mainMenuBottomCollapsed', 'mainMenuBottom')
			setTimeout(() => {
				SetClassNameToClasses('mainMenuTopBtnTransition', 'mainMenuTopBtnCollapse')
			}, 300)
		}
		setExpanded(!expanded)
	}

	return (
		<>
			<div className="mainMenuContainer">
				<div className="mainMenuTop mainMenuTopExpaneded">
					<p className="mainMenuHeader">Bussines Hub</p>
					<button className="mainMenuTopBtnCollapse" onClick={handleExpasion}></button>
				</div>
				<div className="mainMenuBtnContainer">
					<div className="mainMenuBtn">
						<p>Companies</p>
					</div>
					<div className="mainMenuBtn">
						<p>Services</p>
					</div>
				</div>
				<div className="mainMenuBottom">
					<button className="mainMenuActionButton">Register</button>
					<button className="mainMenuActionButton" onClick={() => navigate('Login')}>
						Login
					</button>
				</div>
			</div>
		</>
	)
}
