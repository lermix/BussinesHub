import React, { ChangeEvent, ReactElement, useState } from "react";
import { useStore } from "react-redux";
import "./SideMenu.css";
import { SideMenuBtnProps } from "./SideMenuBtn";

export interface SideMenuProps {
  children?:
    | ReactElement<SideMenuBtnProps>
    | Array<ReactElement<SideMenuBtnProps> | Element | null | undefined | "">;
  footer?: React.ReactNode;
}

export const SideMenu: React.FC<SideMenuProps> = ({ children, footer }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const cssCollapsed = `

  .sideMenuFooter {
    border: none;
    visibility:hidden;
  }
  
    .sideMenu {
      width: 40px;   
    }

    .innertriangle{
      border: 0px;
    }

    .sideMenuBtn
    {
      border: 0px;
    }

    .sideMenuHeader
    {
      position: absolute;
      left: -50vW;
    }
    
    .sideMenuExpandBtn{
      width: 30px;
      height: 30px;
    }

    .sideMenuColapseBtn {
      position: absolute;
      left: -50vW;
      
    }
    
 
`;

  const cssGeneral = `
.sideMenuBtnContainer {
  height: ${Array.isArray(children) ? 55 * children.length : 70}px;
}
`;

  return (
    <>
      {collapsed && <style>{cssCollapsed}</style>}
      <style>{cssGeneral}</style>
      <div className="sideMenu" id="sideMenuId">
        <div className="sideMenuHeader" id="sideMenuHeaderId">
          <p>BUSSINESS HUB</p>
          <button
            className="sideMenuColapseBtn"
            onClick={(e) => {
              setCollapsed(true);
            }}
          ></button>
        </div>

        <button
          className="sideMenuExpandBtn"
          onClick={(e) => {
            setCollapsed(false);
          }}
        ></button>
        <div className="sideMenuBtnContainer">
          {children && !Array.isArray(children) && children}
          {children &&
            Array.isArray(children) &&
            children.map(
              (x, i) =>
                React.isValidElement(x) && (
                  <div key={"sideMenuBtn" + i}>{x}</div>
                )
            )}
        </div>

        <div className="sideMenuFooter">{footer}</div>
      </div>
    </>
  );
};
