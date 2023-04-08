import React from "react";
import "./Spliter.css";

export interface SpliterProps {
  children?: React.ReactNode[];
  left: number;
  right: number;
}

export const Spliter: React.FC<SpliterProps> = ({ children, left, right }) => {
  const css = `
    .fbc-left {
      width: ${left - 1}%;
    }

    .fbc-right {
        width: ${right}%;
    }
`;

  return (
    <>
      <style>{css}</style>
      <div className="fbc-split fbc-left">
        {children && children[0] && children[0]}
      </div>

      <div className="fbc-split fbc-right">
        {children && children[1] && children[1]}
      </div>
    </>
  );
};
