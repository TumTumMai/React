import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IAllReducers } from "redux/store";
import Navbar from "components/Navbar/index";
import Container from "components/ContainerContent";
import CardLeaveDayType from "components/Leave/CardLeaveDayType";
import LeaveList from "components/Leave/LeaveList";
import Carendar from "components/Leave/Carenda";
import * as Pagination from "components/Pagination";
import api from "http/leave.api";
import * as IApiLeave from "models/leave.api";

interface ILeave {
  type: IApiLeave.LeaveDayType;
  title: string;
  date: number | undefined;
}

const Leave: React.FC = (): JSX.Element => {
  const [fetchData, setFetchData] = useState<Date>(new Date());
  const [page, setPage] = useState<number>(1);
  const [leaveList, setLeaveList] = useState<IApiLeave.Find.IData[]>();
  const [leaveListAll, setLeaveListAll] = useState<IApiLeave.Find.IData[]>();
  const [pagination, setPagination] = useState<
    IApiLeave.Find.IPagination | undefined
  >();
  const [leaveDayType, setLeaveDayType] =
    useState<IApiLeave.LeaveDayType>("vacation_leave");
  const auth = useSelector((state: IAllReducers) => state.auth);

  const getLeaveDate = async (): Promise<void> => {
    const list = await api.findLeaveDetailByIdUser({
      userId: auth.user?.id,
      page: page,
      pageSize: 5,
      leaveDayType
    });
    const listAll = await api.findLeaveDetailByIdUser({
      userId: auth.user?.id
    });

    setLeaveListAll(listAll.data);
    setLeaveList(list.data);
    setPagination(list.meta);
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
      type: "vacation_leave",
      title: "Vacation Leave",
      date: auth?.user?.vacationLeave
    },
    {
      type: "sick_leave",
      title: "Sick Leave",
      date: auth?.user?.sickLeave
    },
    {
      type: "personal_leave",
      title: "Personal Leave",
      date: auth?.user?.personalLeave
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
                  date={item.date}
                  active={active}
                />
              </div>
            );
          })}
      </div>
      <div className="grid grid-cols-2 grid-flow-col gap-4">
        <Container>
          <div className="flex flex-col" style={{ minHeight: "600px" }}>
            <h1 className="text-2xl font-bold">{leaveDayType}</h1>
            <div className="mt-10 grow">
              {!!leaveList &&
                leaveList.length > 0 &&
                leaveList.map((item, index) => {
                  return (
                    <div className="mt-4" key={index}>
                      <LeaveList {...item} />
                    </div>
                  );
                })}
            </div>
            <div className="flex-none">
              {!!pagination && (
                <Pagination.Button
                  {...pagination.pagination}
                  onClick={setPage}
                />
              )}
              {!!pagination && <Pagination.Text {...pagination.pagination} />}
            </div>
          </div>
        </Container>
        <Container>
          <h1 className="text-2xl font-bold">Calendar</h1>
          <div className="flex" style={{ height: "500px" }}>
            <Carendar
              leaveList={leaveListAll}
              leaveDayType={leaveDayType}
              setFetchData={setFetchData}
            />
          </div>
        </Container>
      </div>
    </Navbar>
  );
};

export default Leave;
