/* eslint-disable quotes */
import * as React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useSelector } from 'react-redux';
import { IAllReducers } from 'redux/store';

interface Props {
  events: IEventCarendar[];
}

export interface IEventCarendar {
  title: string;
  start: Date;
  end: Date;
  iduser?: number;
}

const CalendarHoliday: React.FunctionComponent<Props> = (props) => {
  const localizer = momentLocalizer(moment);
  const auth = useSelector((state: IAllReducers) => state.auth);

  return (
    <div className="bg-green-100 ">
      <Calendar
        localizer={localizer}
        events={props.events}
        startAccessor="start"
        endAccessor="end"
        style={{
          height: 600
        }}
        eventPropGetter={(event) => {
          const style = {
            backgroundColor: '#ff3333'
          };

          if (event.iduser && event.iduser !== auth.user?.id) {
            style.backgroundColor = '#FF00FF';
          } else if (event.iduser && event.iduser === auth.user?.id) {
            style.backgroundColor = '#0000FF';
          }

          return { style };
        }}
      />
    </div>
  );
};

export default CalendarHoliday;
