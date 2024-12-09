import React from 'react';
import { useAppSelector } from '../../app/hooks/hooks';
import { AuthorizationValue, isAuth, notAuth } from '../../app/features/Auth/AuthSlice';
import { Navigate } from 'react-router-dom';

export const WithAuth = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> => {
  const auth = useAppSelector(AuthorizationValue);

  const AuthenicatedComponent: React.FC<P> = (props: P) => {
    if (!auth) {
      return <Navigate to='/LoginPage' />;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenicatedComponent;
};
