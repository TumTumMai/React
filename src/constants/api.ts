export const baseURL = process.env.REACT_APP_API as string;
const today = new Date();
const onDayOfMonth = new Date(today.getFullYear(), today.getMonth()); // กำหนดวันที่ เป็น 0
const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // กำหนดวันที่ เป็น 0
const convertOnDayOfMonth = onDayOfMonth.toISOString();
const convertOnlastDayOfMonth = lastDayOfMonth.toISOString();
const HolidaysApiMonth = `/api/holiday-details?populate[Holidays][filters][Start_holiday_year][$gte]=${convertOnDayOfMonth}&populate[Holidays][filters][Start_holiday_year][$lte]=${convertOnlastDayOfMonth}"`;

const api = {
  login: baseURL + "/api/connect/google",
  loginCallback: baseURL + "/api/auth/google/callback",
  getProfile: baseURL + "/api/users/me",
  leaveDetails: baseURL + "/api/leave-details",
  getHolidays: baseURL + "/api/holiday-details?populate=Holidays",
  updateProfile: baseURL + "/api/users/",
  getLeaveDetailByApprove:
    baseURL + "/api/leave-details?filters[status][$eq]=approve",
  // getHolidaysByMo: baseURL + "/api/holiday-details?populate[Holidays][filters][Start_holiday_year][$gte]=2022-01-01&populate[Holidays][filters][Start_holiday_year][$lte]=2022-01-30",
  getHolidaysByMonth: baseURL + HolidaysApiMonth
};

export default api;
