import { useQuery } from '@tanstack/react-query';
import { SuperCheckerData } from '../super-checker/table/types';
import { superCheckerApi } from '../api/superChecker';

export const useGetSuperCheckers = () => {
  const { data, isLoading, error, refetch } = useQuery<SuperCheckerData[]>({
    queryKey: ['getSuperCheckers'],
    queryFn: superCheckerApi.getSuperCheckers,
  });

  return { data, isLoading, error, refetch };
};
