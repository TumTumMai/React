import { IUser } from '../login.api';
import * as Create from './create';
import * as Find from './find';
import * as Update from './update';
import * as Sum from './sum';

export type LeaveDayType = 'vacation_leave' | 'sick_leave' | 'personal_leave';
export type LeaveDayStatusType = 'waiting' | 'cancel' | 'approve';

export interface ILeave {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  leaveDayType: LeaveDayType;
  leaveDays: number;
  status: LeaveDayStatusType;
  user: {
    data: {
      id: number;
      attributes: Omit<IUser, 'id'>;
    };
  };
}

export interface IData {
  id: number;
  attributes: ILeave;
}

export { Create, Find, Update, Sum };
