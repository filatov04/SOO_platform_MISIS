import React from 'react';
import { routesData } from './routesData';
import { RouteObject, useRoutes } from 'react-router-dom';
import { AppLayout } from '../AppLayout';

export const useAppRoutes = (): React.ReactElement | null => {
  const routes = routesData();
  const buildRoutes = (): RouteObject[] => {
    return [
      {
        caseSensitive: false,
        path: '/',
        element: <AppLayout />,
        children: routes
      }
    ];
  };
  return useRoutes(buildRoutes());
};
