import React, { ChangeEvent, ReactElement } from "react";

export interface GridColumnProps {
  text?: string;
  width?: number;
  property?: string;
  cellRender?: ReactElement;
}

export const GridColumn: React.FC<GridColumnProps> = ({
  text,
  width,
  property,
  cellRender,
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
        </th>
      )}
    </>
  );
};
