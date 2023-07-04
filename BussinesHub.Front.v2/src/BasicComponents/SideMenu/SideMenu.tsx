import React, { ChangeEvent, ReactElement, useState } from 'react'
import { useStore } from 'react-redux'
import './SideMenu.css'
import { SideMenuBtnProps } from './SideMenuBtn'
import { AppendToClassNameById } from '../../Helper/jsHelper'

export interface SideMenuProps {
	children?: ReactElement<SideMenuBtnProps> | Array<ReactElement<SideMenuBtnProps> | Element | null | undefined | ''>
	footer?: React.ReactNode
}

export const SideMenu: React.FC<SideMenuProps> = ({ children, footer }) => {
	const cssGeneral = `
  .sideMenuBtnContainer {
    height: ${Array.isArray(children) ? 55 * children.length : 70}px;
  }`

	return (
		<>
			<style>{cssGeneral}</style>
			<div className="sideMenu" id="sideMenuId">
				<div className="sideMenuHeader" id="sideMenuHeaderId">
					<p>BUSSINESS HUB</p>
					<button
						className="sideMenuColapseBtn"
						onClick={(e) => {
							AppendToClassNameById('sideMenuHeaderId', 'sideMenuHeaderCollapsed')
						}}
					></button>
				</div>

				<button className="sideMenuExpandBtn" onClick={(e) => {}}></button>
				<div className="sideMenuBtnContainer">
					{children && !Array.isArray(children) && children}
					{children && Array.isArray(children) && children.map((x, i) => React.isValidElement(x) && <div key={'sideMenuBtn' + i}>{x}</div>)}
				</div>

				<div className="sideMenuFooter">{footer}</div>
			</div>
		</>
	)
}
