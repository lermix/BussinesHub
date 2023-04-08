import React, {
  ReactElement,
  useState,
  MouseEvent,
  MouseEventHandler,
  useEffect,
} from "react";
import "./Window.css";
export interface WindowProps {}

export const Window: React.FC<WindowProps> = ({}) => {
  const [movingEnabled, setMovingEnabled] = useState<boolean>(false);

  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);

  useEffect(() => {
    addEventListener("mousemove", (event) => {
      if (movingEnabled) {
        setX(event.x);
        setY(event.y);
      }
    });
  }, []);

  return (
    <>
      <div className="fbc-window">
        <div
          className="fbc-window-header"
          onMouseDown={() => setMovingEnabled(true)}
          onMouseUp={() => setMovingEnabled(false)}
        ></div>
        <p>Ja sam u prozoru</p>
      </div>
    </>
  );
};
