import { useEffect } from "react";
import "./App.css";
import TabMenu from "./basicComponents/TabMenu/TabMenu";
import { TabItem } from "./basicComponents/TabMenu/TabItem";
import StoreManagament from "./components/storeManagament/StoreManagament";
import Register from "./components/Register";
import Login from "./components/Login";
import { VerifiedUser } from "./models/User";
import { useSelector } from "react-redux";
import { AppState } from "./store/rootReducer";
import { useAppDispatch } from "./store/hooks";
import { logOut, setTokenIfExists } from "./store/user/actions";
import CompanyManagament from "./components/companyManagament/CompanyManagament";

interface IStateProps {
  verifiedUser: VerifiedUser | null;
}

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { verifiedUser } = useSelector<AppState, IStateProps>(
    (state: AppState): IStateProps => {
      return {
        verifiedUser: state.user.verifiedUser,
      };
    }
  );

  useEffect(() => {
    dispatch(setTokenIfExists());
  }, []);

  return (
    <>
      <TabMenu orientation="vertical">
        <TabItem title="Home"></TabItem>
        {verifiedUser?.token && (
          <TabItem title="Store managament">
            <StoreManagament></StoreManagament>
          </TabItem>
        )}
        {verifiedUser?.token && (
          <TabItem title="Company managament">
            <CompanyManagament></CompanyManagament>
          </TabItem>
        )}
        <TabItem title="test"></TabItem>
        <TabItem title="Register">
          <Register />
        </TabItem>
        <TabItem title="Login">
          <Login />
        </TabItem>
        <button title="LogOut" onClick={() => dispatch(logOut())} />
      </TabMenu>
    </>
  );
};

export default App;
