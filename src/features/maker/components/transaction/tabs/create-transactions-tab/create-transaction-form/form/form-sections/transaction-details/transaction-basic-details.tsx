import { FormContentWrapper } from '@/components/form/wrapper/form-content-wrapper';
import Spacer from '@/components/form/wrapper/spacer';
 
import { useState } from 'react';
import { CommonCreateTransactionProps } from '@/features/maker/types/create-transaction.types';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import { getController } from '@/components/form/utils/get-controller';
import transactionBasicDetailsConfig from './transaction-basic-details.config';
import { FieldType } from '@/types/enums';
import Actions from '../../../components/Actions';
import useGetPurposes from '@/hooks/useGetPurposes';
import { useGetCurrencyRates } from '@/hooks/useCurrencyRate';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FieldConfig } from '../../../types/createTransactionForm.types';
 

const TransactionBasicDetails = ({ setAccordionState }: CommonCreateTransactionProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { purposeTypes, loading: purposeLoading } = useGetPurposes();
  const { data: currencyRates, isLoading: currencyLoading } = useGetCurrencyRates();
  const { control, formState: { errors } } = useFormContext();

 

  const purposeOptions = purposeTypes.reduce((acc: Record<string, { label: string }>, { id, text }) => {
    acc[id] = { label: text };
    return acc;
  }, {});

  const currencyOptions = currencyRates?.reduce((acc: Record<string, { label: string }>, currency) => {
    acc[currency.currency_code] = { label: currency.currency_code };
    return acc;
  }, {}) || {};


  const handleValidatePanAndSave = () =>{}
  const handleEdit = () => {
    setIsEditing(true);
    // console.log('Editing mode enabled');
  };

  return (
    <Spacer>
      <FormContentWrapper className="rounded-lg w-full mr-auto bg-transparent">
        <Spacer>
          <FormFieldRow rowCols={4}>
            {( ['company_reference_number', 'agent_reference_number', 'created_date', 'deal_expiry'] as const ).map(name => {
              const field = transactionBasicDetailsConfig.find(f => f.name === name) as FieldConfig;
              return <FieldWrapper key={name}>{getController({ ...field, name: `transactionDetails.${name}`, control, errors })}</FieldWrapper>;
            })}
          </FormFieldRow>
          <FormFieldRow rowCols={4}>
            {( ['transaction_type', 'purpose', 'fx_currency', 'fx_amount'] as const ).map(name => {
              const field = transactionBasicDetailsConfig.find(f => f.name === name) as FieldConfig;
              let fieldWithOptions = field;
              if (name === 'purpose') {
                fieldWithOptions = { ...field, options: purposeOptions };
              } else if (name === 'fx_currency') {
                fieldWithOptions = { ...field, options: currencyOptions };
              }
              return <FieldWrapper key={name}>{getController({ ...fieldWithOptions, name: `transactionDetails.${name}`, control, errors })}</FieldWrapper>;
            })}
          </FormFieldRow>
          <FormFieldRow rowCols={4}>
            {( ['settlement_rate', 'billing_rate', 'applicant_name', 'applicant_pan_number'] as const ).map(name => {
              const field = transactionBasicDetailsConfig.find(f => f.name === name) as FieldConfig;
              return <FieldWrapper key={name}>{getController({ ...field, name: `transactionDetails.${name}`, control, errors })}</FieldWrapper>;
            })}
          </FormFieldRow>
          <p className='font-semibold text-gray-600'>KYC Details</p>
            <FormFieldRow rowCols={4}>
            {( ['applicant_name', 'applicant_pan_number','applicant_dob', 'applicant_email',] as const ).map(name => {
              const field = transactionBasicDetailsConfig.find(f => f.name === name) as FieldConfig;
              return <FieldWrapper key={name}>{getController({ ...field, name: `transactionDetails.${name}`, control, errors })}</FieldWrapper>;
            })}
          </FormFieldRow>
          <FormFieldRow rowCols={4}>
            {( ['applicant_mobile_number', 'source_of_funds','paid_by', 'payee_name',] as const ).map(name => {
              const field = transactionBasicDetailsConfig.find(f => f.name === name) as FieldConfig;
              return <FieldWrapper key={name}>{getController({ ...field, name: `transactionDetails.${name}`, control, errors })}</FieldWrapper>;
            })}
          </FormFieldRow>
          <FormFieldRow rowCols={4}>
            {( ['payee_pan_number', 'payee_dob','applicant_id_document', 'passport_number',] as const ).map(name => {
              const field = transactionBasicDetailsConfig.find(f => f.name === name) as FieldConfig;
              return <FieldWrapper key={name}>{getController({ ...field, name: `transactionDetails.${name}`, control, errors })}</FieldWrapper>;
            })}
          </FormFieldRow>
          <FormFieldRow rowCols={4}>
            {( ['passport_issued_date', 'passport_expiry_date','place_of_issue', 'applicant_address'] as const ).map(name => {
              const field = transactionBasicDetailsConfig.find(f => f.name === name) as FieldConfig;
              return <FieldWrapper key={name}>{getController({ ...field, name: `transactionDetails.${name}`, control, errors })}</FieldWrapper>;
            })}
          </FormFieldRow>
          <FormFieldRow rowCols={4}>
            {( ['applicant_city', 'applicant_state','applicant_country', 'postal_code',] as const ).map(name => {
              const field = transactionBasicDetailsConfig.find(f => f.name === name) as FieldConfig;
              return <FieldWrapper key={name}>{getController({ ...field, name: `transactionDetails.${name}`, control, errors })}</FieldWrapper>;
            })}
          </FormFieldRow>
          <FormFieldRow rowCols={4}>
            {( ['add_margins', 'customer_rate','nostro_charges'] as const ).map(name => {
              const field = transactionBasicDetailsConfig.find(f => f.name === name) as FieldConfig;
              return <FieldWrapper key={name}>{getController({ ...field, name: `transactionDetails.${name}`, control, errors })}</FieldWrapper>;
            })}
          </FormFieldRow>
          
        </Spacer>
      </FormContentWrapper>
      <div className='flex justify-center items-center'>
        <Button onClick={handleValidatePanAndSave} className='mx-2'>
            ValidatePanAndSave
          </Button>
         <Button onClick={handleEdit} className='w-32'>
            Edit
          </Button>
      </div>
    </Spacer>
  );
};

export default TransactionBasicDetails;
