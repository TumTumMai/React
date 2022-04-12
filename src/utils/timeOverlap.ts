/* eslint-disable quotes */
import moment from 'moment';
import * as IApiLeave from '../models/leave.api';

interface IEventToBeAdded {
  startTime: string | Date;
  endTime: string | Date;
}

export const checkoverlap = (
  eventToBeAdded: IEventToBeAdded,
  oldEvent: IApiLeave.IData[] | undefined
): boolean => {
  let overlap = false;

  if (oldEvent) {
    oldEvent.forEach((item) => {
      const startOldEvent = item.attributes.startDate;
      const endOldEvent = item.attributes.endDate;

      if (item.attributes.status !== 'cancel') {
        if (
          moment(eventToBeAdded.startTime).isSame(startOldEvent) ||
          moment(eventToBeAdded.endTime).isSame(endOldEvent) ||
          moment(eventToBeAdded.startTime).isSame(endOldEvent) ||
          moment(eventToBeAdded.endTime).isSame(startOldEvent)
        ) {
          overlap = true;
        }

        if (
          moment(eventToBeAdded.startTime).isBetween(
            startOldEvent,
            endOldEvent
          ) ||
          moment(eventToBeAdded.endTime).isBetween(startOldEvent, endOldEvent)
        ) {
          overlap = true;
        }
      }
    });
  }

  return overlap;
};
