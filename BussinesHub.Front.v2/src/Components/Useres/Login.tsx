import React, { useState } from "react";
import { Input } from "../../basicComponents/Input/Input";
import { LoginDto, User, UserClass } from "../../models/User";
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/user/actions";
import "../../Styles/Login.css";
import { Link } from "react-router-dom";

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();

  const [user, setUser] = useState<LoginDto>({ username: "", password: "" });

  return (
    <>
      <div className="LoginContainer">
        <Input
          className="loginInput"
          type="text"
          width={"15vw"}
          height={30}
          text={"korisničko ime"}
          onChange={(value: string) => setUser({ ...user, password: value })}
        />
        <Input
          className="loginInput"
          type="text"
          height={30}
          width={"15vw"}
          text={"lozinka"}
          onChange={(value: string) => setUser({ ...user, password: value })}
        />
        <br />
        <br />
        <button className="loginBtn" onClick={() => dispatch(login(user))}>
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
