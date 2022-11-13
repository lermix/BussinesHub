import React, { Children, ReactElement, useState } from "react";
import { Spliter } from "../Spliter/Spliter";
import { TabItemProps } from "./TabItem";
import "./TabMenu.css";

interface IMenu {
  orientation: "vertical" | "horizontal";
  background?: string;
  children?: ReactElement<TabItemProps> | Array<ReactElement<TabItemProps>>;
}

const TabMenu: React.FC<IMenu> = ({ children, orientation, background }) => {
  const [selectedTab, setSelectedTab] = useState<number>(2);
  const _background = background ? background : "white";
  return (
    <>
      {orientation == "horizontal" && (
        <>
          {" "}
          <div className="tab" style={{ background: _background }}>
            {children && !Array.isArray(children) && (
              <button
                key={"tmb"}
                className="tablinks"
                onClick={() => setSelectedTab(0)}
              >
                {children.props.title}
              </button>
            )}
            {children &&
              Array.isArray(children) &&
              children.map((x, i) => (
                <>
                  <button
                    key={"tmb" + i}
                    className="tablinks"
                    onClick={() => setSelectedTab(i)}
                  >
                    {x.props.title}
                  </button>
                </>
              ))}
          </div>
          {children && !Array.isArray(children) && (
            <div>{children && children}</div>
          )}
          {children && Array.isArray(children) && (
            <div>{children && children[selectedTab]}</div>
          )}
        </>
      )}
      {orientation == "vertical" && (
        <>
          <Spliter left={20} right={80}>
            <div
              className="tabVertical"
              style={{
                width: "100%",
                height: "98%",
                background: "#FFFAFA",
                opacity: 0.9,
                borderRadius: 10,
                paddingTop: 5,
              }}
            >
              {children && !Array.isArray(children) && (
                <button key={"tmb"} onClick={() => setSelectedTab(0)}>
                  {children.props.title}
                </button>
              )}
              {children && Array.isArray(children) && (
                <ul
                  style={{
                    listStyle: "none",
                    width: "100%",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {children.map((x, i) => (
                    <li style={{ width: "100%" }}>
                      {i === selectedTab && (
                        <button
                          key={"tmb" + i}
                          style={{
                            width: "100%",
                            backgroundColor: "#ccc",
                            opacity: 0.8,
                          }}
                          onClick={() => setSelectedTab(i)}
                        >
                          {x.props.title}
                        </button>
                      )}
                      {i !== selectedTab && (
                        <button
                          key={"tmb" + i}
                          style={{ width: "100%", opacity: 0.8 }}
                          onClick={() => setSelectedTab(i)}
                        >
                          {x.props.title}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div
              style={{
                width: "98%",
                height: "98%",
                marginLeft: 15,
                padding: 0,
                borderRadius: 10,
                display: "block",
                backgroundColor: "#FFFAFA",
                opacity: 0.9,
              }}
            >
              {children && !Array.isArray(children) && (
                <div>{children && children}</div>
              )}
              {children && Array.isArray(children) && (
                <div>{children && children[selectedTab]}</div>
              )}
            </div>
          </Spliter>
        </>
      )}
    </>
  );
};

export default TabMenu;
