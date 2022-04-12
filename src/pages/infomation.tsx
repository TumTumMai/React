/* eslint-disable quotes */
import React, { useEffect, useState } from 'react';
import Navbar from 'components/Navbar/index';
import Container from 'components/ContainerContent';
import Calendar, { IEventCarendar } from 'components/Calendar';
import { ICalendaData } from '../models/holiday.api/holiday';
import api from 'http/leave.api';
import apii from 'http/holiday.api';

// import axios from 'axios';
// import useapi from '../constants/api';
import { useDispatch, useSelector } from 'react-redux';
import { IAllReducers } from 'redux/store';
import { LoadActionType } from 'redux/loadReducers/type';

const Information: React.FC = (): JSX.Element => {
  const auth = useSelector((state: IAllReducers) => state.auth);
  const dispatch = useDispatch();
  const [Calendars, setCalendar] = useState<IEventCarendar[]>([]);

  const handleEventCalendar = async (
    Holidaydata: ICalendaData[] | []
  ): Promise<void> => {
    let listLeaveApprove: IEventCarendar[] = [];
    if (auth.token) {
      const listLeave = await api.findLeaveDetail({
        token: auth.token,
        status: 'approve'
      });

      if (listLeave?.data) {
        listLeaveApprove = listLeave.data.map((item) => {
          return {
            title:
              item.attributes.user.data.attributes.firstName +
              ' ' +
              item.attributes.title,
            start: new Date(item.attributes.startDate),
            end: new Date(item.attributes.endDate),
            iduser: item.attributes.user.data.id
          };
        });
      }

      const allData: IEventCarendar[] = listLeaveApprove.concat(Holidaydata);
      setCalendar(allData);
    }
  };

  // const fetchData = useCallback(async () => {
  //   let calendaDatas: any[] = [];
  //   const res = await axios.get<IHoliday>(`${useapi.getHolidays}`, {
  //     headers: {
  //       Authorization: 'Bearer ' + auth.token
  //     }
  //   });

  //   if (!!res?.data?.data && res.data.data.length > 0) {
  //     calendaDatas = res.data.data.map((holiday) => {
  //       return holiday.attributes.Holidays.map((event) => {
  //         const item: ICalendaData = {
  //           title: event.title,
  //           start: new Date(event.Start_holiday_year),
  //           end: new Date(event.End_holiday_year)
  //         };
  //         return item;
  //       });
  //     });
  //     calendaDatas = calendaDatas.flat();
  //   }
  //   await handleEventCalendar(calendaDatas);

  //   return true;
  // }, []);
  const getAlldata = async (): Promise<void> => {
    if (auth.token) {
      const listAll = await apii.getHoliday({
        token: auth.token
      });
      await handleEventCalendar(listAll);
    }
  };

  useEffect(() => {
    dispatch({ type: LoadActionType.LOADING_ON });

    getAlldata();
    setTimeout(() => {
      dispatch({ type: LoadActionType.LOADING_OFF });
    }, 100);
  }, []);

  return (
    <Navbar>
      <Container>
        <Calendar events={Calendars} />
      </Container>
    </Navbar>
  );
};

export default Information;
