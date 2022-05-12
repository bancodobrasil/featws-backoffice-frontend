import _ from 'lodash';

export const isAuthenticated = () => !!localStorage.getItem('auth-token');

export const hasPermissions = (permissions: string[]) => {
  const storedPermissions = localStorage.getItem('auth-permissions');
  const permissionsArray = JSON.parse(storedPermissions);
  return _.difference(permissions, permissionsArray).length === 0;
};
