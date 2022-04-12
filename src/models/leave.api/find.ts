import { IError, IMeta } from '../api';
import { LeaveDayType, LeaveDayStatusType, IData } from './index';

export interface IParamsFindById {
  userId?: number;
  page?: number;
  pageSize?: number;
  leaveDayType?: LeaveDayType;
}

export interface IParamsFind {
  token?: string;
  status?: LeaveDayStatusType;
}

// interface return data
export interface IFind {
  data: IData[] | [] | null;
  meta?: IMeta;
  error?: IError;
}
