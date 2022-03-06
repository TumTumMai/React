import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { IAllReducers } from "redux/store";
import moment from "moment";
import Modal from "components/Modal";
import api from "http/leave.api";
import * as IApiLeave from "models/leave.api";
import { Calendar, momentLocalizer } from "react-big-calendar";

interface IParamsSelectCarenda {
  start: string | Date;
  end: string | Date;
  slots: Date[] | string[];
  action: "select" | "click" | "doubleClick";
}

export interface ILeave {
  id?: number;
  title?: string;
  start?: moment.Moment;
  end?: moment.Moment;
  color?: string;
  type?: string;
  allDay?: string;
}

interface IProps {
  leaveList?: IApiLeave.Find.IData[];
  leaveDayType: IApiLeave.LeaveDayType;
  setFetchData: React.Dispatch<React.SetStateAction<Date>>;
}

const Carendar: React.FC<IProps> = (props): JSX.Element => {
  const [leaves, setLeaves] = useState<ILeave[]>([]);
  const [startDate, setStartDate] = useState<moment.Moment>();
  const [endDate, setEndDate] = useState<moment.Moment>();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);

  const localizer = momentLocalizer(moment);
  const auth = useSelector((state: IAllReducers) => state.auth);

  const handleSelect = ({ start, end }: IParamsSelectCarenda): void => {
    const startDateMoment = moment(moment.utc(start).valueOf());
    const endDateMoment = moment(moment.utc(end).valueOf());

    setStartDate(startDateMoment);
    setEndDate(endDateMoment);
    setOpenModal(true);
  };

  const onCloseModal = (): void => {
    setStartDate(undefined);
    setEndDate(undefined);
    setTitle("");
    setDescription("");
    setOpenModal(false);
  };

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (auth?.user?.id && auth?.token) {
      await api.createLeaveDetail({
        title: title,
        description: description,
        startDate: moment(startDate).format(),
        endDate: moment(endDate).format(),
        leaveDayType: props.leaveDayType,
        userId: auth.user.id,
        token: auth.token
      });

      // set value of trigger parent new fetch data
      props.setFetchData(new Date());
    }

    onCloseModal();
  };

  useEffect((): void => {
    if (props?.leaveList && props.leaveList.length > 0) {
      const filter = props.leaveList.filter(
        (item) => item.attributes.status !== "cancel"
      );

      const leaveList = filter.map((item) => {
        let color = "";
        if (item.attributes.status === "approve") {
          color = "green";
        } else {
          color = "yellow";
        }

        return {
          id: item.id,
          title: item.attributes.title,
          start: moment(moment.utc(item.attributes.startDate).valueOf()),
          end: moment(moment.utc(item.attributes.endDate).valueOf()),
          color: color,
          type: "leave",
          allDay: "true"
        };
      });

      setLeaves(leaveList);
    }
  }, [props]);

  return (
    <>
      <Calendar
        selectable
        events={leaves}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        defaultDate={moment().toDate()}
        onSelectSlot={handleSelect}
        eventPropGetter={(event) => {
          const eventData = leaves.find((ot) => ot.id === event.id);
          const backgroundColor = eventData && eventData.color;
          return { style: { backgroundColor } };
        }}
      />

      <Modal
        title={"Create Leave Date"}
        openModal={openModal}
        onClickClose={onCloseModal}
      >
        <form className="flex flex-col p-6 space-y-6" onSubmit={onSubmit}>
          <div className="flex flex-col">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded-lg p-2"
            />
          </div>
          <div className="flex flex-col">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded-lg p-2"
            />
          </div>

          <div className="flex flex-row justify-around">
            <div>
              <label>Start :</label>
              {moment(startDate).format()}
            </div>
            <div>
              <label>End :</label>
              {moment(endDate).format()}
            </div>
          </div>
          {/* <!-- Modal footer --> */}
          <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200">
            <button
              data-modal-toggle="defaultModal"
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              I accept
            </button>
            <button
              data-modal-toggle="defaultModal"
              type="button"
              onClick={onCloseModal}
              className="text-white bg-blue-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
            >
              Decline
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Carendar;
