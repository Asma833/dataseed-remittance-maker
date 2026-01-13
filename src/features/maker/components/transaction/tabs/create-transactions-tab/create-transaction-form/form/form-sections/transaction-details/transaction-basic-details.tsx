import { FormContentWrapper } from '@/components/form/wrapper/form-content-wrapper';
import Spacer from '@/components/form/wrapper/spacer';
import { CommonCreateTransactionProps } from '@/features/maker/components/transaction/types/create-transaction.types';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import { getController } from '@/components/form/utils/get-controller';
import transactionBasicDetailsConfig from './transaction-basic-details.config';
import { useFormContext, useWatch } from 'react-hook-form';
import { useGetCurrencyRates as useGetAllCurrencyRates } from '@/hooks/useCurrencyRate';
import { useGetCurrencyRates as useGetSpecificCurrencyRates } from '@/features/maker/components/transaction/hooks/useCurrencyRate';
import { FieldConfig } from '../../../types/createTransactionForm.types';
import { useGetData } from '@/hooks/useGetData';
import { queryKeys } from '@/core/constant/query-keys';
import { API } from '@/core/constant/apis';
import { useMemo, useEffect, useCallback, useRef } from 'react';
import { debounce } from 'lodash';
import { TransactionPurposeMap } from '@/types/common/transaction-form.types';

