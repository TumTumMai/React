import React from "react";

interface IProps {
  title: string;
  openModal: boolean;
  onClickClose: () => void;
}

const Modal: React.FC<IProps> = (props): JSX.Element => {
  return (
    <div
      className={`${
        props.openModal ? "" : "hidden"
      } flex overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0`}
    >
      <div className="relative m-auto px-4 w-full max-w-2xl h-full md:h-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow-lg">
          {/* <!-- Modal header --> */}
          <div className="flex justify-between items-start p-5 rounded-t border-b">
            <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl">
              {props.title}
            </h3>
            <button
              type="button"
              onClick={props.onClickClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
            >
              X
            </button>
          </div>
          {/* <!-- Modal body --> */}
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
