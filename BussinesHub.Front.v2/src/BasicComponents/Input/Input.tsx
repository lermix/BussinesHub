import React, { ChangeEvent } from "react";
import "./Input.css";

export interface InputProps {
  text?: string;
  width?: number;
  height?: number;
  onChange?(value: string | number): void;
  type: "text" | "number";
}

export const Input: React.FC<InputProps> = ({
  text,
  width,
  height,
  onChange,
  type,
}) => {
  return (
    <>
      <label htmlFor="a">
        <span className="spanInput" style={{ color: "black" }}>
          {text && text}
        </span>
      </label>
      <input
        id="a"
        type={type}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const target = event.target as HTMLInputElement;
          if (type === "number") onChange && onChange(Number(target.value));
          else onChange && onChange(target.value);
        }}
        style={{ width: width ? width : 400, height: height ? height : 34 }}
      ></input>
    </>
  );
};
