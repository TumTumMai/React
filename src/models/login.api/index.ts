import { IError } from '../api';
export interface IPramasGetProfile {
  jwt: string;
}

export interface IPramasLoginCallback {
  idToken: string;
}

export interface IGetProFile {
  user?: IUser;
  error?: IError;
}
export interface ICallback {
  jwt?: string;
  user?: IUser;
  error?: IError;
}
export interface IUser {
  id: number;
  email: string;
  title: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  birthday: string | null;
  identificationCard: string;
  position: string;
  salary: number | null;
  startingDate: string | null;
  registrationDate: string | null;
  lastWorkingDate: string | null;
  blocked: boolean;
  role: IRole;
}

export interface IRole {
  id: number;
  name: 'Review' | 'Member';
  type: string;
}
