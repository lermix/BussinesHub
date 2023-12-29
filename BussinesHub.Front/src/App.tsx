import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import Login from './Components/Users/Login';
import MainDisplay from './Components/MainDisplay';
import CreateCompany from './Components/Companies/CreateCompany';
import CreateAccount from './Components/Users/CreateAccount';
import UserAccount from './Components/Users/UserAccount/UserAccount';

const App: React.FC = () => {
	return (
		<>
			{/* <div className="cardWrapper">
        <div className="cardBussines"></div>

        <div className="cardPrivate"></div>
      </div> */}

			<div className="generalErrorHidden">
				<p id="ErrorParagraph"></p>
			</div>

			<Routes>
				<Route index path="/" element={<MainDisplay />} />
				<Route path="CreateCompany" element={<CreateCompany />} />
				<Route path="CreateAccount" element={<CreateAccount />} />
				<Route path="Login" element={<Login />} />
				<Route path="UserAccount" element={<UserAccount />} />
			</Routes>

			{/* <TabMenu orientation="vertical">
        <TabItem title="Home"></TabItem>
        {verifiedUser?.token && selectedCompany && (
          <TabItem title="Store managament">
            <StoreManagament></StoreManagament>
          </TabItem>
        )}
        {verifiedUser?.token && (
          <TabItem title="Company managament">
            <CompanyManagament></CompanyManagament>
          </TabItem>
        )}
        <TabItem title="Register">
          <Register />
        </TabItem>
        <TabItem title="Login">
          <Login />
        </TabItem>
        <button title="LogOut" onClick={() => dispatch(logOut())} />
      </TabMenu> */}
		</>
	);
};

export default App;
