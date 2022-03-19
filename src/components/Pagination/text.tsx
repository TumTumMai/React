import React from "react";
import { IPagination } from "../Pagination/index";

const Text: React.FC<IPagination> = (props) => {
  const indexFirst = props.pageSize * props.page - (props.pageSize - 1);
  const indexEnd = props.pageSize * props.page;

  if (props.total > 0) {
    return (
      <p className="text-sm text-gray-700">
        Showing <span className="font-medium"> {indexFirst}</span> to{" "}
        <span className="font-medium">
          {props.total > indexEnd ? indexEnd : props.total}
        </span>{" "}
        of <span className="font-medium">{props.total}</span> results
      </p>
    );
  } else {
    return null;
  }
};

export default Text;
