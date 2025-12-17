import { useMemo, useState } from 'react';
import CreateTransactionsAccordion from '../components/create-transactions-accordion';
import { accordionItems } from '../config/accordion-config';
import { Button } from '@/components/ui/button';
import { useAccordionStateProvider } from '../context/accordion-control-context';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTransactionSchema, CreateTransactionFormData, CreateTransactionFormInput } from './common-schema';
import { useCompleteTransaction } from '@/hooks/useCompleteTransaction';
import type { CompleteTransactionRequest } from '@/types/common/transaction.types';

type Props = {
  onCancel?: () => void;
  onSubmit?: (data: CreateTransactionFormData) => void;
  initialData?: Partial<CreateTransactionFormInput>;
};

const sampleInitialData: CreateTransactionFormInput = {
  currencyDetails: {
    fx_currency: 'PLN',
    fx_amount: '50000',
    settlement_rate: '75.5',
    add_margin: '500',
    customer_rate: '76',
    declared_education_loan_amount: '500000',
    previous_transaction_amount: '100000',
    declared_previous_amount: '50000',
    total_transaction_amount_tcs: '1500',
    invoiceRateTable: {
      transaction_value: {
        company_rate: '740000',
        agent_mark_up: '500',
        rate: '740500',
      },
      remittance_charges: {
        company_rate: '500',
        agent_mark_up: '50',
        rate: '550',
      },
      nostro_charges: {
        company_rate: '300',
        agent_mark_up: '30',
        rate: '330',
      },
      other_charges: {
        company_rate: '200',
        agent_mark_up: '20',
        rate: '220',
      },
      transaction_amount: {
        rate: '741600',
      },
      gst_amount: {
        rate: '133488',
      },
      total_inr_amount: {
        rate: '875088',
      },
      tcs: {
        rate: '1500',
      },
    },
  },
  beneficiaryDetails: {
    beneficiary_name: 'ASMA',
    beneficiary_address: 'University Road',
    beneficiary_city: 'New York',
    beneficiary_country: 'USA',
    beneficiary_account_number_iban_number: 'US1234567890',
    beneficiary_swift_code: 'ABCDUS33',
    beneficiary_bank_name: 'Bank of America',
    beneficiary_bank_address: 'New York Branch',
    sort_bsb_aba_transit_code: '021000021',
    message_to_beneficiary_additional_information: 'Education fee payment',
    student_name: 'Student One',
    student_passport_number: 'N1234567',
    payment_instruction_number: 'PAYINS001',
    university_name: 'ABC University',
    intermediaryBankDetails: 'no',
    intermediary_bank_account_number: '',
    intermediary_bank_swift_code: '',
    intermediary_bank_name: '',
    intermediary_bank_address: '',
  },
  transactionDetails: {
    company_reference_number: 'COMP-REF-001',
    agent_reference_number: 'AGENT-REF-001',
    purpose: 'Education',
    transaction_purpose_map_id: '1',
    fx_currency: 'USD',
    fx_amount: 10000,
    company_settlement_rate: 75.5,
    add_margin: 500,
    customer_rate: 76,
    nostro_charges: 300,
    applicant_name: 'John Doe',
    applicant_pan_number: 'ABCDE1234F',
    applicant_email: 'john.doe@email.com',
    applicant_mobile_number: '9876543210',
    source_of_funds: 'Self Income',
    paid_by: 'Self',
    payee_name: 'Jane Doe',
    payee_pan_number: 'FGHIJ5678K',
    applicant_id_document: 'Passport',
    passport_number: 'N1234567',
    place_of_issue: 'Chennai',
    applicant_address: '123 Main Street',
    applicant_city: 'Chennai',
    applicant_state: 'Tamil Nadu',
    applicant_country: 'India',
    postal_code: '600001',
  },
};

