import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "redux/authReducers/action";
import Pages, { IRoutes } from "constants/routes";
import { Menu, MenuLogOut } from "./Menu";
import { IAllReducers } from "redux/store";

const Navbar: React.FC = ({ children }): JSX.Element => {
  const dispatch = useDispatch();
  const auth = useSelector((state: IAllReducers) => state.auth);

  const onClickLogOut = (): void => {
    dispatch(logout());
  };

  return (
    <React.Fragment>
      <div
        className="
        fixed
        w-screen
        h-screen
        flex
      "
      >
        <div
          className="
          w-1/5
          h-full
          pt-16
          shadow-lg
          shadow-black-200
          bg-white"
        >
          {!!Pages &&
            Pages.map((item: IRoutes, index: number) => {
              return <Menu key={index} path={item.path} name={item.name} />;
            })}
          <MenuLogOut name="Logout" onClickLogOut={onClickLogOut} />
        </div>

        <div className="w-4/5 px-20 pt-20 pb-20 overflow-scroll">
          {children}
        </div>
      </div>

      <div
        className="
        w-screen 
        h-16 
        fixed 
        flex 
        justify-end 
        items-center 
        px-16 
        border-b
        bg-white
      "
      >
        {!!auth?.user && (
          <div>{`${auth.user.firstName} ${auth.user.lastName}`}</div>
        )}
        <div className="w-14 h-4/5 mx-4 rounded-full bg-gray-400" />
      </div>
    </React.Fragment>
  );
};

export default Navbar;
