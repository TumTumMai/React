/* eslint-disable quotes */
import { IError } from 'models/api';

export const setMessageError = (error: IError): string => {
  return `${error.name} - ${error.message}`;
};
