export interface IRole {
  id: number;
  name: string;
  description: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  title: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  birthDate?: string;
  identificationCard: string;
  position: string;
  salary?: number;
  vacationLeave: number;
  sickLeave: number;
  personalLeave: number;
  startingDate?: string;
  registrationDate?: string;
  lastWorkingDate?: string;
  createdAt: Date;
  updatedAt: Date;
  role: IRole;
  jwt: string;
}
