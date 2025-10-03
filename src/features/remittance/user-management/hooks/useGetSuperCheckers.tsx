import { useQuery } from '@tanstack/react-query';
import { superCheckerApi } from '../user-management/api/superChecker';
import { SuperCheckerData } from '../user-management/super-checker/table/types';

export const useGetSuperCheckers = () => {
  const { data, isLoading, error, refetch } = useQuery<SuperCheckerData[]>({
    queryKey: ['getSuperCheckers'],
    queryFn: superCheckerApi.getSuperCheckers,
  });

  return { data, isLoading, error, refetch };
};