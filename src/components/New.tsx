import * as React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Navbar from "./Navbar";
const localizer = momentLocalizer(moment);
// const calendarStyle = (): void => {
//   return {
//     style: {
//       backgroundColor: "#dcfce7"
//     }
//   };
// };

// interface ITestProps {}
const Test: React.FunctionComponent = () => {
  return (
    <>
      <Navbar></Navbar>
      {/* <div style={{ width: "100%", height: "70px" }}></div> */}
      <div className="bg-green-100 ">
        <Calendar
          localizer={localizer}
          // events={holiday}
          startAccessor="start"
          endAccessor="end"
          style={{
            height: 600
          }}
          eventPropGetter={(event, start, end, isSelected) => ({
            event,
            start,
            end,
            isSelected,
            style: { backgroundColor: "#ff3333" }
          })}
          // dayPropGetter={calendarStyle}
        />
      </div>
    </>
  );
};

// const Test: React.FunctionComponent = () => {
//   return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
// };

export default Test;
