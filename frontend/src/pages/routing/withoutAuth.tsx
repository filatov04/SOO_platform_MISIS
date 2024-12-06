import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks';
import { AuthorizationValue, isAuth, notAuth } from '../../app/features/Auth/AuthSlice';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

export const WithoutAuth = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> => {
  const auth = useAppSelector(AuthorizationValue);

  const NotAuthenicatedComponent: React.FC<P> = (props: P) => {
    if (auth) {
      return <Navigate to='/MainPage' />;
    }

    return <WrappedComponent {...props} />;
  };

  return NotAuthenicatedComponent;
};
