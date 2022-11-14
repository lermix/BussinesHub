import React, { ChangeEvent, ReactElement } from "react";

export interface GridColumnProps {
  text?: string;
  width?: number;
  property?: string;
  cellRender?: ReactElement;
  OnSort?: () => void;
}

export const GridColumn: React.FC<GridColumnProps> = ({
  text,
  width,
  property,
  cellRender,
  OnSort,
}) => {
  return (
    <>
      {cellRender && cellRender}
      {!cellRender && (
        <th
          style={{
            width: width,
            textAlign: "center",
            border: "1px solid #ccc ",
            borderRadius: 2,
          }}
        >
          {text}
          {OnSort && (
            <button
              onClick={() => OnSort()}
              style={{ border: "none", height: 30, fontSize: 17 }}
            >
              &#8693;
            </button>
          )}
        </th>
      )}
    </>
  );
};