const CreateTransactionForm = ({ onCancel, onSubmit, initialData }: Props) => {
  const { accordionState, setAccordionState } = useAccordionStateProvider();
  const currentTab = accordionState.currentActiveTab;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutateAsync } = useCompleteTransaction();

  const defaultValues: Partial<CreateTransactionFormInput> = useMemo(() => {
    const sourceData = initialData ?? sampleInitialData;
    return {
      currencyDetails: {
        fx_currency: sourceData?.currencyDetails?.fx_currency || '-',
        fx_amount: sourceData.currencyDetails?.fx_amount || '-',
        settlement_rate: sourceData.currencyDetails?.settlement_rate || '',
        add_margin: sourceData.currencyDetails?.add_margin || '',
        customer_rate: sourceData.currencyDetails?.customer_rate || '',
        declared_education_loan_amount: sourceData.currencyDetails?.declared_education_loan_amount || '',
        previous_transaction_amount: sourceData.currencyDetails?.previous_transaction_amount || '',
        declared_previous_amount: sourceData.currencyDetails?.declared_previous_amount || '',
        total_transaction_amount_tcs: sourceData.currencyDetails?.total_transaction_amount_tcs || '',
        invoiceRateTable: sourceData.currencyDetails?.invoiceRateTable || {
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
      beneficiaryDetails: sourceData.beneficiaryDetails || {
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
      transactionDetails: sourceData.transactionDetails || {
        company_reference_number: '-',
        agent_reference_number: '-',
        order_date: new Date(),
        order_expiry: new Date(),
        transaction_type: '',
        purpose: '',
        transaction_purpose_map_id: '',
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
    };
  }, [initialData]);
  const form = useForm<CreateTransactionFormInput, unknown, CreateTransactionFormData>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues,
    mode: 'onChange', // Trigger validation on change
  });

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

  const handleSubmit = async (data: CreateTransactionFormData) => {
    setIsSubmitting(true);
    try {
      // Helper to safely convert user input to number
      const safeNumber = (value: string | number | undefined): number => {
        if (value === undefined || value === null || value === '') return 0;
        const num = typeof value === 'string' ? Number(value) : value;
        return isNaN(num as number) ? 0 : (num as number);
      };

      const safeString = (value: string | undefined): string | undefined => {
        const str = value?.trim();
        return str || undefined;
      };

      const normalizeString = (value: string | undefined): string => value?.trim() || '';

      const requiredBeneficiaryFields = [
        'beneficiary_name',
        'beneficiary_address',
        'beneficiary_city',
        'beneficiary_country',
        'beneficiary_account_number_iban_number',
        'beneficiary_swift_code',
        'beneficiary_bank_name',
        'beneficiary_bank_address',
        'sort_bsb_aba_transit_code',
        'message_to_beneficiary_additional_information',
      ];

      const missingFields = requiredBeneficiaryFields.filter(
        (field) => !safeString(data.beneficiaryDetails?.[field as keyof typeof data.beneficiaryDetails])
      );

      if (missingFields.length > 0) {
        throw new Error(`Required fields are missing: ${missingFields.join(', ')}`);
      }

      const convertChargeGroup = (group: typeof data.currencyDetails.invoiceRateTable.transaction_value) => ({
        company_rate: safeNumber(group.company_rate),
        agent_mark_up: safeNumber(group.agent_mark_up),
        rate: safeNumber(group.rate),
      });

      const payload: CompleteTransactionRequest = {
        currencyDetails: {
          fx_currency: normalizeString(data.currencyDetails.fx_currency),
          fx_amount: safeNumber(data.currencyDetails.fx_amount),
          settlement_rate: safeNumber(data.currencyDetails.settlement_rate),
          add_margin: safeNumber(data.currencyDetails.add_margin),
          customer_rate: safeNumber(data.currencyDetails.customer_rate),
          declared_education_loan_amount: safeNumber(data.currencyDetails.declared_education_loan_amount),
          previous_transaction_amount: safeNumber(data.currencyDetails.previous_transaction_amount),
          declared_previous_amount: safeNumber(data.currencyDetails.declared_previous_amount),
          total_transaction_amount_tcs: safeNumber(data.currencyDetails.total_transaction_amount_tcs),
          invoiceRateTable: {
            transaction_value: convertChargeGroup(data.currencyDetails.invoiceRateTable.transaction_value),
            remittance_charges: convertChargeGroup(data.currencyDetails.invoiceRateTable.remittance_charges),
            nostro_charges: convertChargeGroup(data.currencyDetails.invoiceRateTable.nostro_charges),
            other_charges: convertChargeGroup(data.currencyDetails.invoiceRateTable.other_charges),
            transaction_amount: safeNumber(data.currencyDetails.invoiceRateTable.transaction_amount.rate),
            gst_amount: safeNumber(data.currencyDetails.invoiceRateTable.gst_amount.rate),
            total_inr_amount: safeNumber(data.currencyDetails.invoiceRateTable.total_inr_amount.rate),
            tcs: safeNumber(data.currencyDetails.invoiceRateTable.tcs.rate),
          },
        },
        beneficiaryDetails: {
          beneficiary_name: normalizeString(data.beneficiaryDetails.beneficiary_name),
          beneficiary_address: normalizeString(data.beneficiaryDetails.beneficiary_address),
          beneficiary_city: normalizeString(data.beneficiaryDetails.beneficiary_city),
          beneficiary_country: normalizeString(data.beneficiaryDetails.beneficiary_country),
          beneficiary_account_number_iban_number: normalizeString(
            data.beneficiaryDetails.beneficiary_account_number_iban_number
          ),
          beneficiary_swift_code: normalizeString(data.beneficiaryDetails.beneficiary_swift_code),
          beneficiary_bank_name: normalizeString(data.beneficiaryDetails.beneficiary_bank_name),
          beneficiary_bank_address: normalizeString(data.beneficiaryDetails.beneficiary_bank_address),
          sort_bsb_aba_transit_code: normalizeString(data.beneficiaryDetails.sort_bsb_aba_transit_code),
          nostro_charges:"",
          message_to_beneficiary_additional_information: normalizeString(
            data.beneficiaryDetails.message_to_beneficiary_additional_information
          ),
          student_name: normalizeString(data.beneficiaryDetails.student_name),
          student_passport_number: normalizeString(data.beneficiaryDetails.student_passport_number),
          payment_instruction_number: normalizeString(data.beneficiaryDetails.payment_instruction_number),
          university_name: normalizeString(data.beneficiaryDetails.university_name),
          intermediaryBankDetails: normalizeString(data.beneficiaryDetails.intermediaryBankDetails),
          intermediary_bank_account_number: normalizeString(data.beneficiaryDetails.intermediary_bank_account_number),
          intermediary_bank_swift_code: normalizeString(data.beneficiaryDetails.intermediary_bank_swift_code),
          intermediary_bank_name: normalizeString(data.beneficiaryDetails.intermediary_bank_name),
          intermediary_bank_address: normalizeString(data.beneficiaryDetails.intermediary_bank_address),
        },
        transactionDetails: {
          company_reference_number: normalizeString(data.transactionDetails.company_reference_number),
          agent_reference_number: normalizeString(data.transactionDetails.agent_reference_number),
          order_date: new Date().toISOString(),
          order_expiry: new Date().toISOString(),
          transaction_type: 'REMITTANCE',
          purpose: normalizeString(data.transactionDetails.purpose),
          transaction_purpose_map_id: normalizeString(data.transactionDetails.transaction_purpose_map_id),
          fx_currency: normalizeString(data.transactionDetails.fx_currency),
          fx_amount: safeNumber(data.transactionDetails.fx_amount),
          company_settlement_rate: safeNumber(data.transactionDetails.company_settlement_rate),
          add_margin: safeNumber(data.transactionDetails.add_margin),
          customer_rate: safeNumber(data.transactionDetails.customer_rate),
          nostro_charges: safeNumber(data.transactionDetails.nostro_charges),
          applicant_name: normalizeString(data.transactionDetails.applicant_name),
          applicant_pan_number: normalizeString(data.transactionDetails.applicant_pan_number),
          applicant_email: normalizeString(data.transactionDetails.applicant_email),
          applicant_mobile_number: normalizeString(data.transactionDetails.applicant_mobile_number),
          source_of_funds: normalizeString(data.transactionDetails.source_of_funds),
          paid_by: normalizeString(data.transactionDetails.paid_by),
          payee_name: normalizeString(data.transactionDetails.payee_name),
          payee_pan_number: normalizeString(data.transactionDetails.payee_pan_number),
          applicant_id_document: normalizeString(data.transactionDetails.applicant_id_document),
          passport_number: normalizeString(data.transactionDetails.passport_number),
          place_of_issue: normalizeString(data.transactionDetails.place_of_issue),
          applicant_address: normalizeString(data.transactionDetails.applicant_address),
          applicant_city: normalizeString(data.transactionDetails.applicant_city),
          applicant_state: normalizeString(data.transactionDetails.applicant_state),
          applicant_country: normalizeString(data.transactionDetails.applicant_country),
          postal_code: normalizeString(data.transactionDetails.postal_code),
        },
        paymentDetails: {
          payment_method: 'UPI',
          payment_reference: 'PAY-REF-001',
          upi_id: 'user@upi',
          bank_name: 'SBI',
          amount: 875088,
        },
      };
      const response = await mutateAsync(payload);
      onSubmit?.(data);
      form.reset(initialData ?? sampleInitialData);
    } catch (error) {
      console.error('Error creating transaction:', error);

      if (error instanceof Error && error.message === 'Request timeout') {
        console.error('Request timed out after 30 seconds');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const showPrevious = currentTab !== 'panel1';
  const showNext = currentTab !== 'panel3';
  const showSubmit = currentTab === 'panel3';

  return (
    <FormProvider {...form}>
      <form id="create-transaction-form" onSubmit={form.handleSubmit(handleSubmit)}>
        <div>
          <div className="flex justify-between mb-4 gap-2">
            <Button variant="light" className="w-24" onClick={onCancel}>
              Cancel
            </Button>
            <div className="flex gap-2">
              {showPrevious && (
                <Button variant="light" className="w-24" onClick={handlePrevious}>
                  Previous
                </Button>
              )}
              {showNext && (
                <Button variant="secondary" onClick={handleNext} className="w-24">
                  Next
                </Button>
              )}
            </div>
          </div>
          <CreateTransactionsAccordion accordionItems={accordionItems} />
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateTransactionForm;
