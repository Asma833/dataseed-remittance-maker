import CreateTransactionsAccordion from '../components/create-transactions-accordion';
import { accordionItems } from '../config/accordion-config';
import { Button } from '@/components/ui/button';
import { useAccordionStateProvider } from '../context/accordion-control-context';
import { useForm, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { currencyDetailsSchema, CurrencyDetailsFormData } from './form-sections/currency-details/currency-details.schema';
import { z } from 'zod';
import { beneficiaryDetailsSchema } from './form-sections/beneficiary-details/beneficiary-details.schema';
import { transactionBasicDetailsSchema } from './form-sections/transaction-details/transaction-basic-details.schema';

// Combined schema - extend with other sections as needed
const createTransactionSchema = z.object({
  currencyDetails: currencyDetailsSchema,
  beneficiaryDetails: beneficiaryDetailsSchema,
  transactionDetails: transactionBasicDetailsSchema
});

export type CreateTransactionFormData = z.infer<typeof createTransactionSchema>;

type Props = {
  onCancel?: () => void;
  onSubmit?: (data: CreateTransactionFormData) => void;
};

const CreateTransactionForm = ({ onCancel, onSubmit }: Props) => {
  const { accordionState, setAccordionState } = useAccordionStateProvider();
  const currentTab = accordionState.currentActiveTab;

  const defaultValues: Partial<CreateTransactionFormData> = {
    currencyDetails: {
      fx_currency: '',
      fx_amount: '',
      settlement_rate: '',
      add_margin: '',
      customer_rate: '',
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
    transactionDetails: {
      company_reference_number: '',
      agent_reference_number: '',
      created_date: undefined,
      deal_expiry: undefined,
      transaction_type: '',
      purpose: '',
      fx_currency: '',
      fx_amount: 0,
      settlement_rate: 0,
      billing_rate: 0,
      applicant_name: '',
      applicant_pan_number: '',
      applicant_dob: undefined,
      applicant_email: '',
      applicant_mobile_number: '',
      source_of_funds: '',
      paid_by: '',
      payee_name: '',
      payee_pan_number: '',
      payee_dob: undefined,
      applicant_id_document: '',
      passport_number: '',
      passport_issued_date: undefined,
      passport_expiry_date: undefined,
      place_of_issue: '',
      applicant_address: '',
      applicant_city: '',
      applicant_state: '',
      applicant_country: '',
      postal_code: '',
    },
  };

  const form = useForm<CreateTransactionFormData>({
    resolver: zodResolver(createTransactionSchema) as Resolver<CreateTransactionFormData>,
    defaultValues,
    mode: 'onChange', // Trigger validation on change
  });

  const { handleSubmit: onFormSubmit } = form;

  const handlePrevious = () => {
    if (currentTab === 'panel2') {
      setAccordionState({ currentActiveTab: 'panel1' });
    } else if (currentTab === 'panel3') {
      setAccordionState({ currentActiveTab: 'panel2' });
    }
  };

  const handleNext = () => {
    if (currentTab === 'panel1') {
      setAccordionState({ currentActiveTab: 'panel2' });
    } else if (currentTab === 'panel2') {
      setAccordionState({ currentActiveTab: 'panel3' });
    }
  };

  const showPrevious = currentTab !== 'panel1';
  const showNext = currentTab !== 'panel3';

  return (
    <div>
      <div className="flex justify-between mb-4 gap-2">
        <Button variant="light" onClick={onCancel}>
          Cancel
        </Button>
        <div className="flex gap-2">
          {showPrevious && (
            <Button variant="light" onClick={handlePrevious}>
              Previous
            </Button>
          )}
          {showNext && (
            <Button onClick={handleNext} className='w-24'>
              Next
            </Button>
          )}
          
        </div>
      </div>
      <CreateTransactionsAccordion accordionItems={accordionItems} />
    </div>
  );
};

export default CreateTransactionForm;
