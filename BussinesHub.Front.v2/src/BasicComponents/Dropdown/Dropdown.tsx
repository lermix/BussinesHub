import React, { ChangeEvent, ReactNode, useEffect, useState } from "react";
import "./Dropdown.css";
interface IProps<T> {
  title?: string;
  background?: string;
  itemBackground?: string;
  items: T[];
  displayProp: string;
  onSelect: (e: T) => void;
}

const Dropdown = <T extends Record<string, any>>(
  props: IProps<T> & { children?: ReactNode }
) => {
  const [selected, setSelected] = useState<string>("Select option");
  const [filterdData, setFilteredData] = useState<T[]>(props.items);
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    setFilteredData(props.items);
  }, [props.items]);

  const searchChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setFilteredData(
      props.items.filter((x) =>
        (x[props.displayProp] as string).includes(target.value)
      )
    );
  };

  return (
    <div style={{ width: 300 }} className="container">
      <input className="inputDropdown" onChange={searchChanged}></input>
      <label htmlFor="touch">
        <span
          className="spanDropdown"
          style={{
            background: props.background ? props.background : "#2d2f31",
          }}
        >
          {selected}
        </span>
      </label>
      <input
        type="checkbox"
        id="touch"
        onChange={(e) => setExpanded(!expanded)}
        style={{}}
      />

      {expanded && (
        <ul
          style={{
            background: props.itemBackground ? props.itemBackground : "gray",
          }}
          className="slide"
        >
          {filterdData?.map((e, i) => (
            <li
              key={"li" + i}
              onClick={() => {
                setSelected(e[props.displayProp]);
                props.onSelect(e);
              }}
            >
              <p>{e[props.displayProp]}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
