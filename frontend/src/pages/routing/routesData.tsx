import React from 'react';
import { LoginPage } from '../LoginPage';
import { MainPage } from '../MainPage/MainPage';
import { FloorPage } from '../FloorPage/FloorPage';
import { HomeRoutes } from './homeRoutes';
import { WithAuth } from './withAuth';
import { WithoutAuth } from './withoutAuth';
import { UndefinedRoute } from './undefinedRoute';

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
    }
  ];
};
