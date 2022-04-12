/* eslint-disable quotes */
/* eslint-disable no-self-compare */
/* eslint-disable no-constant-condition */
// eslint-disable-next-line no-self-compare
/* eslint-disable @typescript-eslint/no-explicit-any */
import http from './index';
import api from '../constants/api';
import {
  Datum,
  ICalendaData,
  IHolidayData,
  IParams
} from 'models/holiday.api/holiday';

const holidayApi = {
  getHoliday: async (props: IParams): Promise<ICalendaData[]> => {
    try {
      const url = api.getHolidays;
      const headers = {
        Authorization: 'Bearer ' + props.token
      };
      const res = await http.get(url, { headers });
      const calendaDatas = res.data.data?.map((Fdata: Datum) => {
        return Fdata.attributes.Holidays.map((Pdata: IHolidayData) => {
          const item: ICalendaData = {
            title: Pdata.title,
            start: new Date(Pdata.Start_holiday_year),
            end: new Date(Pdata.End_holiday_year)
          };
          return item;
        });
      });
      return calendaDatas.flat();
    } catch (e: any) {
      return e.response.data;
    }
  }
};

export default holidayApi;
