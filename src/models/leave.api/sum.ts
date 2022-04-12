import { IError } from '../api';
import { LeaveDayType } from './index';

export interface IParams {
  token: string;
  userId: number;
  leaveDayType: LeaveDayType;
}

export interface ISum {
  data: IData | null;
  error?: IError;
}

export interface IData {
  leaveDays: number;
}
