import React, { useState } from "react";
import { Input } from "../basicComponents/Input/Input";
import { LoginDto, User, UserClass } from "../models/User";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/user/actions";

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();

  const [user, setUser] = useState<LoginDto>({ username: "", password: "" });

  return (
    <>
      <div style={{ margin: "0 auto", width: 300 }}>
        <Input
          type="text"
          height={30}
          width={250}
          text={"username"}
          onChange={(value: string) => setUser({ ...user, username: value })}
        />
        <Input
          type="text"
          height={30}
          width={250}
          text={"password"}
          onChange={(value: string) => setUser({ ...user, password: value })}
        />
        <br />
        <br />
        <button
          className="fbc-btn"
          style={{ width: 257 }}
          onClick={() => dispatch(login(user))}
        >
          Login
        </button>
      </div>
    </>
  );
};

export default Login;
