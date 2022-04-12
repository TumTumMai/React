import { IError, IMeta } from '../api';
import { LeaveDayStatusType, IData } from './index';
export interface IParams {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: LeaveDayStatusType;
  token: string;
  userId: number;
}

export interface IBody {
  title: string;
  description: string;
  status: LeaveDayStatusType;
  startDate: string;
  endDate: string;
  userId: number;
}

export interface IUpdate {
  data: IData | null;
  meta?: IMeta;
  error?: IError;
}
