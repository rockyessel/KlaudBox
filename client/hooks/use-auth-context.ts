import React from 'react';
import { AuthContext } from '@/context/auth-context';

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('Must be used inside an authcontext');
  }

  return context;
};
