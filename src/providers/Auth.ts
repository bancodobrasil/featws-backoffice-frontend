import _ from 'lodash';

export const isAuthenticated = () => {
  return localStorage.getItem('auth-token') ? true : false;
};

export const hasPermissions = (permissions: string[]) => {
  const storedPermissions = localStorage.getItem('auth-permissions');
  const permissionsArray = JSON.parse(storedPermissions);
  return _.difference(permissions, permissionsArray).length === 0;
};
