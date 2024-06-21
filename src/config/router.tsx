import React from 'react';
import Home from '../pages/Home';
import Student from '../pages/Student';
import Payment from '../pages/Payment';
import Setting from '../pages/Setting';
import NotFound from '../pages/404';
import RootLayout from '../layouts/RootLayout';
import {
  createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/students',
        element: <Student />,
      },
      {
        path: '/payment',
        element: <Payment />,
      },
      {
        path: '/settings',
        element: <Setting />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
export default router;
