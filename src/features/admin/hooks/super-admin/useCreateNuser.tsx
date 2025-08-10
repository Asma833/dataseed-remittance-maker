import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { NuserPayload } from '../../types/user.types';
import { nuserApi } from '../../action/nuserApi';

export const useCreateNuser = ({ onCreateSuccess }: { onCreateSuccess: (data: NuserPayload) => void }
) => {
  const mapFormDataToApiPayload = async (formData: NuserPayload): Promise<NuserPayload> => {
    return {
      user_name: formData.user_name,
      first_name: formData.first_name,
      last_name: formData.last_name,
      mobile_number: formData.mobile_number,
      email: formData.email,
      password: formData.password,
      booking_type: formData.booking_type,
      select_agent: formData.select_agent,
      product_type: formData.product_type,
    };
  };

  

  const { mutate, isPending, error } = useMutation<NuserPayload, Error, NuserPayload>({
    mutationFn: async (userData: NuserPayload) => {
      const apiPayload = await mapFormDataToApiPayload(userData);
      await nuserApi.userCreation(apiPayload);
      return apiPayload;
    },
    onSuccess: (data: NuserPayload) => {
      toast.success('User created successfully');
      onCreateSuccess(data);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'User creation failed');
    },
  });

  return { mutate, isLoading: isPending, error };
};
  

