import { IUser } from "models/login.api";

export interface IAction {
  type: AuthActionType;
  payload?: IAuthReducers;
}

export enum AuthActionType {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
}

export interface IAuthReducers {
  loggedIn: boolean | null;
  token: string | null;
  user: IUser | null;
}
