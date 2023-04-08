import React, { ReactElement } from "react";
import { CardProps } from "./Card";
import "./Card.css";

export interface CardContainerProps {
  children?:
    | ReactElement<CardProps>
    | Array<ReactElement<CardProps> | Element | null | undefined | "">;
}

export const CardContainer: React.FC<CardContainerProps> = ({ children }) => {
  return (
    <div className="cards">
      <>
        {children && !Array.isArray(children) && children}
        {children &&
          Array.isArray(children) &&
          children.map(
            (x, i) =>
              React.isValidElement(x) && (
                <div key={"CardContainerItem" + i}>{x}</div>
              )
          )}
      </>
    </div>
  );
};
