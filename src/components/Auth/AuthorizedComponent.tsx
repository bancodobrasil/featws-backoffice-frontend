import React from 'react';
import { hasPermissions, isAuthenticated } from '../../providers/Auth';

export interface AuthorizedComponentProps {
  children: JSX.Element;
  permissions?: string[];
  unauthorized?: JSX.Element;
}

const AuthorizedComponent = ({
  children,
  permissions = [],
  unauthorized = null,
}: AuthorizedComponentProps) => {
  if (isAuthenticated() && hasPermissions(permissions)) {
    return children;
  }
  return unauthorized;
};

export default AuthorizedComponent;
