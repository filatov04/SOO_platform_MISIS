import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks';
import { AuthorizationValue, isAuth, notAuth } from '../../app/features/Auth/AuthSlice';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from '../../shared';

export const WithAuth = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> => {
  const auth = useAppSelector(AuthorizationValue);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getInfo() {
      await axios
        .get('http://localhost:8000/user/info', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        })
        .then(() => {
          //console.log(response.data);
          dispatch(isAuth());
          //setLoading(true);
        })
        .catch((error) => {
          if (error.status === 401 || error.status === 403) {
            dispatch(notAuth());
            localStorage.clear();
          }
        })
        .finally(() => {
          setLoading(true);
        });
    }
    getInfo();
  }, []);

  const AuthenicatedComponent: React.FC<P> = (props: P) => {
    if (!loading) {
      return <Spinner />;
    } else {
      if (!auth) {
        return <Navigate to='/LoginPage' />;
      }
      return <WrappedComponent {...props} />;
    }
  };

  return AuthenicatedComponent;
};
