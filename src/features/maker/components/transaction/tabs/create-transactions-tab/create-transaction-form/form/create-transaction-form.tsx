import { useMemo, useState } from 'react';
import CreateTransactionsAccordion from '../components/create-transactions-accordion';
import { accordionItems } from '../config/accordion-config';
import { Button } from '@/components/ui/button';
import { useAccordionStateProvider } from '../context/accordion-control-context';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTransactionSchema, CreateTransactionFormData, CreateTransactionFormInput } from './common-schema';
import { safeNumber, safeString, normalizeString } from '@/utils/form-helpers';
import { useCompleteTransaction } from '../../../../hooks/useCompleteTransaction';
import { CompleteTransactionRequest, TransactionDetails } from '../types/transaction.types';
import { getFormDefaultValues } from './form-defaults';
import { panelFields } from './form-validation-fields';

type Props = {
  onCancel?: () => void;
  onSubmit?: (data: CreateTransactionFormData) => void;
  initialData?: Partial<CreateTransactionFormInput>;
};

const CreateTransactionForm = ({ onCancel, onSubmit, initialData }: Props) => {
  const { accordionState, setAccordionState } = useAccordionStateProvider();
  const currentTab = accordionState.currentActiveTab;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutateAsync } = useCompleteTransaction();

  const defaultValues = useMemo(() => getFormDefaultValues(initialData), [initialData]);
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

  const handleNext = async () => {
    const fieldsToValidate = panelFields[currentTab as keyof typeof panelFields];
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      if (currentTab === 'panel1') {
        setAccordionState({ currentActiveTab: 'panel2' });
      } else if (currentTab === 'panel2') {
        setAccordionState({ currentActiveTab: 'panel3' });
      }
    }
  };

  const handleSubmit = async (data: CreateTransactionFormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const convertChargeGroup = (group: typeof data.currencyDetails.invoiceRateTable.transaction_value) => {
        // The input properties are expected to be company_rate and add_margin
        // And the output should match the expected properties in transaction.types.ts
        const companyRate = safeNumber(group.company_rate);
        const addMargin = safeNumber(group.agent_mark_up);

        // Return the object with the correct property names
        return {
          company_rate: companyRate,
          agent_mark_up: addMargin,
          rate: Number(companyRate) + Number(addMargin), // Rate is calculated by adding the two values
        };
      };

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
          nostro_charges: '',
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
          nostro_charges: safeNumber(data.transactionDetails?.nostro_charges),
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
          passport_issue_date: data.transactionDetails.passport_issue_date ? new Date(data.transactionDetails.passport_issue_date).toISOString() : '',
          passport_expiry_date: data.transactionDetails.passport_expiry_date ? new Date(data.transactionDetails.passport_expiry_date).toISOString() : '',
          applicant_address: normalizeString(data.transactionDetails.applicant_address),
          applicant_city: normalizeString(data.transactionDetails.applicant_city),
          applicant_state: normalizeString(data.transactionDetails.applicant_state),
          applicant_country: normalizeString(data.transactionDetails.applicant_country),
          postal_code: normalizeString(String(data.transactionDetails.postal_code)),
        } as TransactionDetails,
        paymentDetails: {
          payment_method: 'UPI',
          payment_reference: 'PAY-REF-001',
          upi_id: 'user@upi',
          bank_name: 'SBI',
          amount: 875088,
        },
      };
      const response = await mutateAsync(payload);
      form.reset(initialData || {});
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

  return (
    <FormProvider {...form}>
      <form id="create-transaction-form" onSubmit={form.handleSubmit(handleSubmit)}>
        <div>
          <div className="flex justify-between mb-4 gap-2">
            <Button variant="light" className="w-24" onClick={onCancel} type="button">
              Cancel
            </Button>
            <div className="flex gap-2">
              {showPrevious && (
                <Button variant="light" className="w-24" onClick={handlePrevious} type="button">
                  Previous
                </Button>
              )}
              {showNext && (
                <Button variant="secondary" onClick={handleNext} className="w-24" type="button">
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
