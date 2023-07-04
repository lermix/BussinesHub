import React, { ChangeEvent } from "react";
import "./Input.css";

export interface InputProps {
  text?: string;
  width?: number | string;
  height?: number | string;
  onChange?(value: string | number): void;
  type: "text" | "number";
  autoComplete?: "off";
  style?: React.CSSProperties;
  value?: string | number;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  text,
  width,
  height,
  onChange,
  type,
  autoComplete,
  style,
  value,
  className,
}) => {
  return (
    <div style={style} className={className}>
      <span className="spanInput">{text && text}</span>
      <input
        type={type}
        defaultValue={value}
        autoComplete={autoComplete}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const target = event.target as HTMLInputElement;
          if (type === "number") onChange && onChange(Number(target.value));
          else onChange && onChange(target.value);
        }}
        style={{ width: width ? width : 400, height: height ? height : 34 }}
      ></input>
    </div>
  );
};
