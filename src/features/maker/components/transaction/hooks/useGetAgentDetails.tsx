import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { RootState } from '@/store';
import { getAgentDetails } from '../api/get-agent-by-id.api.';
import { extractAgentMargins, ExtractedMargins } from '../../../utils/extract-agent-margins';

// Hook to fetch agent details using stored agent ID and extract margins for selected currency
export const useGetAgentDetails = (selectedCurrency?: string) => {
  const agentId = useSelector((state: RootState) => state.auth.agentId);

  const query = useQuery({
    queryKey: ['agentDetails', agentId],
    queryFn: () => getAgentDetails(agentId!),
    enabled: !!agentId, // Only run query if agentId is available
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const extractedMargins = useMemo(() => {
    if (query.data && selectedCurrency) {
      return extractAgentMargins(query.data, selectedCurrency);
    }
    return null;
  }, [query.data, selectedCurrency]);

  return {
    ...query,
    extractedMargins,
  };
};
