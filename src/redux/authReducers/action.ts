/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";
import { Dispatch } from "redux";
import api from "http/login.api";

import { IAction, AuthActionType } from "./type";

export const getUser = async (
  jwt: string,
  dispatch: Dispatch<any>
): Promise<void> => {
  const user = await api.getProfile({ jwt });

  if (!!user && user !== undefined) {
    const payload = {
      loggedIn: true,
      token: jwt,
      user: user
    };

    Cookies.set("user", JSON.stringify({ token: payload.token, user: user }));

    dispatch({
      type: AuthActionType.LOGIN_SUCCESS,
      payload: payload
    });
  } else {
    Cookies.remove("user");
    dispatch({ type: AuthActionType.LOGIN_FAILURE });
  }
};

export const loginCallback = async (
  idToken: string,
  dispatch: Dispatch<any>
): Promise<void> => {
  // Get jwt

  const jwt = await api.loginCallback({ idToken });

  if (!!jwt && jwt.length > 0) {
    // Get data user and role
    await getUser(jwt, dispatch);
  } else {
    Cookies.remove("user");
    dispatch({ type: AuthActionType.LOGIN_FAILURE });
  }
};

export const logout = (): IAction => {
  Cookies.remove("user");

  return { type: AuthActionType.LOGOUT };
};
