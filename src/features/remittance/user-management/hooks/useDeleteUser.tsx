import { useMutation, useQueryClient } from '@tanstack/react-query';
import { activeInactiveApi } from '../api/activeInactive';

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteUser, isPending, error } = useMutation({
    mutationFn: (id: string) => activeInactiveApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getSuperCheckers'] });
      queryClient.invalidateQueries({ queryKey: ['getBranchAgents'] });
    },
  });

  return { deleteUser, isPending, error };
};