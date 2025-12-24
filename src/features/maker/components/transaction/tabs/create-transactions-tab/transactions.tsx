import { useLocation } from 'react-router-dom';
import CreateTransactionForm from './create-transaction-form/form/create-transaction-form';
import { AccordionStateProvider } from './create-transaction-form/context/accordion-control-context';

const Transactions = () => {
  const location = useLocation();
  const initialData = location.state?.initialData;

  return (
    <AccordionStateProvider>
      <CreateTransactionForm initialData={initialData} />
    </AccordionStateProvider>
  );
};

export default Transactions;
