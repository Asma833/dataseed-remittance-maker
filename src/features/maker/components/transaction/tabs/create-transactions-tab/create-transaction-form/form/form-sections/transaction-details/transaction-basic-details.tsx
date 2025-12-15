import { FormContentWrapper } from '@/components/form/wrapper/form-content-wrapper';
import Spacer from '@/components/form/wrapper/spacer';

import { CommonCreateTransactionProps } from '@/features/maker/types/create-transaction.types';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import { getController } from '@/components/form/utils/get-controller';
import transactionBasicDetailsConfig from './transaction-basic-details.config';
import { FieldType } from '@/types/enums';
import useGetPurposes from '@/hooks/useGetPurposes';
import useGetTransactionType from '@/hooks/useGetTransactionType';
import { useFormContext, useWatch } from 'react-hook-form';
import { useGetCurrencyRates } from '@/hooks/useCurrencyRate';
import { FieldConfig } from '../../../types/createTransactionForm.types';
 

const TransactionBasicDetails = ({ setAccordionState }: CommonCreateTransactionProps) => {
  const { purposeTypes, loading: purposeLoading } = useGetPurposes();
  const { data: currencyCode, isLoading: currencyLoading } = useGetCurrencyRates();
  const { transactionTypes, loading: transactionTypeLoading } = useGetTransactionType();
  const { control, formState: { errors } } = useFormContext();
  const sourceOfFunds = useWatch({ control, name: 'source_of_funds' });

  const purposeOptions = purposeTypes.reduce((acc: Record<string, { label: string }>, { id, text }) => {
    acc[id] = { label: text };
    return acc;
  }, {});

  const transactionTypeOptions = transactionTypes.reduce((acc: Record<string, { label: string }>, { id, text }) => {
    acc[id] = { label: text };
    return acc;
  }, {});

  // const currencyOptions = currencyRates?.reduce((acc: Record<string, { label: string }>, currency) => {
  //   acc[currency.currency_code] = { label: currency.currency_code };
  //   return acc;
  // }, {}) || {};

  const currenyCodeType = currencyCode?.reduce((acc: Record<string, { label: string }>, currency) => {
      acc[currency.currency_code] = { label: currency.currency_code };
      return acc;
    }, {}) || {};

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
                fieldWithOptions = { ...field, options: currenyCodeType };
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
          {sourceOfFunds === 'others' ? (
            <FormFieldRow rowCols={4}>
              {( ['paid_by', 'payee_name', 'payee_pan_number', 'payee_dob'] as const ).map(name => {
                const field = transactionBasicDetailsConfig.find(f => f.name === name) as FieldConfig;
                return <FieldWrapper key={name}>{getController({ ...field, name: `transactionDetails.${name}`, control, errors })}</FieldWrapper>;
              })}
            </FormFieldRow>
          ) : (
            <>
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
            </>
          )}
          
        </Spacer>
      </FormContentWrapper>
    </Spacer>
  );
};

export default TransactionBasicDetails;
