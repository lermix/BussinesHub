import React, { ChangeEvent } from 'react'
import './SideMenu.css'

export interface SideMenuBtnProps {
	text: string
}

export const SideMenuBtn: React.FC<SideMenuBtnProps> = ({ text }) => {
	return (
		<div className="sideMenuBtn">
			<div className="innertriangle"></div>
			<p>{text}</p>
		</div>
	)
}
