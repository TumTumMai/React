/* eslint-disable max-len */
import { useState, FC } from "react";
// import { setCookie } from "nookies";
// import Router from "next/router";

const Navbar: FC = ({ children }) => {
  const [active, setActive] = useState(false);
  const handleClick = (): void => {
    setActive(!active);
  };
  // const [isLogin, setIsLogin] = useState(false);
  // useEffect(() => {
  //   const datatoken = localStorage.getItem("datalocalstorage");
  //   console.log(datatoken);
  //   if (datatoken) {
  //     setIsLogin(true);
  //   }
  // }, []);
  // console.log(WEB_PATHS.CALENDAR);

  return (
    <>
      <nav className="flex items-center flex-wrap bg-green-400 p-3  ">
        <a className="inline-flex items-center p-2 mr-4 ">
          <span className="text-xl text-white font-bold uppercase tracking-wide font-cursive">
            FUNCH
          </span>
        </a>
        <button
          className=" inline-flex p-3 hover:bg-green-600 rounded lg:hidden text-white ml-auto hover:text-white outline-none"
          onClick={handleClick}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div
          className={`${
            active ? "" : "hidden"
          }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
            <a
              href="/Hello"
              className="text-xl  lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white font-cursive"
            >
              Home
            </a>
          </div>
        </div>
      </nav>
      {children}
    </>
  );
};

export default Navbar;
