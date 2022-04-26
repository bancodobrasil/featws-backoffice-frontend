import React from 'react';
import { Navigate } from 'react-router-dom';
import { hasPermissions, isAuthenticated } from '../../providers/Auth';
import Unauthorized from './Unauthorized';

export interface RequireAuthProps {
  children: JSX.Element;
  permissions?: string[];
  redirect?: string;
  unauthorized?: JSX.Element;
}

const RequireAuth = ({
  children,
  permissions = [],
  redirect = undefined,
  unauthorized = <Unauthorized />,
}: RequireAuthProps) => {
  if (isAuthenticated() && hasPermissions(permissions)) {
    return children;
  }
  if (redirect) {
    return <Navigate to={redirect} replace />;
  }
  return unauthorized;
};

export default RequireAuth;
