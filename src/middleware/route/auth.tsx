import { useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { IRoutes } from "constants/routes";
import { IAllReducers } from "redux/store";
import { getUser } from "redux/authReducers/action";

const Auth = (
  Element: JSX.Element | null,
  props: IRoutes
): JSX.Element | null => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state: IAllReducers) => state.auth);

  const setUser = useCallback(async (token: string) => {
    await getUser(token, dispatch);
  }, []);

  useEffect(() => {
    const cookies = Cookies.get("user");
    if (!!cookies && cookies.length > 0) {
      const user = JSON.parse(cookies);

      if (!!user?.token && user.token.length > 0) {
        setUser(user.token);
      }
    }
  }, []);

  // check token user very time to route
  useEffect(() => {
    const cookies = Cookies.get("user");
    if (!!cookies && cookies.length > 0) {
      const user = JSON.parse(cookies);

      if (!!user?.token && user.token.length > 0) {
        setUser(user.token);
      }
    }
  }, [history]);

  if (props.requestAuth) {
    if (auth.loggedIn === true || Cookies.get("user") !== undefined) {
      return Element;
    } else if (
      auth.loggedIn === false ||
      auth.loggedIn === null ||
      Cookies.get("user") === undefined
    ) {
      return <Navigate to="/login" />;
    } else return null;
  } else if (props.path === "/login") {
    if (auth.loggedIn === true) {
      if (auth.user?.role.name === "Review") {
        return <Navigate to="/register" />;
      }
      return <Navigate to="/" />;
    } else if (auth.loggedIn === false || Cookies.get("user") === undefined) {
      return Element;
    } else return null;
  } else {
    return Element;
  }
};

export default Auth;
