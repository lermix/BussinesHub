import React, { ChangeEvent } from "react";
import "./Card.css";

export const TopMenu: React.FC = () => {
  return (
    <div className="TopMenu">
      <div className="BtnDivTopMenu">
        <button className="btnTopMenu">Comapnies</button>
        <hr className="hrTopMenu"></hr>
      </div>
      <div className="BtnDivTopMenu">
        <button className="btnTopMenu">Private</button>
        <hr className="hrTopMenu"></hr>
      </div>
      <div className="BtnDivTopMenu">
        <button className="btnTopMenu">Manage</button>
        <hr className="hrTopMenu"></hr>
      </div>
    </div>
  );
};
