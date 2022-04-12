/* eslint-disable quotes */
export interface IAction {
  type: LoadActionType;
}

export enum LoadActionType {
  LOADING_ON = 'LOADING_ON',
  LOADING_OFF = 'LOADING_OFF'
}

export interface ILoadReducers {
  status: boolean;
}
