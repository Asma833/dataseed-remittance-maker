import CreateTransactionForm from './create-transaction-form/form/create-transaction-form';
import { AccordionStateProvider } from './create-transaction-form/context/accordion-control-context';

const Transactions = () => {
  return (
    <AccordionStateProvider>
      <CreateTransactionForm />
    </AccordionStateProvider>
  );
};

export default Transactions;
