export interface IError {
  message: string;
  name: string;
  staus: number;
}

export interface IMeta {
  pagination: IPagination;
}
export interface IPagination {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
}
