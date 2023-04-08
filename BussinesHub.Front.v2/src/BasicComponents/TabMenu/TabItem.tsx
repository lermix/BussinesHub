import React from "react";

export interface TabItemProps {
  title?: string;
  children?: React.ReactNode;
  onClick?: any;
}

export const TabItem: React.FC<TabItemProps> = ({ children }) => {
  return <div>{children}</div>;
};
