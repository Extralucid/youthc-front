// components/AuthProvider.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../features/auth/authService';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return children;
};

export default AuthProvider;