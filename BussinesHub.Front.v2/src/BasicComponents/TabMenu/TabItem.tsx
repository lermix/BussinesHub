import React, { useEffect } from "react";

export interface TabItemProps {
  title?: string;
  children?: React.ReactNode;
  onClick?: any;
}

export const TabItem: React.FC<TabItemProps> = ({ children }) => {
  return <div style={{ margin: 15 }}>{children}</div>;
};
