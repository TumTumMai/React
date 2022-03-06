export interface ILeaveDayData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  leaveDayType: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  locale: string;
}

export interface Datum {
  id: number;
  attributes: ILeaveDayData;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Meta {
  pagination: Pagination;
}

export interface ILeaveDay {
  data: Datum[];
  meta: Meta;
}
