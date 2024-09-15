import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../../components/Loader/Loader';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { data, isLoading, isError } = useAuth();

  if (isLoading) {
    return <Loader/>;
  }
  
  if (isError || !data) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;