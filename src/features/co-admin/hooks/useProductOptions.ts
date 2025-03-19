import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/userApi"; // Ensure the correct import
import { toast } from "sonner";

export const useProductOptions = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["productOptions"], // Unique query key
    queryFn: async () => {
      const response = await userApi.getProducts();
      return response; 
    },
  });

  if (error) {
    toast.error(error.message || "Failed to fetch product options.");
  }

  return { productOptions: data || [], isLoading, error };
};
