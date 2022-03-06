import React from "react";
import * as IApiLeave from "models/leave.api";

const LeaveList: React.FC<IApiLeave.Find.IData> = (props): JSX.Element => {
  const styleWatting = "border-yellow-600";
  const styleCancle = "border-red-600";
  const styleApprove = "border-lime-600";
  let style = "";

  if (props.attributes.status === "waiting") {
    style = styleWatting;
  } else if (props.attributes.status === "cancel") {
    style = styleCancle;
  } else {
    style = styleApprove;
  }

  return (
    <div
      className={`${
        props.attributes.status === "waiting"
          ? "hover:border-4 cursor-pointer"
          : ""
      } flex flex-column p-4 justify-between rounded-lg shadow-lg shadow-black-200 border border-solid border-indigo-600`}
    >
      <div className="w-9/12">
        <div className="text-2xl font-bold">{props.attributes.title}</div>
        <p className="text-zinc-500 h-6 truncate">
          {props.attributes.description}{" "}
        </p>
        <div className="mt-4">
          {props.attributes.startDate} - {props.attributes.endDate}
        </div>
      </div>
      <div className="w-3/12 flex justify-end">
        <div
          className={
            "flex justify-center items-center text-sm rounded-full border-solid border-4 " +
            style
          }
          style={{ width: "65px", height: "65px" }}
        >
          {props.attributes.status}
        </div>
      </div>
    </div>
  );
};

export default LeaveList;
