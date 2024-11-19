import React from 'react';
import { LoginPage } from '../LoginPage';
import { MainPage } from '../MainPage/MainPage';
import { FloorPage } from '../FloorPage/FloorPage';
import { HomeRoutes } from './homeRoutes';

export const routesData = () => {
  return [
    {
      path: '/',
      element: <HomeRoutes />
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/mainPage',
      element: <MainPage />
    },
    {
      path: '/floorPage',
      element: <FloorPage />
    }
  ];
};
