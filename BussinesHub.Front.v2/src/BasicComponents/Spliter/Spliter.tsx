import React from "react";
import "./Spliter.css";

export interface SpliterProps {
  children?: React.ReactNode[];
  left: number;
  right: number;
}

export const Spliter: React.FC<SpliterProps> = ({ children, left, right }) => {
  return (
    <>
      <div
        className="split left"
        style={{
          width: left - 1 + "%",
          height: "98vh",
          background: "#FFFAFA",
          opacity: 0.9,
          borderRadius: 10,
          paddingTop: 5,
        }}
      >
        {children && children[0] && children[0]}
      </div>

      <div
        className="split right"
        style={{
          width: right + "%",
          height: "98vh",
          background: "#FFFAFA",
          opacity: 0.9,
          borderRadius: 10,
        }}
      >
        {children && children[1] && children[1]}
      </div>
    </>
  );
};
