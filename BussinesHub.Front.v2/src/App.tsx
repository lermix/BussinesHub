import { useState } from "react";
import "./App.css";
import TabMenu from "./basicComponents/TabMenu/TabMenu";
import { TabItem } from "./basicComponents/TabMenu/TabItem";
import StoreManagament from "./components/StoreManagament";
import Register from "./components/Register";
import Login from "./components/Login";

const App: React.FC = () => {
  return (
    <>
      <TabMenu orientation="vertical">
        <TabItem title="Home"></TabItem>

        <TabItem title="Store managament">
          <StoreManagament></StoreManagament>
        </TabItem>
        <TabItem title="Register">
          <Register />
        </TabItem>
        <TabItem title="Login">
          <Login />
        </TabItem>
      </TabMenu>
    </>
  );
};

export default App;
