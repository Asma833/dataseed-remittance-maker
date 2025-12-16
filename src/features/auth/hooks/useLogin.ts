import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth.api';
import { setCredentials } from '../store/auth-slice';
import { DEFAULT_ROUTES } from '../../../core/constant/manage-default-routes';
import { LoginResponse, UserRole } from '../types/auth.types';
import type { LoginCredentials } from '../api/auth.api';

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: authApi.loginUser,
    onSuccess: (data) => {
      // Check user role
      const roleName = data.user.roles[0].role_name;
      if (roleName !== 'branch_agent_maker') {
        toast.error('Invalid credentials');
        return;
      }

      // Store user info in Redux
      dispatch(
        setCredentials({
          user: data.user,
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
        })
      );

      // Redirect user to correct route based on role
      const defaultRoute = DEFAULT_ROUTES[roleName as UserRole];
      if (defaultRoute) {
        toast.success('Login successful');
        navigate(defaultRoute);
      } else {
        toast.error('Invalid user role');
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Login failed');
    },
  });

  return { mutate, isLoading: isPending, error };
};
