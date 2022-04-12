/* eslint-disable quotes */
import moment from 'moment';
import { useState } from 'react';
import { ToolbarProps, Event } from 'react-big-calendar';

const Toolbar: React.FC<ToolbarProps<Event, object>> = (props): JSX.Element => {
  const [viewState] = useState('month');

  const goToBack = (): void => {
    const view = viewState;
    const mDate = props.date;
    let newDate;
    if (view === 'month') {
      newDate = new Date(mDate.getFullYear(), mDate.getMonth() - 1, 1);
    } else if (view === 'week') {
      newDate = new Date(
        mDate.getFullYear(),
        mDate.getMonth(),
        mDate.getDate() - 7,
        1
      );
    } else {
      newDate = new Date(
        mDate.getFullYear(),
        mDate.getMonth(),
        mDate.getDate() - 1,
        1
      );
    }
    props.onNavigate('PREV', newDate);
  };

  const goToNext = (): void => {
    const view = viewState;
    const mDate = props.date;
    let newDate;
    if (view === 'month') {
      newDate = new Date(mDate.getFullYear(), mDate.getMonth() + 1, 1);
    } else if (view === 'week') {
      newDate = new Date(
        mDate.getFullYear(),
        mDate.getMonth(),
        mDate.getDate() + 7,
        1
      );
    } else {
      newDate = new Date(
        mDate.getFullYear(),
        mDate.getMonth(),
        mDate.getDate() + 1,
        1
      );
    }
    props.onNavigate('NEXT', newDate);
  };

  const setMonth = (): JSX.Element => {
    const date = moment(props.date);
    const month = date.format('MMMM');

    return <span>{month}</span>;
  };

  return (
    <div className="w-full flex justify-between items-center p-4 border rounded-t-lg bg-indigo-600">
      <button
        className="w-8 h-8 border rounded-full text-white"
        onClick={goToBack}
      >
        {'<'}
      </button>

      <div className="text-white">{setMonth()}</div>

      <button
        className="w-8 h-8 border rounded-full text-white items-center"
        onClick={goToNext}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Toolbar;
