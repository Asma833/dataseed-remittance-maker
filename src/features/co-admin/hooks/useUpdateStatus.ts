import { useMutation } from "@tanstack/react-query";
import { userApi } from "../api/userApi";
import { toast } from "sonner";
import { UserUpdateRequest } from "../types/user.type";

export const updateStatusAPI  = () => {
  const { mutate, isPending, error } = useMutation<void, Error, UserUpdateRequest>({
    mutationFn: async (userData:any) => {
      await userApi.userUpdate(userData);
    },
    onSuccess: () => {
      toast.success("User status updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Status update failed");
    }
  });

  return { mutate, isLoading: isPending, error };
};
