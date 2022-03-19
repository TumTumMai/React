import React from "react";
// import Information from "../pages/infomation";
import Leave from "../pages/leave";
import Login from "../pages/login";
import ErrorPage from "../pages/error";
import Register from "pages/register";
import CalendarHoliday from "components/Calendar";

export interface IRoutes {
  name: string;
  path: string;
  element: React.FC;
  requestAuth: boolean;
  requestRole?: "Member" | "Review";
}

const pages: IRoutes[] = [
  {
    name: "information",
    path: "/",
    element: CalendarHoliday,
    requestAuth: true,
    requestRole: "Member"
  },
  {
    name: "leave",
    path: "/leave",
    element: Leave,
    requestAuth: true,
    requestRole: "Member"
  },
  {
    name: "login",
    path: "/login",
    element: Login,
    requestAuth: false
  },
  {
    name: "register",
    path: "/register",
    element: Register,
    requestAuth: true,
    requestRole: "Review"
  },
  // {
  //   name: "calendarHoliday",
  //   path: "/calendar",
  //   element: CalendarHoliday,
  //   requestAuth: true,
  //   requestRole: "Member"
  // },
  {
    name: "error",
    path: "/404",
    element: ErrorPage,
    requestAuth: false
  }
];

export default pages;
