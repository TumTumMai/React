/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";
import { Dispatch } from "redux";
import api from "http/login.api";

import { IAction, AuthActionType } from "./type";

export const getUser = async (
  jwt: string,
  dispatch: Dispatch<any>
): Promise<void> => {
  const res = await api.getProfile({ jwt });

  if (!!res && res?.user !== undefined) {
    const payload = {
      loggedIn: true,
      token: jwt,
      user: res.user
    };

    if (res.user.role.name !== "Review") {
      Cookies.set("user", JSON.stringify({ token: payload.token, user: res }));
    }

    dispatch({
      type: AuthActionType.LOGIN_SUCCESS,
      payload: payload
    });
  } else {
    const payload = {
      error: res.error
    };
    Cookies.remove("user");
    dispatch({ type: AuthActionType.LOGIN_FAILURE, payload: payload });
  }
};

export const loginCallback = async (
  idToken: string,
  dispatch: Dispatch<any>
): Promise<void> => {
  // Get jwt
  const res = await api.loginCallback({ idToken });

  if (!!res && res?.jwt && res.jwt.length > 0) {
    // Get data user and role
    await getUser(res.jwt, dispatch);
  } else {
    const payload = {
      error: res
    };

    Cookies.remove("user");
    dispatch({ type: AuthActionType.LOGIN_FAILURE, payload: payload });
  }
};

export const logout = (): IAction => {
  Cookies.remove("user");

  return { type: AuthActionType.LOGOUT };
};
