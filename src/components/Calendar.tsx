/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-len */
import * as React from "react";
// import { useNavigate } from "react-router-dom";
import { ICalendaData, IHoliday } from "../models/holiday";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Navbar from "./Navbar";
import { IUser } from "../models/user";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useState, useEffect } from "react";
const localizer = momentLocalizer(moment);
// const calendarStyle = (): void => {
//   return {
//     style: {
//       backgroundColor: "#dcfce7"
//     }
//   };
// };

// interface ITestProps {}
const Test: React.FunctionComponent = () => {
  const userstr = localStorage.getItem("datalocalstorage");
  const user = JSON.parse(userstr!) as IUser;
  const router = useNavigate();
  const handleLogout = (): void => {
    localStorage.removeItem("datalocalstorage");
    if (localStorage.getItem("datalocalstorage") == null) {
      router("/");
    } else {
      alert("aaa");
    }
  };

  const [holiday, setHoliday] = useState<ICalendaData[]>();
  useEffect(() => {
    const getHoliday = (): Promise<ICalendaData[]> => {
      const url = process.env.REACT_APP_API;

      return axios
        .get<IHoliday>(`${url}/api/holiday-details?populate=Holidays`, {
          headers: {
            Authorization: "Bearer " + user.jwt
          }
        })
        .then((res) => {
          // console.log(res);
          const calendaDatas = res.data.data.map((e) => {
            return e.attributes.Holidays.map((h) => {
              console.log(h);

              const item: ICalendaData = {
                title: h.title,
                start: new Date(h.Start_holiday_year),
                end: new Date(h.End_holiday_year)
              };
              return item;
            });
          });
          // console.log(data)
          return calendaDatas.flat();
        })

        .catch();
    };

    getHoliday().then((res) => {
      console.log(res);
      setHoliday(res);
    });
    // console.log(ld)

    // console.log(token)
  }, []);

  return (
    <>
      <Navbar></Navbar>
      {/* <div style={{ width: "100%", height: "70px" }}></div> */}
      <div className="bg-green-100 ">
        <Calendar
          localizer={localizer}
          events={holiday}
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
      <button className=" hover:bg-green-600  " onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

// const Test: React.FunctionComponent = () => {
//   return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
// };

export default Test;
