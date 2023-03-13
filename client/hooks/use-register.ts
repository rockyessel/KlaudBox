import React from 'react';
import { useAuthContext } from './use-auth-context';
import { API_URI, instance } from '@/utils/api-request';

export const useRegister = () => {
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const { dispatch } = useAuthContext();

  const register = async (formData: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      const response = await instance.post(
          `${API_URI}v1/users/register`,
          formData
          );
          
          if (response.data) {
        const { data } = response;
        localStorage.setItem('user', JSON.stringify(data));
    }

    dispatch({ type: 'LOGIN', payload: response.data });
    
    return response.data;
    setIsLoading(false);

    } catch (error) {
      console.log(error);
    }
  };
};
