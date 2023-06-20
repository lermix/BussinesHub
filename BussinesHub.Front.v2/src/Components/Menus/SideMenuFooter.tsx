import React, { useState } from "react";
import "../../Styles/SideMenuFooter.css";
import { Link } from "react-router-dom";
export const SideMenuFooter: React.FC = () => {
  return (
    <>
      <div className="sideMenuFooterDiv">
        <h3>Nemožete se naći na popisu?</h3>
        <Link to="/CreateCompany" className="createCompanyLink">
          Učlani se
        </Link>
        <h4>Besplatno</h4>
      </div>
    </>
  );
};

export default SideMenuFooter;
