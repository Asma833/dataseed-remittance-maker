import { FormContentWrapper } from '@/components/form/wrapper/form-content-wrapper';
import Spacer from '@/components/form/wrapper/spacer';
 
import { useState, useEffect } from 'react';
import { CommonCreateTransactionProps } from '@/features/maker/types/create-transaction.types';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import { getController } from '@/components/form/utils/get-controller';
import transactionBasicDetailsConfig from './transaction-basic-details.config';
import { FieldType } from '@/types/enums';
import Actions from '../../../components/Actions';
import useGetPurposes from '@/hooks/useGetPurposes';
import useGetTransactionType from '@/hooks/useGetTransactionType';
import { useFormContext } from 'react-hook-form';
import { useGetCurrencyRates as useGetAllCurrencyRates } from '@/hooks/useCurrencyRate';
//import { useGetCurrencyRates } from '../../../../hooks/useCurrencyRate';
import { Button } from '@/components/ui/button';
import { FieldConfig } from '../../../types/createTransactionForm.types';
import { useGetCurrencyRates } from '../../../hooks/useCurrencyRate';
 

const TransactionBasicDetails = ({ setAccordionState }: CommonCreateTransactionProps) => {
  const { purposeTypes, loading: purposeLoading } = useGetPurposes();
  const { data: currencyRates, isLoading: currencyLoading } = useGetAllCurrencyRates();
  const { transactionTypes, loading: transactionTypeLoading } = useGetTransactionType();
  const { control, formState: { errors }, watch, setValue } = useFormContext();

  const selectedCurrency = watch('transactionDetails.fx_currency');
  const { data: selectedCurrencyRate } = useGetCurrencyRates(selectedCurrency);



  const purposeOptions = purposeTypes.reduce((acc: Record<string, { label: string }>, { id, text }) => {
    acc[id] = { label: text };
    return acc;
  }, {});

  const transactionTypeOptions = transactionTypes.reduce((acc: Record<string, { label: string }>, { id, text }) => {
    acc[id] = { label: text };
    return acc;
  }, {});

  const currencyOptions = currencyRates?.reduce((acc: Record<string, { label: string }>, currency) => {
    acc[currency.currency_code] = { label: currency.currency_code };
    return acc;
  }, {}) || {};

  useEffect(() => {
    if (selectedCurrencyRate && selectedCurrencyRate.length > 0) {
      setValue('transactionDetails.company_settlement_rate', parseFloat(selectedCurrencyRate[0].card_buy_rate));
    }
  }, [selectedCurrencyRate, setValue]);

  return (
    <Spacer>
      <FormContentWrapper className="rounded-lg w-full mr-auto bg-transparent">
        <Spacer>
          <FormFieldRow rowCols={4}>
            {( ['company_reference_number', 'agent_reference_number', 'order_date', 'order_expiry'] as const ).map(name => {
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
              } else if (name === 'transaction_type') {
                fieldWithOptions = { ...field, options: transactionTypeOptions };
              }
              return <FieldWrapper key={name}>{getController({ ...fieldWithOptions, name: `transactionDetails.${name}`, control, errors })}</FieldWrapper>;
            })}
          </FormFieldRow>
          <FormFieldRow rowCols={4}>
            {( ['company_settlement_rate', 'add_margin', 'customer_rate', 'nostro_charges'] as const ).map(name => {
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
          
        </Spacer>
      </FormContentWrapper>
    </Spacer>
  );
};

export default TransactionBasicDetails;
