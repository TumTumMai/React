import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import GoogleAuthCallback from "./GoogleAuth/GoogleAuthCallback";
import Test from "./components/Calendar";
import Home from "./components/Home";
import Hello from "./components/Hello";
import Register from "./components/FormRegister";

function App(): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/api/auth/google/callback"
          element={<GoogleAuthCallback />}
        ></Route>
        <Route path="/Test" element={<Test />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Hello" element={<Hello />}></Route>
        <Route path="/Calenda" element={<Test />}></Route>

        <Route path="/FormRegister" element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
