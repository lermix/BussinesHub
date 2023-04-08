import React, { useState } from "react";
import "../../Styles/CompanyInfo.css";
import CompanyInfo from "../../models/CompanyInfo";

interface CompanyInfoProps {
  companyInfo: CompanyInfo;
}

export const CompanyInfoDisplay: React.FC<CompanyInfoProps> = ({
  companyInfo,
}) => {
  return (
    <>
      <h2 className="companyInfoTitle">{companyInfo.name}</h2>
      <hr />
      <table className="companyInfoData">
        <tr>
          <td className="companyInfoTableTdLeft">Adress:</td>
          <td className="companyInfoTableTdRight">{companyInfo.adress}</td>
        </tr>
        <tr>
          <td className="companyInfoTableTdLeft">Grad:</td>
          <td className="companyInfoTableTdRight">{companyInfo.city}</td>
        </tr>
        <tr>
          <td className="companyInfoTableTdLeft">telefon:</td>
          <td className="companyInfoTableTdRight">{companyInfo.phoneNumber}</td>
        </tr>
      </table>
      <hr style={{ opacity: 0.3 }} />
      <h3>Djelatnost:</h3>
      <ul className="companyInfoList">
        {companyInfo.trades.map((x) => (
          <li>{x}</li>
        ))}
      </ul>
      <hr style={{ opacity: 0.3 }} />
      <button className="companyInfoBtn">Pregledaj</button>
    </>
  );
};

export default CompanyInfoDisplay;
