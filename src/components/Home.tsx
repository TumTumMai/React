import * as React from "react";
// import logo from "../logo.svg";
import logo from "../untitled.jpg";

const Home: React.FunctionComponent = () => {
  const url = process.env.REACT_APP_API;
  console.log(process.env.REACT_APP_TEST);
  return (
    <header className="App-header">
      {/* <img src={logo} alt="logo" /> */}
      {/* <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p> */}
      {/* <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a> */}
      <br></br>
      <button
        onClick={() => (window.location.href = `${url}/api/connect/google`)}
      >
        Login Google
      </button>
    </header>
  );
};

export default Home;
