import CreateTransactionForm from './create-transaction-form/form/CreateTransactionForm';
import { FormProvider, useForm } from 'react-hook-form';
import { AccordionStateProvider } from './create-transaction-form/context/accordion-control-context';

const CreateTransactions = () => {
  const methods = useForm();
  return (
    <AccordionStateProvider>
      <FormProvider {...methods}>
        <CreateTransactionForm />
      </FormProvider>
    </AccordionStateProvider>
  );
};

export default CreateTransactions;
