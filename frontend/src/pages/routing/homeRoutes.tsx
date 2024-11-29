import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { LoginPage } from '../LoginPage';

export const HomeRoutes = () => {
  const [isAuth, setIsAuth] = useState(false);
  return isAuth ? <Navigate to='/MainPage' /> : <LoginPage />;
};
