import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { LoginPage } from '../LoginPage';
import { useAppSelector } from '../../app/hooks/hooks';
import { AuthorizationValue } from '../../app/features/Auth/AuthSlice';

export const HomeRoutes = () => {
  const auth = useAppSelector(AuthorizationValue);
  return auth ? <Navigate to='/MainPage' /> : <LoginPage />;
};
