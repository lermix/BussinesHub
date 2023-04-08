import React, { ChangeEvent } from "react";
import "./Card.css";

export interface CardProps {
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children }) => {
  return <div className="card-S">{children}</div>;
};
