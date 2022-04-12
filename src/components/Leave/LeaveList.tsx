/* eslint-disable quotes */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { IAllReducers } from 'redux/store';
import { LoadActionType } from 'redux/loadReducers/type';
import { useForm, SubmitHandler } from 'react-hook-form';
import Modal from 'components/Modal';
import * as IApiLeave from 'models/leave.api';
import api from 'http/leave.api';
import utils from 'utils';

type PropsType = {
  leaveListAll?: IApiLeave.IData[];
  setFetchData: React.Dispatch<React.SetStateAction<Date>>;
} & IApiLeave.IData;

interface IFormData {
  title: string;
}

const LeaveList: React.FC<PropsType> = (props): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [disable, setDisable] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [status, setStatus] = useState<IApiLeave.LeaveDayStatusType>('waiting');
  const [description, setDescription] = useState<string>(
    props.attributes.description
  );
  const [startDate, setStartDate] = useState<moment.Moment>(
    moment(props.attributes.startDate)
  );
  const [endDate, setEndDate] = useState<moment.Moment>(
    moment(props.attributes.endDate)
  );
  const [openModal, setOpenModal] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormData>();
  const dispatch = useDispatch();
  const auth = useSelector((state: IAllReducers) => state.auth);

  const styleWatting = 'border-yellow-600';
  const styleCancle = 'border-red-600';
  const styleApprove = 'border-lime-600';
  const style = {
    status: '',
    button: ''
  };

  // set style status
  if (props.attributes.status === 'waiting') {
    style.status = styleWatting;
  } else if (props.attributes.status === 'cancel') {
    style.status = styleCancle;
  } else {
    style.status = styleApprove;
  }

  // set style button
  if (props.attributes.status === 'waiting') {
    style.button =
      'hover:transition ease-in-out delay-0 hover:-translate-y-1 hover:scale-110 duration-300 cursor-pointer';
  }

  const onClick = (): void => {
    setOpenModal(true);
  };

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    if (e.target.value === 'waiting' || e.target.value === 'cancel') {
      setStatus(e.target.value);
    }
  };

  const onCloseModal = (): void => {
    setStatus(props.attributes.status);
    setTitle(props.attributes.title);
    setDescription(props.attributes.description);
    setStartDate(moment(props.attributes.startDate));
    setEndDate(moment(props.attributes.endDate));
    setOpenModal(false);
    setErrorMessage('');
  };

  const onSubmit: SubmitHandler<any> = handleSubmit(async (): Promise<void> => {
    dispatch({ type: LoadActionType.LOADING_ON });
    setErrorMessage('');

    const newEvent = {
      startTime: startDate.format(),
      endTime: endDate.format()
    };

    // pop data like data in component
    const leaves = props.leaveListAll?.filter((item) => item.id !== props.id);

    if (
      !!auth.token &&
      auth?.user?.id &&
      auth.token.length > 0 &&
      !utils.checkoverlap(newEvent, leaves)
    ) {
      const data = {
        id: props.id,
        title: title,
        description: description,
        status: status,
        startDate: startDate.format(),
        endDate: endDate.format(),
        token: auth.token,
        userId: auth.user.id
      };

      const res = await api.updateLeaveDetail(data);

      setTimeout(() => {
        dispatch({ type: LoadActionType.LOADING_OFF });
      }, 100);

      if (res?.data) {
        props.setFetchData(new Date());
        onCloseModal();
      } else if (res?.error) {
        setErrorMessage(utils.setMessageError(res.error));
      }
    } else {
      setErrorMessage(
        'วันลาที่คุณเลือกได้มีการลาไว้แล้ว กรุณาเลือกวันหยุดใหม่'
      );

      setTimeout(() => {
        dispatch({ type: LoadActionType.LOADING_OFF });
      }, 200);
    }
  });

  useEffect(() => {
    if (props.attributes.status !== 'waiting') {
      setDisable(true);
    } else {
      setDisable(false);
    }

    setStatus(props.attributes.status);
    setTitle(props.attributes.title);
    setDescription(props.attributes.description);
    setStartDate(moment(props.attributes.startDate));
    setEndDate(moment(props.attributes.endDate));
  }, [props.attributes]);

  useEffect(() => {
    if (startDate.valueOf() > endDate.valueOf()) {
      setStartDate(endDate);
      setEndDate(startDate);
    }
  }, [startDate, endDate]);

  return (
    <>
      <button
        onClick={onClick}
        disabled={disable}
        className={`${style.button} w-full flex flex-column p-4 justify-between rounded-lg shadow-lg shadow-black-200 border border-solid border-indigo-600`}
      >
        <div className="w-9/12">
          <div className="text-2xl font-bold text-left">
            {props.attributes.title}
          </div>
          <p className="text-zinc-500 h-6 truncate text-left">
            {props.attributes.description}{' '}
          </p>
          <div className="mt-4">
            {`${utils.time.setFomat(
              utils.time.convertTimeToLocal(props.attributes.startDate)
            )}
             - 
            ${utils.time.setFomat(
              utils.time.convertTimeToLocal(props.attributes.endDate)
            )}`}
          </div>
        </div>
        <div className="w-3/12 flex justify-end">
          <div
            className={
              'flex justify-center items-center text-sm rounded-full border-solid border-4 ' +
              style.status
            }
            style={{ width: '65px', height: '65px' }}
          >
            {props.attributes.status}
          </div>
        </div>
      </button>
      <Modal title={'Update'} openModal={openModal} onClickClose={onCloseModal}>
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
          <div className="flex">
            <div className="mb-3 xl:w-96">
              <label>Status</label>
              <select
                value={status}
                onChange={(e) => onSelect(e)}
                className="form-select appearance-none
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding bg-no-repeat
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              >
                <option value="waiting">Waiting</option>
                <option value="cancel">Cancel</option>
              </select>
            </div>
          </div>
          <div className="flex flex-row justify-around">
            <div>
              <label>Start :</label>
              <input
                type="date"
                value={startDate.format('YYYY-MM-DD')}
                onChange={(e) =>
                  setStartDate(utils.time.convertTimeToLocal(e.target.value))
                }
              />
            </div>
            <div>
              <label>End :</label>
              <input
                type="date"
                value={endDate.format('YYYY-MM-DD')}
                onChange={(e) =>
                  setEndDate(utils.time.convertTimeToLocal(e.target.value))
                }
              />
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

export default LeaveList;
