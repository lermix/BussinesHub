import React, { ReactElement } from "react";
import { CardProps } from "./Card";
import "./Card.css";

export interface CardContainerProps {
  children?:
    | ReactElement<CardProps>
    | Array<ReactElement<CardProps> | Element | null | undefined | "">;
  header?: React.ReactNode;
}

export const CardContainer: React.FC<CardContainerProps> = ({
  children,
  header,
}) => {
  return (
    <div className="cards">
      <>
        {header}
        {children && !Array.isArray(children) && children}
        {children &&
          Array.isArray(children) &&
          children.map(
            (x, i) =>
              React.isValidElement(x) && (
                <React.Fragment key={"CardContainerItem" + i}>
                  {x}
                </React.Fragment>
              )
          )}
      </>
    </div>
  );
};
