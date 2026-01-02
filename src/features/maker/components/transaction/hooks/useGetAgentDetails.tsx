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
    enabled: !!agentId && !viewMode, // Only run query if agentId is available and not in view mode
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const extractedMargins = useMemo(() => {
    // In view mode, use the data from dealData if available
    if (viewMode && dealData && dealData.currencyDetails?.invoiceRateTable) {
      try {
        // Extract margins from the deal data
        console.log('useGetAgentDetails: Using deal data in view mode');
        
        // Create a local copy to avoid reference issues
        const invoiceTable = dealData.currencyDetails.invoiceRateTable;
        
        const margins = {
          nostroMargin: invoiceTable.nostro_charges?.company_rate || '0',
          productMargin: invoiceTable.remittance_charges?.company_rate || '0',
          otherChargesRate: invoiceTable.other_charges?.company_rate || '0',
        };
        
        console.log('useGetAgentDetails: Extracted margins from deal data', margins);
        return margins;
      } catch (error) {
        console.error('Error extracting margins from deal data:', error);
        return null;
      }
    }
    
    // Otherwise use the agent details API data
    if (query.data && selectedCurrency) {
      try {
        console.log('useGetAgentDetails: Using agent API data');
        const margins = extractAgentMargins(query.data, selectedCurrency);
        console.log('useGetAgentDetails: Extracted margins from API', margins);
        return margins;
      } catch (error) {
        console.error('Error extracting margins from API data:', error);
        return null;
      }
    }
    
    console.log('useGetAgentDetails: No data available, returning null');
    return null;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.data, selectedCurrency, viewMode]); // Remove dealData from dependencies to prevent infinite loops

  return {
    ...query,
    extractedMargins,
  };
};
