import { useState } from 'react';
import CreateTransactionForm from './create-transaction-form/form/CreateTransactionForm';
import { FormProvider, useForm } from 'react-hook-form';
import { AccordionStateProvider } from './create-transaction-form/context/accordion-control-context';
import TransactionTable from './table/transaction-table';

const CreateTransactions = () => {
  const [showForm, setShowForm] = useState(false);
  const methods = useForm();
  const handleCreate = () => setShowForm(true);

  return (
    <AccordionStateProvider>
      <FormProvider {...methods}>
        {showForm ? (
          <CreateTransactionForm onCancel={() => setShowForm(false)} />
        ) : (
          <TransactionTable onCreate={handleCreate} />
        )}
      </FormProvider>
    </AccordionStateProvider>
  );
};

export default CreateTransactions;
