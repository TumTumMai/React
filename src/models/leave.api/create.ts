import { LeaveDayType, LeaveDayStatusType, IData } from "./index";
import { IError, IMeta } from "../api";

export interface IParams {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  leaveDayType: LeaveDayType;
  userId: number;
  token: string;
}

export interface IBody {
  userId: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  leaveDayType: LeaveDayType;
  status: LeaveDayStatusType;
}

export interface ICreate {
  data: IData | null;
  meta?: IMeta;
  error?: IError;
}
