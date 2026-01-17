import { useGetDealDetails } from '../../hooks/useGetDealDetails';
import { mapDealDetailsApiToFormInput } from '../../utils/transaction-utils';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import CreateTransactionForm from './create-transaction-form/form/create-transaction-form';
import { AccordionStateProvider } from './create-transaction-form/context/accordion-control-context';

const Transactions = () => {
  const location = useLocation();
  const stateInitialData = location.state?.initialData;
  const dealId = location.state?.dealId;
  const paymentData = location.state?.paymentData;

  const { data: dealDetails, isLoading } = useGetDealDetails(!stateInitialData && dealId ? dealId : undefined);

  const resolvedInitialData = useMemo(() => {
    if (stateInitialData) return stateInitialData;

    if (dealDetails && dealId) {
      const mapped = mapDealDetailsApiToFormInput(dealDetails, dealId);
      if (paymentData) {
        mapped.paymentDetails = paymentData;
      }
      return mapped;
    }
    return undefined;
  }, [stateInitialData, dealDetails, dealId, paymentData]);

  if (isLoading) {
    return <div className="p-8 text-center">Loading transaction details...</div>;
  }

  return (
    <AccordionStateProvider key={resolvedInitialData?.deal_booking_id || 'create'}>
      <CreateTransactionForm initialData={resolvedInitialData} viewMode={!!resolvedInitialData} />
    </AccordionStateProvider>
  );
};

export default Transactions;
