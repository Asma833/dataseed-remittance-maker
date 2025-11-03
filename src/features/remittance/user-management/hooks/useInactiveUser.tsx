import { useMutation, useQueryClient } from '@tanstack/react-query';
import { activeInactiveApi } from '../api/activeInactive';
import { toast } from 'sonner';

export const useInactiveUser = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: inactiveUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: (id: string) => activeInactiveApi.inactiveUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getSuperCheckers'] });
      queryClient.invalidateQueries({ queryKey: ['getBranchAgents'] });
    },
  });

  return { inactiveUser, isPending, error };
};
