/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-len */
import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import api from '../constants/api';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'redux/authReducers/action';
import { IAllReducers } from 'redux/store';
import { LoadActionType } from 'redux/loadReducers/type';

const Register: React.FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [title, setTitle] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [address, setAddress] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [identificationCard, setidentificationCard] = useState('');
  const dispatch = useDispatch();

  const [buttoncolor] = useState('bg-blue-500');
  const auth = useSelector((state: IAllReducers) => state.auth);

  if (auth.user?.title !== '-') {
    dispatch(logout());
  }

  function handleRegister(): void {
    const registerInfo = {
      title: title,
      firstName: firstName,
      lastName: lastName,
      address: address,
      phoneNumber: phoneNumber,
      identificationCard: identificationCard,
      birthDate: birthDate
    };
    dispatch({ type: LoadActionType.LOADING_ON });

    axios
      .put(`${api.updateProfile}${auth.user?.id}`, registerInfo, {
        headers: {
          Authorization: 'Bearer ' + auth.token
        }
      })

      .then(() => {
        alert('รอแอดมินอนุมัติ');

        dispatch(logout());
      })
      .catch((res) => {
        console.log(res);
        alert('Login Failure');
      });
  }
  setTimeout(() => {
    dispatch({ type: LoadActionType.LOADING_OFF });
  }, 100);
  const onSubmit: SubmitHandler<any> = () => {
    console.log('aaaa');
    handleRegister();
  };

  return (
    <>
      <div className="p-10  h-screen bg-gradient-to-br from-white to-slate-400">
        <div className=" text-6xl font-cursive flex justify-center	 ">
          กรอกข้อมูลส่วนตัว
        </div>
        <br />
        <form
          className="w-full max-w-lg flex flex-col content-center m-auto bg-gradient-to-br from-white shadow-md rounded px-8 pt-6 pb-8 mb-4 "
          onSubmit={handleSubmit(onSubmit, () => {})}
        >
          <input
            className={
              errors.title
                ? ' shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                : ' shadow appearance-none border border-black rounded   py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            }
            {...register('title', {
              required: 'กรอกช่องนี้ด้วย',
              pattern: {
                value: /[A-Za-z,ก-๙]/,
                message: 'ห้ามกรอกตัวเลข'
              }
            })}
            type="text"
            placeholder="นาง,นาย,นางสาว"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <p className="text-red-500 text-xs italic">{errors.title?.message}</p>
          <input
            className={
              errors.firstName
                ? ' shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                : ' shadow appearance-none border border-black rounded   py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            }
            {...register('firstName', {
              required: 'กรอกช่องนี้ด้วย',
              pattern: {
                value: /[A-Za-z,ก-๙]/,
                message: 'ห้ามกรอกตัวเลข'
              }
            })}
            type="text"
            placeholder="ชื่อ"
            onChange={(e) => setfirstName(e.target.value)}
            value={firstName}
          />
          <p className="text-red-500 text-xs italic">
            {errors.firstName?.message}
          </p>
          <input
            className={
              errors.lastName
                ? ' shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                : ' shadow appearance-none border border-black rounded   py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            }
            {...register('lastName', {
              required: 'กรอกช่องนี้ด้วย',
              pattern: {
                value: /[A-Za-z,ก-๙]/,
                message: 'ห้ามกรอกตัวเลข'
              }
            })}
            type="text"
            placeholder="นามสกุล"
            onChange={(e) => setlastName(e.target.value)}
            value={lastName}
          />
          <p className="text-red-500 text-xs italic">
            {errors.lastName?.message}
          </p>
          <textarea
            className={
              errors.address
                ? ' shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                : ' shadow appearance-none border border-black rounded   py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            }
            {...register('address', { required: 'กรอกช่องนี้ด้วย' })}
            placeholder="ที่อยุ่"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
          <p className="text-red-500 text-xs italic">
            {errors.address?.message}
          </p>
          <input
            className={
              errors.phoneNumber
                ? ' shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                : ' shadow appearance-none border border-black rounded   py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            }
            {...register('phoneNumber', {
              required: 'กรอกช่องนี้ด้วย',
              pattern: {
                value: /[0-9]/,
                message: 'กรอกด้วยตัวเลขเท่านั้น'
              }
            })}
            type="text"
            placeholder="เบอร์โทรศัพท์"
            onChange={(e) => setphoneNumber(e.target.value)}
            value={phoneNumber}
          />
          <p className="text-red-500 text-xs italic">
            {errors.phoneNumber?.message}
          </p>
          <input
            className={
              errors.identificationCard
                ? ' shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                : ' shadow appearance-none border border-black rounded   py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            }
            {...register('identificationCard', {
              required: 'กรอกช่องนี้ด้วย',
              pattern: {
                value: /[A-Za-z,0-9]/,
                message: 'ห้ามกรอกภาษาไทย'
              }
            })}
            // className="shadow appearance-none border border-black rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="เลขบัตรประชาชน"
            onChange={(e) => setidentificationCard(e.target.value)}
            value={identificationCard}
          />
          <p className="text-red-500 text-xs italic">
            {errors.identificationCard?.message}
          </p>
          <input
            className={
              errors.birthDate
                ? ' shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                : ' shadow appearance-none border border-black rounded   py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            }
            {...register('birthDate', { required: 'กรอกช่องนี้ด้วย' })}
            type="date"
            placeholder="วันเกิด"
            onChange={(e) => setBirthDate(e.target.value)}
            value={birthDate}
          />
          <p className="text-red-500 text-xs italic">
            {errors.birthDate?.message}
          </p>
          <br />
          <button
            type="submit"
            // onClick={() => handleRegister()}
            className={[
              buttoncolor,
              'text-white font-bold py-2 px-4 rounded'
            ].join(' ')}
          >
            ยืนยัน
          </button>
        </form>
      </div>
    </>
  );
};
export default Register;
