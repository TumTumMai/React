/* eslint-disable quotes */
import { IUser } from 'models/login.api';
import { IError } from 'models/api';

export interface IAction {
  type: AuthActionType;
  payload?: IAuthReducers;
}

export enum AuthActionType {
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  LOGOUT = 'LOGOUT'
}

export interface IAuthReducers {
  loggedIn: boolean | null;
  token: string | null;
  user: IUser | null;
  error?: IError;
}
