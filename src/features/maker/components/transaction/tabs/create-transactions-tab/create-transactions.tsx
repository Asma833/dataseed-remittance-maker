import { useState } from 'react';
import CreateTransactionForm from './create-transaction-form/form/create-transaction-form';
import { AccordionStateProvider } from './create-transaction-form/context/accordion-control-context';
import TransactionTable from './table/transaction-table';
import { TransactionData } from '@/features/maker/types/transaction.types';
import { CreateTransactionFormData } from './create-transaction-form/form/common-schema';

const CreateTransactions = () => {
  const [showForm, setShowForm] = useState(false);
  const [initialData, setInitialData] = useState<Partial<CreateTransactionFormData> | undefined>();

  const mapTransactionToFormData = (transaction: TransactionData): Partial<CreateTransactionFormData> => {
    return {
      currencyDetails: {
        fx_currency: transaction.fx_currency || '',
        fx_amount: transaction.fx_amount || '',
        settlement_rate: transaction.settlement_rate || '',
        add_margin: '',
        customer_rate: transaction.customer_rate || '',
        declared_education_loan_amount: '',
        previous_transaction_amount: '',
        declared_previous_amount: '',
        total_transaction_amount_tcs: '',
        invoiceRateTable: {
          transaction_value: {
            company_rate: '',
            agent_mark_up: '',
            rate: '',
          },
          remittance_charges: {
            company_rate: '',
            agent_mark_up: '',
            rate: '',
          },
          nostro_charges: {
            company_rate: '',
            agent_mark_up: '',
            rate: '',
          },
          other_charges: {
            company_rate: '',
            agent_mark_up: '',
            rate: '',
          },
          transaction_amount: {
            rate: '',
          },
          gst_amount: {
            rate: '',
          },
          total_inr_amount: {
            rate: '',
          },
          tcs: {
            rate: '',
          },
        },
      },
      beneficiaryDetails: {
        beneficiary_name: transaction.applicant_name || '',
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
      transactionDetails: {
        company_reference_number: transaction.company_ref_no || '',
        agent_reference_number: transaction.agent_ref_no || '',
        ...(transaction.order_date && { created_date: new Date(transaction.order_date) }),
        ...(transaction.expiry_date && { deal_expiry: new Date(transaction.expiry_date) }),
        transaction_type: transaction.transaction_type || '',
        purpose: transaction.purpose || '',
        fx_currency: transaction.fx_currency || '',
        fx_amount: parseFloat(transaction.fx_amount) || 0,
        settlement_rate: parseFloat(transaction.settlement_rate) || 0,
        billing_rate: parseFloat(transaction.customer_rate) || 0,
        applicant_name: transaction.applicant_name || '',
        applicant_pan_number: transaction.applicant_pan_number || '',
        applicant_email: '',
        applicant_mobile_number: '',
        source_of_funds: '',
        paid_by: '',
        payee_name: '',
        payee_pan_number: '',
        applicant_id_document: '',
        passport_number: '',
        place_of_issue: '',
        applicant_address: '',
        applicant_city: '',
        applicant_state: '',
        applicant_country: '',
        postal_code: '',
      },
    };
  };

  const handleCreate = (transaction: TransactionData) => {
    const formData = mapTransactionToFormData(transaction);
    setInitialData(formData);
    setShowForm(true);
  };
  return (
    <AccordionStateProvider>
      {/* {showForm ? ( */}
        <CreateTransactionForm {...(initialData && { initialData })} onCancel={() => setShowForm(false)} />
      {/* ) : (
        <TransactionTable onCreate={handleCreate} />
      )} */}
    </AccordionStateProvider>
  );
};

export default CreateTransactions;
