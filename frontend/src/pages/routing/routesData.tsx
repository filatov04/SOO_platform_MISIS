import React from 'react';
import { LoginPage } from '../LoginPage';
import { MainPage } from '../MainPage';
import { FloorPage } from '../FloorPage';
import { HomeRoutes } from './homeRoutes';
import { WithAuth } from './withAuth';
import { WithoutAuth } from './withoutAuth';
import { CalendarPage } from '../CalendarPage';
import { AllUserPage } from '../AllUserPage';

export const routesData = () => {
  return [
    {
      path: '/',
      element: <HomeRoutes />
    },
    // {
    //   path: '*',
    //   element: <UndefinedRoute />
    // },
    {
      path: '/LoginPage',
      element: React.createElement(WithoutAuth(LoginPage))
    },
    {
      path: '/MainPage',
      element: React.createElement(WithAuth(MainPage))
    },
    {
      path: '/FloorPage',
      element: React.createElement(WithAuth(FloorPage))
    },
    {
      path: '/CalendarPage',
      element: React.createElement(WithAuth(CalendarPage))
    },
    {
      path: '/AllUserPage',
      element: React.createElement(WithAuth(AllUserPage))
    }
  ];
};
