import React, { useEffect, useState } from 'react'
import { User, UserClass, VerifiedUser } from '../../Models/User'
import '../../Styles/CreateAccount.css'
import { useNavigate } from 'react-router-dom'
import { requests } from '../../Api/agent'
import { useAppDispatch } from '../../Store/hooks'
import { Input } from '../../BasicComponents/Input/Input'
import { SetClassNameToClasses } from '../../Helper/jsHelper'

export const CreateAccount: React.FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const [user, setUser] = useState<User>(new UserClass())

	const [passwordUnmatched, setPasswordUnmatched] = useState<boolean>(true)
	const [emptyFileds, setEmptyFileds] = useState<boolean>(true)
	const [errorMsg, setErrorMsg] = useState<string>('')

	const apiActions = {
		createUser: (user: User): Promise<VerifiedUser> => requests.post(`User/CreateUser`, user),
	}

	const btnEnabledStyle = `.createBtn:hover {
  background-color: #88dbbc;
  color: black;
  border: 1px solid #88dbbc;
}

  `

	useEffect(() => {
		if (user.username === '' || user.email === '' || user.surname === '' || user.name === '' || user.password === '') setEmptyFileds(true)
		else setEmptyFileds(false)
	}, [user])

	return (
		<div className="CreateAccountWrapper">
			{!passwordUnmatched && !emptyFileds && <style>{btnEnabledStyle}</style>}
			<div className="CreateAccountContainer">
				<Input
					className="createAccInput"
					type="text"
					width={'15vw'}
					height={30}
					text={'korisničko ime'}
					onChange={(value: string) => setUser({ ...user, username: value })}
				/>
				<Input
					className="createAccInput"
					type="text"
					width={'15vw'}
					height={30}
					text={'ime'}
					onChange={(value: string) => {
						const splitted = value.split(' ')
						if (splitted.length > 1) {
							setUser({ ...user, name: splitted[0] })
							setUser({ ...user, middleName: splitted.splice(1).join(' ') })
						} else setUser({ ...user, name: value })
					}}
				/>
				<Input
					className="createAccInput"
					type="text"
					width={'15vw'}
					height={30}
					text={'prezime'}
					onChange={(value: string) => {
						const splitted = value.split(' ')
						if (splitted.length > 1) {
							setUser({ ...user, surname: splitted[0] })
							setUser({ ...user, middleName: splitted.splice(1).join(' ') })
						} else setUser({ ...user, surname: value })
					}}
				/>
				<Input
					className="createAccInput"
					type="text"
					width={'15vw'}
					height={30}
					text={'e-mail'}
					onChange={(value: string) => setUser({ ...user, email: value })}
				/>
				<Input
					className="createAccInput"
					type="text"
					width={'15vw'}
					height={30}
					text={'telefon*'}
					onChange={(value: string) => setUser({ ...user, mobileNumber: value })}
				/>
				<Input
					className="createAccInput"
					type="text"
					height={30}
					width={'15vw'}
					text={'lozinka'}
					onChange={(value: string) => setUser({ ...user, password: value })}
				/>
				<Input
					className="createAccInput"
					type="text"
					height={30}
					width={'15vw'}
					text={'ponovite lozinku'}
					onChange={(value: string) => {
						if (value === user.password) {
							if (errorMsg === 'Lozinke se ne poklapaju') setErrorMsg('')
							setPasswordUnmatched(false)
						} else {
							setPasswordUnmatched(true)
							setErrorMsg('Lozinke se ne poklapaju')
						}
					}}
				/>
				<br />
				<br />
				<button
					className="createBtn"
					// disabled={passwordUnmatched || emptyFileds}
					//style={passwordUnmatched || emptyFileds ? { opacity: 0.2 } : { opacity: 1 }}
					//  }onClick={() =>
					// 	apiActions.createUser(user).then((res) => {
					// 		// dispatch(SaveVerifiedUser(res))
					// 		navigate('/Createcompany')
					// 	})
					//
					onClick={() => {
						SetClassNameToClasses('CreateAccountContainer', 'CreateAccountContainerCollapsed')
						setTimeout(() => {
							SetClassNameToClasses('displayNone', 'ContinueContainerCollapsed')
						}, 800)
						setTimeout(() => {
							SetClassNameToClasses('ContinueContainerCollapsed', 'ContinueContainer')
							setTimeout(() => {
								SetClassNameToClasses('continueBtnCollapsed', 'continueBtn')
							}, 500)
						}, 1000)
						setTimeout(() => {
							SetClassNameToClasses('CreateAccountContainerCollapsed', 'displayNone')
						}, 1000)
					}}
				>
					Napravi račun
				</button>
				<p>{errorMsg}</p>
			</div>

			<div className="displayNone">
				<button className="continueBtnCollapsed" onClick={() => navigate('/')}>
					Contine to shop
				</button>
				<button className="continueBtnCollapsed">Add your company</button>
			</div>
		</div>
	)
}

export default CreateAccount
