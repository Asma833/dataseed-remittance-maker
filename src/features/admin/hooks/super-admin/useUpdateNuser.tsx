import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { nuserApi } from '../../action/nuserApi';

export const useUpdateNuser = () => {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useMutation({
    mutationFn: async ({ data, id }: any) => {
      const payload = {
         user_name: data.userName,
          first_name: data.firstName,
          last_name: data.lastName,
          mobile_number: data.mobileNumber,
          email: data.email,
          password: data.password,
          booking_type: data.bookingType,
          select_agent: data.selectAgent,
          product_type: data.productType
      };

      // Use the correct method from nuserApi, e.g., userCreation
      return await nuserApi.userCreation(payload);
    },
    onSuccess: () => {
      toast.success('Nium user updated successfully');
      navigate(`/admin/user-management/n-user`);
    },
    onError: (error: Error) => {
      const errorMessage =
        error.message || 'Nium user update failed';
      toast.error(errorMessage);
    },
  });

  return { mutate, isLoading: isPending, error };
};
