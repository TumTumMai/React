export interface IHolidayData {
  id: number;
  title: string;
  Start_holiday_year: string;
  End_holiday_year: string;
}

export interface Attributes {
  Start_holiday_year: string;
  End_holiday_year: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  Holidays: IHolidayData[];
}
export interface IParams {
  token?: string;
}
export interface ICalendaData {
  title: string;
  start: Date;
  end: Date;
}

export interface Datum {
  id: number;
  attributes: Attributes;
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

export interface IHoliday {
  data: Datum[];
  meta: Meta;
}
