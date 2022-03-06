import React, { useEffect, useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginCallback } from "../redux/authReducers/action";
import api from "http/login.api";
import { ICalendaData, IHoliday } from "models/holiday.api/holiday";
import axios from "axios";
import apicionstants from "../constants/api";

const Login: React.FC = (): JSX.Element => {
  const location = useLocation();
  const dispatch = useDispatch();

  const callback = useCallback(async () => {
    const { search } = location;
    if (!!search && search.length > 0) {
      await loginCallback(search, dispatch);
    }
  }, []);

  useEffect(() => {
    callback();
  }, []);

  /// ////////////

  const [HolidayBymont, setHolidayBymont] = useState<ICalendaData[]>([]);
  useEffect(() => {
    const getHolidayMont = (): Promise<ICalendaData[]> => {
      // const url = process.env.REACT_APP_API;

      return axios
        .get<IHoliday>(`${apicionstants.getHolidaysByMonth}`)
        .then((res) => {
          // console.log(res);
          const calendaDatas = res.data.data.map((e): ICalendaData[] => {
            return e.attributes.Holidays.map((h) => {
              // console.log(h);

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
    getHolidayMont().then((res) => {
      setHolidayBymont(res);

      const test = res;
      // eslint-disable-next-line array-callback-return
      test.map((item) => {
        console.log(item);
      });
    });
  }, []);
  // const test = moment().format(); // 2022-03-04T14:24:11+07:00
  // const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1); // กำหนดวันที่ เป็น 0

  // const today = new Date();
  // const onDayOfMonth = new Date(today.getFullYear(), today.getMonth()); // กำหนดวันที่ เป็น 0
  // const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // กำหนดวันที่ เป็น 0

  // console.log(lastDayOfMonth.toISOString());
  // console.log(onDayOfMonth);

  // console.log(lastDayOfMonth);

  return (
    <>
      <div className="h-screen flex justify-center items-center flex-col	">
        <div className="grid grid-cols-3 gap-1">
          {HolidayBymont.map((item, index) => {
            return (
              <div
                key={index}
                className="py-6 px-14 rounded-lg  shadow-black-200 bg-pink-700"
              >
                <div>{item.title}</div>

                <div>
                  {" "}
                  {item.start.toLocaleDateString("th-TH", {
                    weekday: "long",
                    day: "2-digit"
                    // formatMatcher: "month"
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <br></br>
        <button
          className="
        w-full 
        max-w-[480px]
        flex
        justify-center
        p-6
        rounded-lg
        shadow-lg
        shadow-black-200 
        bg-white
        hover:text-white
        hover:bg-sky-600"
          onClick={() => api.loginGoogleWithStrapi()}
        >
          <h1 className="text-3xl"> Login with Google</h1>
        </button>
      </div>
    </>
  );
};

export default Login;
