import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const activeStyle = "font-semibold text-white bg-indigo-600 cursor-default";
const normalStyle = "hover:bg-indigo-600 cursor-pointer hover:text-white";

export interface IMenu {
  path: string;
  name: string;
}

export const Menu: React.FC<IMenu> = (props): JSX.Element => {
  const [isActive, setIsActive] = useState(false);

  const checkActiveMenu = (): void => {
    const pathname = window.location.pathname;
    if (pathname === props.path) {
      setIsActive(true);
    }
  };

  useEffect(() => {
    checkActiveMenu();
  }, []);

  return (
    <NavLink
      className={`
                ${isActive ? activeStyle : normalStyle}
                w-full 
                h-14 
                flex 
                px-8 
                items-center 
                border-b`}
      to={props.path}
    >
      {props.name}
    </NavLink>
  );
};

export interface IMenuLogOut {
  name: string;
  onClickLogOut: () => void;
}

export const MenuLogOut: React.FC<IMenuLogOut> = (props): JSX.Element => {
  return (
    <div
      className={`
                ${normalStyle}
                w-full 
                h-14 
                flex 
                px-8 
                items-center 
                border-b`}
      onClick={() => props.onClickLogOut()}
    >
      {props.name}
    </div>
  );
};
