import React from "react";
import { useLocation } from "react-router-dom";
import NoFoundPage from "../pages/404";
import {  Adminitems } from "./menuItems";

interface IMainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  const location = useLocation();

  const isAccessible = (path: string) => {
    return Adminitems.map((item) => item.key).includes(path);
  };

  return isAccessible(location.pathname) ? <>{children}</> : <NoFoundPage />;
};

export default MainLayout;
