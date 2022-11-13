import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import TabMenu from "./BasicComponents/TabMenu/TabMenu";
import { TabItem } from "./BasicComponents/TabMenu/TabItem";
import StoreManagament from "./Components/StoreManagament";

function App() {
  return (
    <>
      <TabMenu orientation="vertical">
        <TabItem title="Home"></TabItem>
        <TabItem title="Register"></TabItem>
        <TabItem title="Store managament">
          <StoreManagament />
        </TabItem>
      </TabMenu>
    </>
  );
}

export default App;
