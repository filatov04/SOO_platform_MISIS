import React from 'react';
import { LoginPage } from '../LoginPage';
import { MainPage } from '../MainPage/MainPage';
import { FloorPage } from '../FloorPage/FloorPage';

export const routesData = () => {
  return [
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/MainPage',
      element: <MainPage />
    },
    {
      path: '/FloorPage',
      element: <FloorPage />
    }
  ];
};
