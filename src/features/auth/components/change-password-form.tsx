import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import * as z from 'zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ROUTES } from '@/core/constant/route-paths';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import axiosInstance from '@/core/services/axios/axios-instance';
import { API } from '@/core/constant/apis';

interface ChangePasswordFormProps {
  token?: string;
  isResetPassword?: boolean;
}

const formSchema = z
  .object({
    currentPassword: z.string().optional(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ token, isResetPassword = false }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...(isResetPassword ? {} : { currentPassword: '' }),
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);

      if (!isResetPassword && !values.currentPassword) {
        toast.error('Current password is required');
        return;
      }

      if (isResetPassword && token) {
        // Prepare payload for reset password
        const resetPayload = {
          token,
          newPassword: values.password,
          confirmPassword: values.confirmPassword,
        };

        // Make API call to reset password
        await axiosInstance.post(`${API.AUTH.CHANGE_PASSWORD}`, resetPayload);

        toast.success('Password has been reset successfully!');
        navigate(ROUTES.AUTH.LOGIN);
      } else {
        // Prepare payload for change password
        const changePayload = {
          currentPassword: values.currentPassword,
          newPassword: values.password,
          confirmPassword: values.confirmPassword,
        };

        // Make API call to change password
        await axiosInstance.post(`${API.AUTH.CHANGE_PASSWORD}`, changePayload);

        toast.success('Password changed successfully!');
      }
    } catch (error) {
      console.error('Password change error:', error);

      let errorMessage = 'Failed to change password. Please try again.';
      if (axios.isAxiosError(error) && error.response) {
        // Extract error message from API response if available
        errorMessage = error.response.data?.message || errorMessage;
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {!isResetPassword && (
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter current password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter new password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Confirm your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Processing...' : isResetPassword ? 'Reset Password' : 'Change Password'}
        </Button>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
