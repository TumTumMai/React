/* eslint-disable quotes */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IAllReducers } from 'redux/store';
import { LoadActionType } from 'redux/loadReducers/type';
import Navbar from 'components/Navbar/index';
import Container from 'components/ContainerContent';
import CardLeaveDayType from 'components/Leave/CardLeaveDayType';
import LeaveList from 'components/Leave/LeaveList';
import Carendar from 'components/Leave/Calendar';
import * as Pagination from 'components/Pagination';
import api from 'http/leave.api';
import * as IApi from 'models/api';
import * as IApiLeave from 'models/leave.api';
import utils from 'utils';

interface ILeave {
  type: IApiLeave.LeaveDayType;
  title: string;
}

const Leave: React.FC = (): JSX.Element => {
  const [errorMessageListAll, setErrorMessageListAll] = useState<string>('');
  const [errorMessageList, setErrorMessageList] = useState<string>('');
  const [fetchData, setFetchData] = useState<Date>(new Date());
  const [page, setPage] = useState<number>(1);
  const [leaveList, setLeaveList] = useState<IApiLeave.IData[]>();
  const [leaveListAll, setLeaveListAll] = useState<IApiLeave.IData[]>();
  const [pagination, setPagination] = useState<IApi.IMeta | undefined>();
  const [leaveDayType, setLeaveDayType] =
    useState<IApiLeave.LeaveDayType>('vacation_leave');

  const dispatch = useDispatch();
  const auth = useSelector((state: IAllReducers) => state.auth);
  console.log(auth);

  const getLeaveDate = async (): Promise<void> => {
    dispatch({ type: LoadActionType.LOADING_ON });
    const list = await api.findLeaveDetailByIdUser({
      userId: auth.user?.id,
      page: page,
      pageSize: 5,
      leaveDayType
    });
    const listAll = await api.findLeaveDetailByIdUser({
      userId: auth.user?.id,
      pageSize: 60
    });

    setTimeout(() => {
      dispatch({ type: LoadActionType.LOADING_OFF });
    }, 100);

    // setdata listAll
    if (!!listAll && listAll?.data && listAll?.meta) {
      setLeaveListAll(listAll.data);
      setPagination(list.meta);
      setErrorMessageListAll('');
    } else if (!!listAll && listAll?.error) {
      setLeaveListAll([]);
      setErrorMessageListAll(utils.setMessageError(listAll.error));
    }

    // setdata list
    if (!!list && list?.data && list?.meta) {
      setLeaveList(list.data);
      setErrorMessageList('');
    } else if (!!list && list?.error) {
      setLeaveList([]);
      setErrorMessageList(utils.setMessageError(list.error));
    }
  };

  useEffect(() => {
    getLeaveDate();
  }, [page, fetchData]);

  useEffect(() => {
    getLeaveDate();
    setPage(1);
  }, [leaveDayType]);

  const leave: ILeave[] = [
    {
      type: 'vacation_leave',
      title: 'Vacation Leave'
    },
    {
      type: 'sick_leave',
      title: 'Sick Leave'
    },
    {
      type: 'personal_leave',
      title: 'Personal Leave'
    }
  ];

  return (
    <Navbar>
      <div className="flex flex-row justify-around my-10">
        {!!leave &&
          leave.length > 0 &&
          leave.map((item, index) => {
            let active = false;

            if (leaveDayType === item.type) {
              active = true;
            }

            return (
              <div
                key={index}
                onClick={() => {
                  setLeaveDayType(item.type);
                }}
                className="w-3/12"
              >
                <CardLeaveDayType
                  type={item.type}
                  title={item.title}
                  active={active}
                />
              </div>
            );
          })}
      </div>
      <div className="grid grid-cols-2 grid-flow-col gap-4">
        <Container>
          <div className="flex flex-col" style={{ minHeight: '600px' }}>
            <h1 className="text-2xl font-bold">{leaveDayType}</h1>
            <div className="mt-10 grow">
              {!!errorMessageList && errorMessageList.length > 0 && (
                <div className="flex justify-center text-rose-600">
                  {errorMessageList}
                </div>
              )}
              {!!pagination && <Pagination.Text {...pagination.pagination} />}
              {!!leaveList &&
                leaveList.length > 0 &&
                leaveList.map((item, index) => {
                  return (
                    <div className="mt-4" key={index}>
                      <LeaveList
                        {...item}
                        leaveListAll={leaveListAll}
                        setFetchData={setFetchData}
                      />
                    </div>
                  );
                })}
            </div>
            <div className="flex-none mt-6 border-t border-gray-200">
              {!!pagination && (
                <Pagination.Button
                  {...pagination.pagination}
                  onClick={setPage}
                />
              )}
            </div>
          </div>
        </Container>
        <Container>
          <h1 className="text-2xl font-bold">Calendar</h1>
          <div className="block" style={{ height: '500px' }}>
            {!!errorMessageListAll && errorMessageListAll.length > 0 ? (
              <div className="flex justify-center text-rose-600">
                {errorMessageListAll}
              </div>
            ) : (
              <Carendar
                leaveList={leaveListAll}
                leaveDayType={leaveDayType}
                setFetchData={setFetchData}
              />
            )}
          </div>
        </Container>
      </div>
    </Navbar>
  );
};

export default Leave;
