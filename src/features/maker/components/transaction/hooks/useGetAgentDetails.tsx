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
    queryFn: async () => {
        console.log('Fetching Agent Details for ID:', agentId);
        const res = await getAgentDetails(agentId!);
        console.log('Agent Details API Response:', res);
        return res;
    },
    enabled: !!agentId && !viewMode && !!selectedCurrency, // Only run query if agentId and currency are available and not in view mode
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // Limit retries to avoid excessive API calls
  });

  // Use useMemo to calculate extracted margins - this prevents infinite loops
  const extractedMargins = useMemo(() => {
    // In view mode, use the data from dealData if available
    if (viewMode && dealData && dealData.currencyDetails?.invoiceRateTable) {
      try {
        // Extract margins from the deal data

        // Create a local copy to avoid reference issues
        const invoiceTable = dealData.currencyDetails.invoiceRateTable;

        const margins = {
          nostroMargin: invoiceTable.nostro_charges?.company_rate || '0',
          productMargin: invoiceTable.remittance_charges?.company_rate || '0',
          otherChargesRate: invoiceTable.other_charges?.company_rate || '0',
        };
        return margins;
      } catch (error) {
        console.error('Error extracting margins from deal data:', error);
        return null;
      }
    }
    // Otherwise use the agent details API data
    else if (query.data && selectedCurrency) {
      try {
        const agentData = query.data.commission ? query.data : (query.data.data || query.data);
        console.log('Agent Data for Extraction:', agentData, 'Selected Currency:', selectedCurrency);
        
        if (!agentData || !agentData.commission) {
            console.warn('Agent details missing commission structure during extraction:', agentData);
             return {
                nostroMargin: 0,
                productMargin: 0,
                otherChargesRate: 0,
              };
        }

        const margins = extractAgentMargins(agentData, selectedCurrency);
        console.log('Extracted Margins Result:', margins);
        return margins;
      } catch (error) {
        console.error('Error extracting margins from API data:', error);
        return {
          nostroMargin: 0,
          productMargin: 0,
          otherChargesRate: 0,
        };
      }
    } else {
      return {
        nostroMargin: 0,
        productMargin: 0,
        otherChargesRate: 0,
      };
    }
  }, [selectedCurrency, viewMode, dealData, query.data]);

  return {
    ...query,
    extractedMargins,
  };
};
