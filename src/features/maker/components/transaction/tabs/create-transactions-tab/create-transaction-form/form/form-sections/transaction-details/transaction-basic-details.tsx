import { FormContentWrapper } from '@/components/form/wrapper/form-content-wrapper';
import Spacer from '@/components/form/wrapper/spacer';
import { CommonCreateTransactionProps } from '@/features/maker/types/create-transaction.types';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import { getController } from '@/components/form/utils/get-controller';
import transactionBasicDetailsConfig from './transaction-basic-details.config';
import useGetPurposes from '@/hooks/useGetPurposes';
import useGetTransactionType from '@/hooks/useGetTransactionType';
import { useFormContext, useWatch } from 'react-hook-form';
import { useGetCurrencyRates } from '@/hooks/useCurrencyRate';
import { FieldConfig } from '../../../types/createTransactionForm.types';
import { useGetData } from '@/hooks/useGetData';
import { queryKeys } from '@/core/constant/query-keys';
import { API } from '@/core/constant/apis';
import { useMemo, useEffect } from 'react';
import { TransactionPurposeMap } from '@/types/common/transaction-form.types';

const TransactionBasicDetails = ({ setAccordionState }: CommonCreateTransactionProps) => {
  const { purposeTypes, loading: purposeLoading } = useGetPurposes();
  const { data: currencyCode, isLoading: currencyLoading } = useGetCurrencyRates();
  const { transactionTypes, loading: transactionTypeLoading } = useGetTransactionType();
   const {
    data: mappedPurposeTransactionTypesData,
    isLoading: userLoading,
    error: userError,
    refetch: refetchMappingData,
  } = useGetData({
    endpoint: API.PURPOSE.TRANSACTION_MAPPING,
    queryKey: queryKeys.masters.documentMapping,
    dataPath: 'data',
  });
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const sourceOfFunds = useWatch({ control, name: 'transactionDetails.source_of_funds' });

  const purposeOptions = purposeTypes.reduce((acc: Record<string, { label: string }>, { text }) => {
    acc[text] = { label: text };
    return acc;
  }, {});
  const selectedTransactionTypeId = "3f9fbf53-057f-4cf7-90f5-5035edd2e158";
  // Filter purpose types based on selected transaction type
  const purposeTypesForSelectedTransaction = selectedTransactionTypeId
    ? (mappedPurposeTransactionTypesData && Array.isArray(mappedPurposeTransactionTypesData)
        ? (mappedPurposeTransactionTypesData as TransactionPurposeMap[])
            .filter((item) => item.transactionType.id === selectedTransactionTypeId)
            .map((item) => ({
              value: item.purpose.id,
              label: item.purpose.purpose_name,
              typeId: item.id,
            }))
        : [])
    : [];

  const filteredPurposeOptions = purposeTypesForSelectedTransaction.reduce((acc, item) => {
    acc[item.value] = { label: item.label };
    return acc;
  }, {} as Record<string, { label: string }>);

  // Watch for transaction_type changes
  const selectedTransactionType = selectedTransactionTypeId;
  const selectedPurposeType = useWatch({ control, name: 'transactionDetails.purpose' });
  const selectedMapping = useMemo(() => {
    if (
      !selectedTransactionType ||
      !selectedPurposeType ||
      !mappedPurposeTransactionTypesData ||
      !Array.isArray(mappedPurposeTransactionTypesData)
    ) {
      return null;
    }
    return (mappedPurposeTransactionTypesData as TransactionPurposeMap[]).find(
      (item) => item.transactionType.id === selectedTransactionType && item.purpose.id === selectedPurposeType
    );
  }, [selectedTransactionType, selectedPurposeType, mappedPurposeTransactionTypesData]);
console.log(selectedMapping,"selectedMapping")

  useEffect(() => {
    if (selectedMapping?.id) {
      setValue('transactionDetails.transaction_purpose_map_id', selectedMapping.id);
    }
  }, [selectedMapping, setValue]);
  const currenyCodeType =
    currencyCode?.reduce((acc: Record<string, { label: string }>, currency) => {
      acc[currency.currency_code] = { label: currency.currency_code };
      return acc;
    }, {}) || {};

  return (
    <Spacer>
      <FormContentWrapper className="rounded-lg w-full mr-auto bg-transparent">
        <Spacer>
          <FormFieldRow rowCols={4}>
            {(['company_reference_number', 'agent_reference_number', 'fx_currency'] as const).map(
              (name) => {
                const field = transactionBasicDetailsConfig.find((f) => f.name === name) as FieldConfig;
                 let fieldWithOptions = field;
                  if (name === 'fx_currency') {
                    fieldWithOptions = { ...field, options: currenyCodeType };
                  }
                return (
                  <FieldWrapper key={name}>
                    {getController({ ...fieldWithOptions, name: `transactionDetails.${name}`, control, errors })}
                  </FieldWrapper>
                );
              }
            )}
          </FormFieldRow>
          <FormFieldRow rowCols={4}>
            {(['fx_amount','company_settlement_rate', 'add_margin', 'customer_rate'] as const).map((name) => {
              const field = transactionBasicDetailsConfig.find((f) => f.name === name) as FieldConfig;
              return (
                <FieldWrapper key={name}>
                  {getController({ ...field, name: `transactionDetails.${name}`, control, errors })}
                </FieldWrapper>
              );
            })}
          </FormFieldRow>
          <FormFieldRow rowCols={4}>
            {(['nostro_charges','purpose'] as const).map((name) => {
              const field = transactionBasicDetailsConfig.find((f) => f.name === name) as FieldConfig;
              let fieldWithOptions = field;
               if (name === 'purpose') {
                    fieldWithOptions = { ...field, options: filteredPurposeOptions };
                  }
              return (
                <FieldWrapper key={name}>
                  {getController({ ...fieldWithOptions, name: `transactionDetails.${name}`, control, errors })}
                </FieldWrapper>
              );
            })}
          </FormFieldRow>
          <p className="font-semibold text-gray-600">KYC Details</p>
          <>
            <FormFieldRow rowCols={4}>
              {([ 'applicant_email','applicant_mobile_number', 'source_of_funds', 'paid_by'] as const).map((name) => {
                if ((name === 'paid_by') && sourceOfFunds !== 'others') {
                  return null;
                }
                const field = transactionBasicDetailsConfig.find((f) => f.name === name) as FieldConfig;
                return (
                  <FieldWrapper key={name}>
                    {getController({ ...field, name: `transactionDetails.${name}`, control, errors })}
                  </FieldWrapper>
                );
              })}
            </FormFieldRow>
            <FormFieldRow rowCols={4}>
              {([ 'payee_name','payee_pan_number', 'payee_dob'] as const).map((name) => {
                if ((name === 'payee_name' || name === 'payee_pan_number' || name === 'payee_dob') && sourceOfFunds !== 'others') {
                  return null;
                }
                const field = transactionBasicDetailsConfig.find((f) => f.name === name) as FieldConfig;
                return (
                  <FieldWrapper key={name}>
                    {getController({ ...field, name: `transactionDetails.${name}`, control, errors })}
                  </FieldWrapper>
                );
              })}
            </FormFieldRow>
            <FormFieldRow rowCols={4}>
              {(['passport_number', 'passport_issued_date', 'passport_expiry_date', 'place_of_issue'] as const).map(
                (name) => {
                  const field = transactionBasicDetailsConfig.find((f) => f.name === name) as FieldConfig;
                  return (
                    <FieldWrapper key={name}>
                      {getController({ ...field, name: `transactionDetails.${name}`, control, errors })}
                    </FieldWrapper>
                  );
                }
              )}
            </FormFieldRow>
            <FormFieldRow rowCols={4}>
              {(['applicant_address', 'applicant_city', 'applicant_state','applicant_country'] as const).map((name) => {
                const field = transactionBasicDetailsConfig.find((f) => f.name === name) as FieldConfig;
                return (
                  <FieldWrapper key={name}>
                    {getController({ ...field, name: `transactionDetails.${name}`, control, errors })}
                  </FieldWrapper>
                );
              })}
            </FormFieldRow>
            <FormFieldRow rowCols={4}>
              {(['postal_code'] as const).map((name) => {
                const field = transactionBasicDetailsConfig.find((f) => f.name === name) as FieldConfig;
                return (
                  <FieldWrapper key={name}>
                    {getController({ ...field, name: `transactionDetails.${name}`, control, errors })}
                  </FieldWrapper>
                );
              })}
            </FormFieldRow>
          </>
        </Spacer>
      </FormContentWrapper>
    </Spacer>
  );
};

export default TransactionBasicDetails;
