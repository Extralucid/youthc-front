import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuthActions, useUser, useAuthLoading } from '../stores/auth.store';


const AuthRoute = () => {
  const user = useUser();
  const loading = useAuthLoading();
  const { refreshToken } = useAuthActions();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      refreshToken().catch(() => navigate('/login'));
    }
  }, [user, loading, navigate, refreshToken]);
  
  if (loading) return <div>Loading...</div>;
  console.log(user);
  
  return user ? <Outlet /> : null;
};

export default AuthRoute;