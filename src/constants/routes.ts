/* eslint-disable quotes */
import React from 'react';
import Leave from '../pages/leave';
import Login from '../pages/login';
import ErrorPage from '../pages/error';
import Register from 'pages/register';
import Information from 'pages/infomation';

export interface IRoutes {
  name: string;
  path: string;
  element: React.FC;
  requestAuth: boolean;
  requestRole?: 'Member' | 'Review';
}

const pages: IRoutes[] = [
  {
    name: 'information',
    path: '/',
    element: Information,
    requestAuth: true,
    requestRole: 'Member'
  },
  {
    name: 'leave',
    path: '/leave',
    element: Leave,
    requestAuth: true,
    requestRole: 'Member'
  },
  {
    name: 'login',
    path: '/login',
    element: Login,
    requestAuth: false
  },
  {
    name: 'register',
    path: '/register',
    element: Register,
    requestAuth: true,
    requestRole: 'Review'
  },

  {
    name: 'error',
    path: '/404',
    element: ErrorPage,
    requestAuth: false
  }
];

export default pages;
