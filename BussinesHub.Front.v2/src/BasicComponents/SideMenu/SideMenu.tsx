import React, { ChangeEvent, ReactElement, useState } from "react";
import { useStore } from "react-redux";
import "./SideMenu.css";
import { SideMenuBtnProps } from "./SideMenuBtn";

export interface SideMenuProps {
  children?:
    | ReactElement<SideMenuBtnProps>
    | Array<ReactElement<SideMenuBtnProps> | Element | null | undefined | "">;
}

export const SideMenu: React.FC<SideMenuProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const cssCollapsed = `
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

  return (
    <>
      {collapsed && <style>{cssCollapsed}</style>}
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
        <>
          {children && !Array.isArray(children) && children}
          {children &&
            Array.isArray(children) &&
            children.map(
              (x, i) =>
                React.isValidElement(x) && (
                  <div key={"sideMenuBtn" + i}>{x}</div>
                )
            )}
        </>
      </div>
    </>
  );
};
