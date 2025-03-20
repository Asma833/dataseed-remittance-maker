import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/core/services/axios/axiosInstance";
import { API } from "@/core/constant/apis";
import { toast } from "sonner";

interface UnassignCheckerParams {
  orderId: string;
  checkerId: string;
}

const useUnassignChecker = () => {
  const queryClient = useQueryClient();
  
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: async (params: UnassignCheckerParams) => {
      const response = await axiosInstance.post(
        "/orders/unassign-checker",
        params
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Checker unassigned successfully");
      console.log("Checker unassigned successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["updateIncident"] });
    },
    onError: (error) => {
      toast.error("Failed to unassign checker");
      console.error("Error unassigning checker:", error);
    },
  });

  const handleUnassign = (orderId: string, checkerId: string) => {
    mutate({
      orderId,
      checkerId,
    });
  };

  return {
    handleUnassign,
    isPending,
    isError,
    isSuccess,
  };
};

export default useUnassignChecker;
