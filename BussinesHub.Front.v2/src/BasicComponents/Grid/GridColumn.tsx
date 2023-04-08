import React, { ReactElement } from "react";

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
  const css = `
    .fbc-th {
        width: ${width}px;
    }
`;

  return (
    <>
      <style>{css}</style>
      {cellRender && cellRender}
      {!cellRender && (
        <th className="fbc-th">
          {text}
          {OnSort && (
            <button
              className="orderBtn"
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
