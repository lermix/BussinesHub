import React, { ReactElement, ReactNode } from "react";
import { GridColumnProps } from "./GridColumn";
import "./Grid.css";
export interface GridProps<T> {
  data: T[];
  children?:
    | ReactElement<GridColumnProps>
    | Array<ReactElement<GridColumnProps>>;
  onRowClick?: (item: T) => void;
  style?: React.CSSProperties;
}

const Grid = <T extends Record<string, any>>(
  props: GridProps<T> & { children?: ReactNode }
) => {
  return (
    <>
      <table className="column-bordered-table" style={props.style}>
        <thead>
          <tr>
            {props.children &&
              Array.isArray(props.children) &&
              props.children.map((x, i) => x)}
          </tr>
        </thead>
        <tbody>
          <>
            {props.data.map((e, i) => (
              <tr
                key={"gridTr" + i}
                onClick={() => props.onRowClick && props.onRowClick(e)}
              >
                {props.children &&
                  Array.isArray(props.children) &&
                  props.children.map((x, i) => (
                    <td
                      key={"gridTd" + i}
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {x.props.property &&
                        Object.entries(e).find(
                          ([key]) => key == x.props.property
                        )?.[1]}
                      {x.props.cellRender && x.props.cellRender}
                    </td>
                  ))}
              </tr>
            ))}
          </>
        </tbody>
      </table>
    </>
  );
};

export default Grid;
