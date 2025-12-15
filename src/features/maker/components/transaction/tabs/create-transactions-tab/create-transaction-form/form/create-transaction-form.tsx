import { useEffect, useMemo, useState } from 'react';
import CreateTransactionsAccordion from '../components/create-transactions-accordion';
import { accordionItems } from '../config/accordion-config';
import { Button } from '@/components/ui/button';
import { useAccordionStateProvider } from '../context/accordion-control-context';
import { useForm, Resolver, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTransactionSchema, CreateTransactionFormData } from './common-schema';
//import { createTransaction } from '@/features/maker/api/transactionApi';
import { useCompleteDeal } from '@/hooks/useCompleteDeal';

type Props = {
  onCancel?: () => void;
  onSubmit?: (data: CreateTransactionFormData) => void;
  initialData?: Partial<CreateTransactionFormData>;
};

const CreateTransactionForm = ({ onCancel, onSubmit, initialData }: Props) => {
  const { accordionState, setAccordionState } = useAccordionStateProvider();
  const currentTab = accordionState.currentActiveTab;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutateAsync } = useCompleteDeal();

  const defaultValues: Partial<CreateTransactionFormData> = useMemo(() => ({
    currencyDetails: {
      fx_currency: initialData?.currencyDetails?.fx_currency || '-',
      fx_amount: initialData?.currencyDetails?.fx_amount || '-',
      settlement_rate: initialData?.currencyDetails?.settlement_rate || '',
      add_margin: initialData?.currencyDetails?.add_margin || '',
      customer_rate: initialData?.currencyDetails?.customer_rate || '',
      declared_education_loan_amount: initialData?.currencyDetails?.declared_education_loan_amount || '',
      previous_transaction_amount: initialData?.currencyDetails?.previous_transaction_amount || '',
      declared_previous_amount: initialData?.currencyDetails?.declared_previous_amount || '',
      total_transaction_amount_tcs: initialData?.currencyDetails?.total_transaction_amount_tcs || '',
      invoiceRateTable: initialData?.currencyDetails?.invoiceRateTable || {
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
    beneficiaryDetails: initialData?.beneficiaryDetails || {
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
    transactionDetails: initialData?.transactionDetails || {
      company_reference_number: '-',
      agent_reference_number: '-',
      order_date: new Date(),
      order_expiry: new Date(),
      transaction_type: '',
      purpose: '',
      fx_currency: '',
      fx_amount: 0,
      company_settlement_rate: 0,
      add_margin: 0,
      customer_rate: 0,
      nostro_charges: 0,
      applicant_name: '',
      applicant_pan_number: '',
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
  }), [initialData]);

  const form = useForm<CreateTransactionFormData>({
    resolver: zodResolver(createTransactionSchema) as Resolver<CreateTransactionFormData>,
    defaultValues: {},
    mode: 'onSubmit', // Trigger validation on change
  });

  const { handleSubmit: onFormSubmit } = form;

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

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

  const handleSubmit = async (data:any) => {
    setIsSubmitting(true);
    try {
      debugger;
      const transformedData = {
        currencyDetails: {
          fx_currency: data.currencyDetails.fx_currency,
          fx_amount: Number(data.currencyDetails.fx_amount),
          settlement_rate: Number(data.currencyDetails.settlement_rate),
          add_margin: Number(data.currencyDetails.add_margin),
          customer_rate: Number(data.currencyDetails.customer_rate),
          declared_education_loan_amount: Number(data.currencyDetails.declared_education_loan_amount),
          previous_transaction_amount: Number(data.currencyDetails.previous_transaction_amount),
          declared_previous_amount: Number(data.currencyDetails.declared_previous_amount),
          total_transaction_amount_tcs: Number(data.currencyDetails.total_transaction_amount_tcs),
          invoiceRateTable: {
            transaction_value: {
              company_rate: Number(data.currencyDetails.invoiceRateTable.transaction_value.company_rate),
              agent_mark_up: Number(data.currencyDetails.invoiceRateTable.transaction_value.agent_mark_up),
              rate: Number(data.currencyDetails.invoiceRateTable.transaction_value.rate),
            },
            remittance_charges: {
              company_rate: Number(data.currencyDetails.invoiceRateTable.remittance_charges.company_rate),
              agent_mark_up: Number(data.currencyDetails.invoiceRateTable.remittance_charges.agent_mark_up),
              rate: Number(data.currencyDetails.invoiceRateTable.remittance_charges.rate),
            },
            nostro_charges: {
              company_rate: Number(data.currencyDetails.invoiceRateTable.nostro_charges.company_rate),
              agent_mark_up: Number(data.currencyDetails.invoiceRateTable.nostro_charges.agent_mark_up),
              rate: Number(data.currencyDetails.invoiceRateTable.nostro_charges.rate),
            },
            other_charges: {
              company_rate: Number(data.currencyDetails.invoiceRateTable.other_charges.company_rate),
              agent_mark_up: Number(data.currencyDetails.invoiceRateTable.other_charges.agent_mark_up),
              rate: Number(data.currencyDetails.invoiceRateTable.other_charges.rate),
            },
            transaction_amount: Number(data.currencyDetails.invoiceRateTable.transaction_amount.rate),
            gst_amount: Number(data.currencyDetails.invoiceRateTable.gst_amount.rate),
            total_inr_amount: Number(data.currencyDetails.invoiceRateTable.total_inr_amount.rate),
            tcs: Number(data.currencyDetails.invoiceRateTable.tcs.rate),
          },
        },
        beneficiaryDetails: {
          ...data.beneficiaryDetails,
          student_name: data.beneficiaryDetails.student_name || '',
          student_passport_number: data.beneficiaryDetails.student_passport_number || '',
          payment_instruction_number: data.beneficiaryDetails.payment_instruction_number || '',
          university_name: data.beneficiaryDetails.university_name || '',
          intermediary_bank_account_number: data.beneficiaryDetails.intermediary_bank_account_number || '',
          intermediary_bank_swift_code: data.beneficiaryDetails.intermediary_bank_swift_code || '',
          intermediary_bank_name: data.beneficiaryDetails.intermediary_bank_name || '',
          intermediary_bank_address: data.beneficiaryDetails.intermediary_bank_address || '',
        },
        transactionDetails: {
          company_reference_number: data.transactionDetails.company_reference_number,
          agent_reference_number: data.transactionDetails.agent_reference_number,
          order_date: data.transactionDetails.order_date?.toISOString() ?? new Date().toISOString(),
          order_expiry: data.transactionDetails.order_expiry?.toISOString() ?? new Date().toISOString(),
          transaction_type: data.transactionDetails.transaction_type,
          purpose: data.transactionDetails.purpose,
          fx_currency: data.transactionDetails.fx_currency,
          fx_amount: data.transactionDetails.fx_amount,
          company_settlement_rate: data.transactionDetails.company_settlement_rate,
          add_margin: data.transactionDetails.add_margin,
          customer_rate: data.transactionDetails.customer_rate,
          nostro_charges: data.transactionDetails.nostro_charges,
          applicant_name: data.transactionDetails.applicant_name,
          applicant_pan_number: data.transactionDetails.applicant_pan_number,
          applicant_email: data.transactionDetails.applicant_email,
          applicant_mobile_number: data.transactionDetails.applicant_mobile_number,
          source_of_funds: data.transactionDetails.source_of_funds,
          paid_by: data.transactionDetails.paid_by,
          payee_name: data.transactionDetails.payee_name,
          payee_pan_number: data.transactionDetails.payee_pan_number,
          applicant_id_document: data.transactionDetails.applicant_id_document,
          passport_number: data.transactionDetails.passport_number,
          place_of_issue: data.transactionDetails.place_of_issue,
          applicant_address: data.transactionDetails.applicant_address,
          applicant_city: data.transactionDetails.applicant_city,
          applicant_state: data.transactionDetails.applicant_state,
          applicant_country: data.transactionDetails.applicant_country,
          postal_code: data.transactionDetails.postal_code,
        },
        "paymentDetails": {
          "payment_method": "UPI",
          "payment_reference": "PAY-REF-001",
          "upi_id": "user@upi",
          "bank_name": "SBI",
          "amount": 875088
        }
      };
      const response = await mutateAsync(transformedData);
      console.log('Transaction created:', response);
      // if (onSubmit) {
      //   onSubmit(data);
      // }
    } catch (error) {
      console.error('Error creating transaction:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const showPrevious = currentTab !== 'panel1';
  const showNext = currentTab !== 'panel3';
  const showSubmit = currentTab === 'panel3';

  return (
    <FormProvider {...form}>
      <div>
        <div className="flex justify-between mb-4 gap-2">
          <Button variant="light"  className='w-24' onClick={onCancel}>
            Cancel
          </Button>
          <div className="flex gap-2">
            {showPrevious && (
              <Button variant="light" className='w-24' onClick={handlePrevious}>
                Previous
              </Button>
            )}
            {showNext && (
              <Button variant="secondary" onClick={handleNext} className='w-24'>
                Next
              </Button>
            )}
            {showSubmit && (
              <Button
                variant="default"
                onClick={onFormSubmit(handleSubmit)}
                className='w-24'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            )}
          </div>
        </div>
        <CreateTransactionsAccordion accordionItems={accordionItems} />
      </div>
    </FormProvider>
  );
};

export default CreateTransactionForm;
