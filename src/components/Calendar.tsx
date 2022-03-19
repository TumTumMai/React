/* eslint-disable spaced-comment */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-len */
import * as React from "react";
import { ICalendaData, IHoliday } from "../models/holiday.api/holiday";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjQ3NzAxMTUxLCJleHAiOjE2NTAyOTMxNTF9.iNVDQq6FmNTtO_-Iv-xQEVZrahwXfo-fFypX1WEa-HU

import axios from "axios";
import { useEffect, useState } from "react";
import api from "../constants/api";
import { useDispatch, useSelector } from "react-redux";
import { IAllReducers } from "redux/store";
import Navbar from "components/Navbar/index";
import Container from "components/ContainerContent";
import { ILeaveDay } from "models/leave.api/leave.approve";
import { LoadActionType } from "redux/loadReducers/type";

const localizer = momentLocalizer(moment);

const CalendarHoliday: React.FunctionComponent = () => {
  const auth = useSelector((state: IAllReducers) => state.auth);
  const dispatch = useDispatch();

  const [Calendars, setCalendar] = useState<ICalendaData[]>();
  useEffect(() => {
    const getHoliday = (): Promise<ICalendaData[]> => {
      dispatch({ type: LoadActionType.LOADING_ON });

      return axios
        .get<IHoliday>(`${api.getHolidays}`, {
          headers: {
            Authorization: "Bearer " + auth.token
          }
        })
        .then((res) => {
          const calendaDatas = res.data.data.map((e) => {
            return e.attributes.Holidays.map((h) => {
              const item: ICalendaData = {
                title: h.title,
                start: new Date(h.Start_holiday_year),
                end: new Date(h.End_holiday_year)
              };
              return item;
            });
          });
          return calendaDatas.flat();
        })

        .catch();
    };

    let data: ICalendaData[] = [];
    getHoliday().then((aaa) => {
      axios
        .get<ILeaveDay>(`${api.getLeaveDetailByApprove}`, {
          headers: {
            Authorization: "Bearer " + auth.token
          }
        })
        .then((res) => {
          data = res.data.data.map((l) => {
            return {
              title: l.attributes.title,
              start: new Date(l.attributes.startDate),
              end: new Date(l.attributes.endDate)
            };
          });
          const allData = data.concat(aaa);

          console.log(allData);

          setTimeout(() => {
            dispatch({ type: LoadActionType.LOADING_OFF });
          }, 100);
          setCalendar(allData);
        });
    });
  }, []);

  return (
    <>
      <Navbar>
        <Container>
          {/* <div style={{ width: "100%", height: "70px" }}></div> */}
          <div className="bg-green-100 ">
            <Calendar
              localizer={localizer}
              events={Calendars}
              startAccessor="start"
              endAccessor="end"
              style={{
                height: 600
              }}
              eventPropGetter={(event, start, end, isSelected) => ({
                event,
                start,
                end,
                isSelected,
                style: { backgroundColor: "#ff3333" }
              })}
              // dayPropGetter={calendarStyle}
            />
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default CalendarHoliday;
