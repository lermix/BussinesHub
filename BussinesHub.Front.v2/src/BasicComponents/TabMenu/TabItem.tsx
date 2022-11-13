import React from "react";

export interface TabItemProps {
  title?: string;
  children?: React.ReactNode;
}

export const TabItem: React.FC<TabItemProps> = ({ children, title }) => {
  return <div style={{ margin: 15 }}>{children}</div>;
};
