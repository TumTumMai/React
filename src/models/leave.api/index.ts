import { IUser } from "../login.api";
import * as Create from "./create";
import * as Find from "./find";
import * as Update from "./update";

export type LeaveDayType = "vacation_leave" | "sick_leave" | "personal_leave";
export type LeaveDayStatusType = "waiting" | "cancel" | "approve";

export interface ILeave {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  leaveDayType: LeaveDayType;
  status: LeaveDayStatusType;
  user: IUser;
}

export interface IData {
  id: number;
  attributes: ILeave;
}

export { Create, Find, Update };
