/* eslint-disable quotes */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { IAllReducers } from 'redux/store';
import { LoadActionType } from 'redux/loadReducers/type';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import Modal from 'components/Modal';
import Toolbar from './Toolbar';
import HeaderMonth from './HeaderMonth';
import api from 'http/leave.api';
import * as IApiLeave from 'models/leave.api';
import utils from 'utils';

interface IParamsSelectCarenda {
  start: string | Date;
  end: string | Date;
  slots: Date[] | string[];
  action: 'select' | 'click' | 'doubleClick';
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

interface IFormData {
  title: string;
}

interface IProps {
  leaveList?: IApiLeave.IData[];
  leaveDayType: IApiLeave.LeaveDayType;
  setFetchData: React.Dispatch<React.SetStateAction<Date>>;
}

const Carendar: React.FC<IProps> = (props): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [leaves, setLeaves] = useState<ILeave[]>([]);
  const [startDate, setStartDate] = useState<moment.Moment>();
  const [endDate, setEndDate] = useState<moment.Moment>();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalOverlap, setOpenModalOverlap] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormData>();
  const localizer = momentLocalizer(moment);
  const dispatch = useDispatch();
  const auth = useSelector((state: IAllReducers) => state.auth);

  const handleSelect = ({ start, end }: IParamsSelectCarenda): void => {
    const startDateMoment = utils.time.convertTimeToLocal(start);
    const endDateMoment = utils.time
      .convertTimeToLocal(end)
      .subtract(1, 'days');

    const newEvent = {
      startTime: startDateMoment.format(),
      endTime: endDateMoment.format()
    };
    const overlap = utils.checkoverlap(newEvent, props.leaveList);

    if (overlap) {
      setOpenModalOverlap(true);
    } else {
      setStartDate(startDateMoment);
      setEndDate(endDateMoment);
      setOpenModal(true);
    }
  };

  const onCloseModal = (): void => {
    setStartDate(undefined);
    setEndDate(undefined);
    setTitle('');
    setDescription('');
    setErrorMessage('');
    setOpenModal(false);
    setOpenModalOverlap(false);
  };

  const onSubmit: SubmitHandler<any> = handleSubmit(async (): Promise<void> => {
    dispatch({ type: LoadActionType.LOADING_ON });
    setErrorMessage('');

    if (auth?.user?.id && auth?.token && !!startDate && !!endDate) {
      const res = await api.createLeaveDetail({
        title: title,
        description: description,
        startDate: startDate.format(),
        endDate: endDate.format(),
        leaveDayType: props.leaveDayType,
        userId: auth.user.id,
        token: auth.token
      });

      setTimeout(() => {
        dispatch({ type: LoadActionType.LOADING_OFF });
      }, 100);

      if (res?.data && res.data !== null) {
        onCloseModal();
        // set value of trigger parent new fetch data
        props.setFetchData(new Date());
      } else if (res?.error) {
        setErrorMessage(utils.setMessageError(res.error));
      }
    }
  });

  useEffect((): void => {
    if (props?.leaveList && props.leaveList.length > 0) {
      const filter = props.leaveList.filter(
        (item) => item.attributes.status !== 'cancel'
      );

      const leaveList = filter.map((item) => {
        let color = '';
        if (item.attributes.status === 'approve') {
          color = 'green';
        } else {
          color = 'yellow';
        }

        return {
          id: item.id,
          title: item.attributes.title,
          start: utils.time.convertTimeToLocal(item.attributes.startDate),
          end: utils.time.convertTimeToLocal(item.attributes.endDate),
          color: color,
          type: 'leave',
          allDay: 'true'
        };
      });

      setLeaves(leaveList);
    }
  }, [props]);

  return (
    <>
      <Calendar
        selectable
        views={['month']}
        events={leaves}
        localizer={localizer}
        defaultDate={moment().toDate()}
        onSelectSlot={handleSelect}
        dayLayoutAlgorithm="no-overlap"
        components={{
          toolbar: Toolbar,
          month: {
            header: HeaderMonth
          }
        }}
        eventPropGetter={(event) => {
          if (!!leaves && leaves.length > 0) {
            const eventData = leaves.find((ot) => ot.id === event.id);
            const backgroundColor = eventData && eventData.color;
            return { style: { backgroundColor } };
          }
          return {};
        }}
      />

      <Modal
        title={'Error'}
        openModal={openModalOverlap}
        onClickClose={onCloseModal}
      >
        <div className="flex flex-col p-6 space-y-6">
          วันลาที่คุณเลือกได้มีการลาไว้แล้ว กรุณาเลือกวันหยุดใหม่
        </div>
      </Modal>

      <Modal
        title={'Create Leave Date'}
        openModal={openModal}
        onClickClose={onCloseModal}
      >
        <form className="flex flex-col p-6 space-y-6" onSubmit={onSubmit}>
          <div className="flex flex-col">
            <label>Title</label>
            <input
              {...register('title', { required: 'Title is a required field' })}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`${
                errors?.title ? 'border-rose-600' : ''
              } border rounded-lg p-2`}
            />
            <p className="text-rose-600">{errors.title?.message}</p>
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
              {!!startDate && utils.time.setFomat(startDate)}
            </div>
            <div>
              <label>End :</label>
              {!!endDate && utils.time.setFomat(endDate)}
            </div>
          </div>
          {!!errorMessage && errorMessage.length > 0 && (
            <div className="flex justify-center text-rose-600">
              {errorMessage}
            </div>
          )}
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
