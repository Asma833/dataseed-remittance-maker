import { useMutation } from "@tanstack/react-query";
import { useApi } from "../api/useApi";
import { toast } from "sonner";
import { UpdateIncidentRequest } from "../types/updateIncident.type";

export const useUpdateIncident = () => {
  const { mutate, isPending, error } = useMutation<void, Error, UpdateIncidentRequest>({
    mutationFn: async (incidentData: UpdateIncidentRequest) => {
      await useApi.updateIncident(incidentData);
    },
    onSuccess: () => {
      toast.success("Incident updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Incident update failed");
    }
  });

  return { mutate, loading: isPending, error };
};