const TransactionBasicDetails = ({ setAccordionState }: CommonCreateTransactionProps) => {
  const {
    control,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  // Add a ref to track previous settlement rate to prevent unnecessary updates
  const prevSettlementRateRef = useRef<number | null>(null);
  const fxCurrency = useWatch({ control, name: 'transactionDetails.fx_currency' });
  const { data: allCurrencyRates, isLoading: currencyLoading } = useGetAllCurrencyRates();
  // Only fetch specific currency rates if fxCurrency is a non-empty string
  const { data: specificCurrencyRate } = useGetSpecificCurrencyRates(
    fxCurrency && typeof fxCurrency === 'string' && fxCurrency.trim() ? fxCurrency.trim() : ''
  );
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
  const sourceOfFunds = useWatch({ control, name: 'transactionDetails.source_of_funds' });
  const companySettlementRate = useWatch({ control, name: 'transactionDetails.company_settlement_rate' });
  const addMargin = useWatch({ control, name: 'transactionDetails.add_margin' });
  const fxAmount = useWatch({ control, name: 'transactionDetails.fx_amount' });
  const selectedTransactionTypeId = '3f9fbf53-057f-4cf7-90f5-5035edd2e158';
  // Filter purpose types based on selected transaction type
  const purposeTypesForSelectedTransaction = selectedTransactionTypeId
    ? mappedPurposeTransactionTypesData && Array.isArray(mappedPurposeTransactionTypesData)
      ? (mappedPurposeTransactionTypesData as TransactionPurposeMap[])
          .filter((item) => item.transactionType.id === selectedTransactionTypeId)
          .map((item) => ({
            value: item.purpose.purpose_name,
            label: item.purpose.purpose_name,
            typeId: item.id,
          }))
      : []
    : [];

  const filteredPurposeOptions = purposeTypesForSelectedTransaction.reduce(
    (acc, item) => {
      acc[item.value] = { label: item.label };
      return acc;
    },
    {} as Record<string, { label: string }>
  );

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
      (item) => item.transactionType.id === selectedTransactionType && item.purpose.purpose_name === selectedPurposeType
    );
  }, [selectedTransactionType, selectedPurposeType, mappedPurposeTransactionTypesData]);

  useEffect(() => {
    if (selectedMapping?.id) {
      setValue('transactionDetails.transaction_purpose_map_id', selectedMapping.id);
    }
  }, [selectedMapping, setValue]);

  useEffect(() => {
    if (fxCurrency && specificCurrencyRate && typeof fxCurrency === 'string') {
      const rate = specificCurrencyRate;
      const buyRate = Number(rate.card_buy_rate);
      // Only update if the currency codes match, the rate is valid, and different from previous value
      if (
        rate.currency_code === fxCurrency.trim() &&
        !isNaN(buyRate) &&
        buyRate > 0 &&
        prevSettlementRateRef.current !== buyRate
      ) {
        // Update the ref with the new value
        prevSettlementRateRef.current = buyRate;
        // Set the value with options to prevent unnecessary validation/marking as dirty
        setValue('transactionDetails.company_settlement_rate', buyRate, {
          shouldValidate: false,
          shouldDirty: false,
        });
      }
    }
  }, [fxCurrency, specificCurrencyRate, setValue]);

  // Debounced calculation function
  const debouncedCalculateCustomerRate = useCallback(
    debounce((settlementRate: number, margin: number) => {
      const calculatedCustomerRate = Number(settlementRate || 0) + Number(margin || 0);
      setValue('transactionDetails.customer_rate', calculatedCustomerRate, {
        shouldValidate: false,
        shouldDirty: false,
      });
    }, 1000), // Reduced debounce time for better responsiveness
    [setValue]
  );

  // Add a ref to track previous customer rate calculation
  const prevCustomerRateParamsRef = useRef<{ settlementRate: number | null; margin: number | null }>({
    settlementRate: null,
    margin: null,
  });

  useEffect(() => {
    if (fxAmount != null && companySettlementRate != null) {
      const margin = addMargin || 0;

      // Only recalculate if the values have changed
      if (
        prevCustomerRateParamsRef.current.settlementRate !== companySettlementRate ||
        prevCustomerRateParamsRef.current.margin !== margin
      ) {
        // Update the ref with new values
        prevCustomerRateParamsRef.current = {
          settlementRate: companySettlementRate,
          margin: margin,
        };

        // Use the debounced function to calculate and set the customer rate
        debouncedCalculateCustomerRate(companySettlementRate, margin);
      }
    }

    // Cleanup function to cancel pending debounced calls
    return () => {
      debouncedCalculateCustomerRate.cancel();
    };
  }, [fxAmount, companySettlementRate, addMargin, debouncedCalculateCustomerRate]);

  // Clear payee fields when source_of_funds is not 'others'
  useEffect(() => {
    if (sourceOfFunds !== 'others') {
      const options = { shouldValidate: false, shouldDirty: false };
      setValue('transactionDetails.paid_by', '', options);
      setValue('transactionDetails.payee_name', '', options);
      setValue('transactionDetails.payee_pan_number', '', options);
      setValue('transactionDetails.payee_dob', '', options);
      
      clearErrors([
        'transactionDetails.paid_by', 
        'transactionDetails.payee_name', 
        'transactionDetails.payee_pan_number', 
        'transactionDetails.payee_dob'
      ]);
    }
  }, [sourceOfFunds, setValue, clearErrors]);
  const currencyCodeType =
    allCurrencyRates?.reduce((acc: Record<string, { label: string }>, currency) => {
      acc[currency.currency_code] = { label: currency.currency_code };
      return acc;
    }, {}) || {};

  return (
    <Spacer>
      <FormContentWrapper className="rounded-lg w-full mr-auto bg-transparent">
        <Spacer>
          <FormFieldRow wrapperClassName="xl:row-cols-4">
            {(['company_reference_number', 'agent_reference_number', 'fx_currency'] as const).map((name) => {
              const field = transactionBasicDetailsConfig.find((f) => f.name === name) as FieldConfig;
              let fieldWithOptions = field;
              if (name === 'fx_currency') {
                fieldWithOptions = { ...field, options: currencyCodeType };
              }
              return (
                <FieldWrapper key={name}>
                  {getController({ ...fieldWithOptions, name: `transactionDetails.${name}`, control, errors })}
                </FieldWrapper>
              );
            })}
          </FormFieldRow>
          <FormFieldRow wrapperClassName="xl:row-cols-4">
            {(['fx_amount', 'company_settlement_rate', 'add_margin', 'customer_rate'] as const).map((name) => {
              const field = transactionBasicDetailsConfig.find((f) => f.name === name) as FieldConfig;
              return (
                <FieldWrapper key={name}>
                  {getController({ ...field, name: `transactionDetails.${name}`, control, errors })}
                </FieldWrapper>
              );
            })}
          </FormFieldRow>
          <FormFieldRow wrapperClassName="xl:row-cols-4">
            {(['nostro_charges', 'purpose'] as const).map((name) => {
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
            <FormFieldRow wrapperClassName="xl:row-cols-4">
              {(['applicant_email', 'applicant_mobile_number', 'applicant_pan_number', 'source_of_funds'] as const).map(
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
            <FormFieldRow wrapperClassName="xl:row-cols-4">
              {(['paid_by', 'payee_name', 'payee_pan_number', 'payee_dob'] as const).map((name) => {
                if (
                  (name === 'paid_by' ||
                    name === 'payee_name' ||
                    name === 'payee_pan_number' ||
                    name === 'payee_dob') &&
                  sourceOfFunds !== 'others'
                ) {
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
            <FormFieldRow wrapperClassName="xl:row-cols-4">
              {(['passport_number', 'passport_issue_date', 'passport_expiry_date', 'place_of_issue'] as const).map(
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
            <FormFieldRow wrapperClassName="xl:row-cols-4">
              {(['applicant_address', 'applicant_city', 'applicant_state', 'applicant_country'] as const).map(
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
            <FormFieldRow wrapperClassName="xl:row-cols-4">
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
