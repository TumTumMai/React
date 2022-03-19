import React, { useMemo } from "react";
import utils from "utils";
import { IPagination } from "./index";

type PropsType = {
  onClick: React.Dispatch<React.SetStateAction<number>>;
} & IPagination;

const Button: React.FC<PropsType> = (props) => {
  const Pagination = useMemo(() => {
    const paginationRange = utils.pagination.setArray({ ...props });
    const Page = (): JSX.Element[] | undefined => {
      return paginationRange?.map((pageNumber, index) => {
        if (typeof pageNumber === "number") {
          const checkActive = props.page === pageNumber;
          const activeStyle = "bg-indigo-50 border-indigo-500 text-indigo-600";
          const normalStyle =
            "bg-white border-gray-300 text-gray-500 hover:bg-gray-50";

          return (
            <button
              key={index}
              onClick={() => props.onClick(pageNumber)}
              className={`${
                checkActive ? activeStyle : normalStyle
              } z-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
            >
              {pageNumber}
            </button>
          );
        } else {
          return (
            <div className="bg-white border-gray-300 text-gray-500 z-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
              ...
            </div>
          );
        }
      });
    };

    const back = (): void => {
      if (props?.page > 1) {
        props.onClick(props.page - 1);
      }
    };

    const next = (): void => {
      if (!!props?.pageCount && props.pageCount > props.page) {
        props.onClick(props.page + 1);
      }
    };

    if (!!paginationRange && paginationRange?.length > 1) {
      return (
        <div className="bg-white px-4 py-3 flex items-center justify-between sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                {!!props?.page && (
                  <button
                    onClick={() => back()}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Back
                  </button>
                )}
                {!!props?.pageSize && props.pageSize > 0 && Page()}

                {!!props?.pageSize && !!props?.page && (
                  <button
                    onClick={() => next()}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    Next
                  </button>
                )}
              </nav>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }, [props]);

  return Pagination;
};

export default Button;
