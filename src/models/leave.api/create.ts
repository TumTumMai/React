import { LeaveDayType, LeaveDayStatusType } from "./index";

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
  user: number; // user id
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  leaveDayType: LeaveDayType;
  status: LeaveDayStatusType;
}
