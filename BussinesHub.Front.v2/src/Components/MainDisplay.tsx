import React, { ChangeEvent, ReactElement, useState } from 'react'
import { useSelector, useStore } from 'react-redux'
import { SideMenu } from '../basicComponents/SideMenu/SideMenu'
import SideMenuFooter from './Menus/SideMenuFooter'
import { SideMenuBtn } from '../basicComponents/SideMenu/SideMenuBtn'
import { CardContainer } from '../basicComponents/Card/CardContainer'
import { Card } from '../basicComponents/Card/Card'
import '../Styles/MainDisplay.css'
import { VerifiedUser } from '../models/User'
import { AppState } from '../store/rootReducer'
import { useNavigate } from 'react-router-dom'

interface IStateProps {
	verifiedUser: VerifiedUser | null
}

export const mainDisplay: React.FC = () => {
	const navigate = useNavigate()
	const { verifiedUser } = useSelector<AppState, IStateProps>((state: AppState): IStateProps => {
		return {
			verifiedUser: state.user.verifiedUser,
		}
	})

	const cardsHeaderUser = (
		<div className="logedInUser">
			<p>{verifiedUser?.username}</p>
		</div>
	)

	const cardsHeaderLogin = (
		<div className="mainDisplayLogin" onClick={() => navigate('Login')}>
			<p>Prijava</p>
		</div>
	)

	return (
		<>
			<div className="mainDisplay">
				<div className="sideMenuContainer"></div>
				{/* <SideMenu footer={<SideMenuFooter />}>
          <SideMenuBtn text="Most popular" />
          <SideMenuBtn text="Service" />
          <SideMenuBtn text="Companies" />
          <SideMenuBtn text="Bucket list" />
          <SideMenuBtn text="Sell" />
        </SideMenu>
        <CardContainer
          header={verifiedUser ? cardsHeaderUser : cardsHeaderLogin}
        >
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </CardContainer> */}
				<div className="mainDisplayBottom"></div>
			</div>
		</>
	)
}

export default mainDisplay
