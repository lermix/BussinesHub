import React, { useState } from 'react';
import { Input } from '../../BasicComponents/Input/Input';
import { LoginDto, User, UserClass, VerifiedUserClass } from '../../Models/User';
import { useAppDispatch } from '../../Store/hooks';
import '../../Styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { ApiSecurity } from '../../Api/SecurityController';
import { SaveUserToLocal } from '../../Store/LocalStorage';
import { saveVerifiedUserAsCookie } from '../../Helper/CookieHelper';
import { setGeneralError } from '../../Helper/generalError';

export const Login: React.FC = () => {
	const navigate = useNavigate();

	const [loginDto, setLoginDto] = useState<LoginDto>({ username: '', password: '' });

	return (
		<>
			<div className="LoginContainer">
				<Input
					className="loginInput"
					type="text"
					width={'15vw'}
					height={30}
					text={'korisničko ime'}
					onChange={(value: string) => setLoginDto({ ...loginDto, username: value })}
				/>
				<Input
					className="loginInput"
					type="text"
					height={30}
					width={'15vw'}
					text={'lozinka'}
					onChange={(value: string) => setLoginDto({ ...loginDto, password: value })}
				/>
				<br />
				<br />
				<button
					className="loginBtn"
					onClick={() =>
						ApiSecurity.Login(loginDto)
							.then((user) => {
								SaveUserToLocal(user);
								saveVerifiedUserAsCookie(VerifiedUserClass.FromUser(user));
								navigate('/');
							})
							.catch((e) => setGeneralError(e))
					}
				>
					Prijava
				</button>
				<p>Nemate račun?</p>
				<Link to="/CreateAccount" className="loginCreateAccBtn">
					Napravi račun
				</Link>
			</div>
		</>
	);
};

export default Login;
