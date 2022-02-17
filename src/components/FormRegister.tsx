/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-len */
import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import { IUser } from "../models/user";

const Register: React.FunctionComponent = () => {
  const router = useNavigate();
  const { register, handleSubmit } = useForm();

  const [title, setTitle] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [identificationCard, setidentificationCard] = useState("");
  const [position, setPosition] = useState("");

  const [buttoncolor] = useState("bg-blue-500");
  const url = process.env.REACT_APP_API;
  const userstr = localStorage.getItem("datalocalstorage");
  const user = JSON.parse(userstr!) as IUser;
  const test = user.id;
  const token = user.jwt;
  function handleRegister(): void {
    const registerInfo = {
      title: title,
      firstName: firstName,
      lastName: lastName,
      address: address,
      phoneNumber: phoneNumber,
      identificationCard: identificationCard,
      position: position
    };
    axios
      .put(`${url}/api/users/${test}`, registerInfo, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(() => {
        alert("รอแอดมินอนุมัติ");
        localStorage.removeItem("datalocalstorage");
        router("/");
      })
      .catch((res) => {
        console.log(res);
        alert("Login Failure");
      });
  }
  const onSubmit: SubmitHandler<any> = () => {
    console.log("aaaa");
    handleRegister();
  };

  return (
    <>
      <div className="p-10  h-screen bg-orange-400">
        <div className="text-6xl font-cursive ">กรอกข้อมูลส่วนตัว</div>
        <br />
        <form
          className="bg-orange-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register("title", { required: true })}
            className="shadow appearance-none border border-red-500 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="นาง,นาย,นางสาว"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <br />
          <br />

          <input
            {...register("firstName", { required: true })}
            className="shadow appearance-none border border-red-500 rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="ชื่อ"
            onChange={(e) => setfirstName(e.target.value)}
            value={firstName}
          />
          <br />

          <input
            {...register("lastName", { required: true })}
            className="shadow appearance-none border border-red-500 rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="นามสกุล"
            onChange={(e) => setlastName(e.target.value)}
            value={lastName}
          />
          <br />

          <textarea
            {...register("address", { required: true })}
            className="shadow appearance-none border border-red-500 rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="ที่อยุ่"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
          <br />
          <input
            {...register("phoneNumber", { required: true })}
            className="shadow appearance-none border border-red-500 rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="เบอร์โทรศัพท์"
            onChange={(e) => setphoneNumber(e.target.value)}
            value={phoneNumber}
          />
          <br />
          <input
            {...register("identificationCard", { required: true })}
            className="shadow appearance-none border border-red-500 rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="เลขบัตรประชาชน"
            onChange={(e) => setidentificationCard(e.target.value)}
            value={identificationCard}
          />
          <br />
          <input
            {...register("position", { required: true })}
            className="shadow appearance-none border border-red-500 rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="ตำแหน่ง"
            onChange={(e) => setPosition(e.target.value)}
            value={position}
          />
          <br />
          <button
            type="submit"
            // onClick={() => handleRegister()}
            className={[
              buttoncolor,
              "text-white font-bold py-2 px-4 rounded"
            ].join(" ")}
          >
            ยืนยัน
          </button>
        </form>
      </div>
    </>
  );
};
export default Register;
