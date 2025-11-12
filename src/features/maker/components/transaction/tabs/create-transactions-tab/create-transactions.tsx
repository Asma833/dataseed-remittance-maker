import { useState } from 'react';
import CreateTransactionForm from './create-transaction-form/form/create-transaction-form';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AccordionStateProvider } from './create-transaction-form/context/accordion-control-context';
import TransactionTable from './table/transaction-table';
import { beneficiaryDetailsSchema, type BeneficiaryDetailsFormData } from './create-transaction-form/form/form-sections/beneficiary-details/beneficiary-details.schema';

const CreateTransactions = () => {
  const [showForm, setShowForm] = useState(false);
  const methods = useForm<BeneficiaryDetailsFormData>({
    resolver: zodResolver(beneficiaryDetailsSchema),
    defaultValues: {
      beneficiary_name: '',
      beneficiary_address: '',
      beneficiary_city: '',
      beneficiary_country: '',
      beneficiary_account_number_iban_number: '',
      beneficiary_swift_code: '',
      beneficiary_bank_name: '',
      beneficiary_bank_address: '',
      sort_bsb_aba_transit_code: '',
      nostro_charges: '',
      message_to_beneficiary_additional_information: '',
      student_name: '',
      student_passport_number: '',
      payment_instruction_number: '',
      university_name: '',
      intermediaryBankDetails: 'no',
      intermediary_bank_account_number: '',
      intermediary_bank_swift_code: '',
      intermediary_bank_name: '',
      intermediary_bank_address: '',
    },
    mode: 'onChange',
  });
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
