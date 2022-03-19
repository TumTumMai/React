import moment from "moment";

export const convertTimeToLocal = (time: string | Date): moment.Moment => {
  return moment(time).add(7, "hours");
};

export const convertTimeToUTC = (time: string | Date): moment.Moment => {
  return moment(time).utc();
};

export const setFomat = (time: moment.Moment): string => {
  return time.format("DD-MM-YYYY");
};
