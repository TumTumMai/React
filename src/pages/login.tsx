/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable quotes */
import React, { useEffect, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IAllReducers } from 'redux/store';
import { LoadActionType } from 'redux/loadReducers/type';
import { loginCallback } from '../redux/authReducers/action';
import api from 'http/login.api';
import { ICalendaData, IHoliday } from 'models/holiday.api/holiday';
import axios from 'axios';
import apicionstants from '../constants/api';
import utils from 'utils';

const Login: React.FC = (): JSX.Element => {
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector((state: IAllReducers) => state.auth);

  const callback = useCallback(async () => {
    const { search } = location;
    if (!!search && search.length > 0) {
      dispatch({ type: LoadActionType.LOADING_ON });
      await loginCallback(search, dispatch);
      dispatch({ type: LoadActionType.LOADING_OFF });
    }
  }, []);

  const onClickLogin = (): void => {
    dispatch({ type: LoadActionType.LOADING_ON });
    api.loginGoogleWithStrapi();
  };

  useEffect(() => {
    callback();
  }, []);

  const [HolidayBymont, setHolidayBymont] = useState<ICalendaData[]>([]);
  useEffect(() => {
    const getHolidayMont = (): Promise<ICalendaData[]> => {
      return axios
        .get<IHoliday>(`${apicionstants.getHolidaysByMonth}`)
        .then((res) => {
          const calendaDatas = res.data.data.map((e): ICalendaData[] => {
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
    getHolidayMont().then((res) => {
      setHolidayBymont(res);

      const test = res;
      // eslint-disable-next-line array-callback-return
      test.map((item) => {
        console.log(item);
      });
    });
  }, []);

  return (
    <>
      <div className="h-screen flex justify-center items-center flex-col	">
        <div className="flex flex-row flex-wrap justify-around">
          {HolidayBymont.map((item, index) => {
            return (
              <div key={index} className="p-1 w-1/3">
                <div
                  className={
                    'py-6 px-14 rounded-lg  shadow-black-200 bg-white ' +
                    utils.setColordate(item.start)
                  }
                >
                  <div>{item.title}</div>

                  <div>
                    {' '}
                    {item.start.toLocaleDateString('en-EN', {
                      weekday: 'long',
                      day: '2-digit'
                      // formatMatcher: "month"
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button
          className="
        w-full 
        max-w-[480px]
        flex
        flex-col
        items-center
        justify-center
        p-6
        rounded-lg
        shadow-lg
        shadow-black-200 
        bg-white
        hover:text-white
        hover:bg-sky-600"
          onClick={() => onClickLogin()}
        >
          <h1 className="text-3xl"> Login with Google</h1>
          {!!auth && auth?.error && (
            <div className="mt-2 text-rose-600">
              {utils.setMessageError(auth.error)}
            </div>
          )}
        </button>
      </div>
    </>
  );
};

export default Login;
