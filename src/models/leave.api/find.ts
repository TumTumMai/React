import { IError, IMeta } from "../api";
import { LeaveDayType, IData } from "./index";

export interface IParams {
  userId?: number;
  page?: number;
  pageSize?: number;
  leaveDayType?: LeaveDayType;
}

// interface return data
export interface IFind {
  data: IData[] | [] | null;
  meta?: IMeta;
  error?: IError;
}
