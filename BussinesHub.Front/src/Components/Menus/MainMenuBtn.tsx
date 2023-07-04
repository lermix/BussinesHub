import React, { ChangeEvent } from 'react'
import './MainMenu.css'

export interface MainMenuBtnProps {
	text: string
}

export const MainMenuBtn: React.FC<MainMenuBtnProps> = ({ text }) => {
	return (
		<div className="sideMenuBtn">
			<div className="innertriangle"></div>
			<p>{text}</p>
		</div>
	)
}
