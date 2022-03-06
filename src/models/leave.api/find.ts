import { LeaveDayType, ILeave } from "./index";

export interface IParams {
  userId?: number;
  page?: number;
  pageSize?: number;
  leaveDayType?: LeaveDayType;
}

// interface return data
export interface IFind {
  data: IData[] | [];
  meta: IPagination;
}

export interface IData {
  id: number;
  attributes: ILeave;
}

export interface IPagination {
  pagination: {
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
  };
}
