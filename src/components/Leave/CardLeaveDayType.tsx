/* eslint-disable quotes */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IAllReducers } from 'redux/store';
import { LeaveDayType } from 'models/leave.api';
import api from 'http/leave.api';
import utils from 'utils';

interface ICardLeaveDayType {
  type: LeaveDayType;
  title: string;
  active: boolean;
}

const CardLeaveDayType = (props: ICardLeaveDayType): JSX.Element => {
  const [date, setDate] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const auth = useSelector((state: IAllReducers) => state.auth);

  const stylesNormal =
    'bg-white hover:bg-indigo-600 cursor-pointer hover:text-white hover:transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-110 duration-300';
  const stylesActive = 'text-white bg-indigo-600 cursor-default';

  const style = props.active ? stylesActive : stylesNormal;

  const getDate = async (): Promise<void> => {
    if (!!props?.type && !!auth.user?.id && !!auth.token) {
      const params = {
        token: auth.token,
        userId: auth.user.id,
        leaveDayType: props.type
      };
      const res = await api.SumLeaveDetail(params);

      if (res.data?.leaveDays) {
        setDate(res.data.leaveDays);
      } else if (res?.error) {
        setErrorMessage(utils.setMessageError(res.error));
      }
    }
  };

  useEffect(() => {
    getDate();
  }, [props]);

  return (
    <div
      className={
        style +
        ' p-8 font-semibold rounded-lg shadow-lg shadow-black-200 border border-solid border-indigo-600'
      }
    >
      <div className="text-2xl">{props.title}</div>
      <div className="text-4xl text-right mt-4">{date}</div>
      {!!errorMessage && (
        <div className="flex justify-center text-rose-600">{errorMessage}</div>
      )}
    </div>
  );
};

export default CardLeaveDayType;
