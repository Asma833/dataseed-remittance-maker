import { useMutation } from '@tanstack/react-query';
import { getPresignedUrls } from '../api/documents';

export const useGetPresignedUrls = () => {
  return useMutation({
    mutationFn: (s3Keys: string[]) => getPresignedUrls(s3Keys),
  });
};
