import React from 'react'
import '../Styles/MainDisplay.css'
import '../Styles/CompaniesGrid.css'
import '../Styles/Scrollbar.css'
import { MainMenu } from './Menus/MainMenu'
import CompaniesGrid from './Companies/CompaniesGrid'

export const mainDisplay: React.FC = () => {
	return (
		<>
			<div className="mainDisplay">
				<MainMenu />
				<CompaniesGrid />
			</div>
			<div className="mainDisplayBottom"></div>
		</>
	)
}

export default mainDisplay
