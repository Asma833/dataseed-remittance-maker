import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { RootState } from '@/store';
import { getAgentDetails } from '../api/get-agent-by-id.api.';
import { extractAgentMargins, ExtractedMargins } from '../../../utils/extract-agent-margins';

// Hook to fetch agent details using stored agent ID and extract margins for selected currency
export const useGetAgentDetails = (selectedCurrency?: string, viewMode?: boolean, dealData?: any) => {
  const agentId = useSelector((state: RootState) => state.auth.agentId);

  const query = useQuery({
    queryKey: ['agentDetails', agentId],
    queryFn: () => getAgentDetails(agentId!),
    enabled: !!agentId && !viewMode && !!selectedCurrency, // Only run query if agentId and currency are available and not in view mode
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // Limit retries to avoid excessive API calls
  });

  // Use useMemo to calculate extracted margins - this prevents infinite loops
  const extractedMargins = useMemo(() => {
    // In view mode, use the data from dealData if available
    if (viewMode && dealData && dealData.commission) {
      try {
        // Extract margins from the deal data
        console.log('useGetAgentDetails: Using deal data in view mode');

        // Create a local copy to avoid reference issues
        const commission = dealData.commission;

        return {
          nostroMargin: commission.nostro_charges?.all_currency_margin || 0,
          productMargin: commission.tt_charges?.rate || 0,
          otherChargesRate: commission.other_charges?.rate || 0,
        };
      } catch (error) {
        console.error('Error extracting margins from deal data:', error);
        return {
          nostroMargin: 0,
          productMargin: 0,
          otherChargesRate: 0
        };
      }
    }
    // Otherwise use the agent details API data
    else if (query.data && selectedCurrency) {
      try {
        console.log('useGetAgentDetails: Using agent API data');
        const margins = extractAgentMargins(query.data, selectedCurrency);
        console.log('useGetAgentDetails: Extracted margins from API', margins);
        return margins;
      } catch (error) {
        console.error('Error extracting margins from API data:', error);
        return {
          nostroMargin: 0,
          productMargin: 0,
          otherChargesRate: 0
        };
      }
    }
    else {
      console.log('useGetAgentDetails: No data available, returning default values');
      return {
        nostroMargin: 0,
        productMargin: 0,
        otherChargesRate: 0
      };
    }
  }, [selectedCurrency, viewMode, dealData, query.data]);

  return {
    ...query,
    extractedMargins,
  };
};
