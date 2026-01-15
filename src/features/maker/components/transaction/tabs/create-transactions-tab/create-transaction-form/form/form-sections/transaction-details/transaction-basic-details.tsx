import { useMemo, useEffect, useCallback, useRef, memo } from 'react';
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
import { debounce } from 'lodash';
import { TransactionPurposeMap } from '@/types/common/transaction-form.types';
import { useDispatch } from 'react-redux';
import { updateTransactionField } from '@/features/maker/store/transaction-form-slice';
import { AppDispatch } from '@/store';

const PurposeFieldWrapper = ({ formControl }: { formControl: any }) => {
    const { setValue } = useFormContext();

    const { data: mappedPurposeTransactionTypesData } = useGetData<TransactionPurposeMap[]>({
        endpoint: API.PURPOSE.TRANSACTION_MAPPING,
        queryKey: ['masters', 'documentMapping'],
        dataPath: 'data',
    });

    const selectedTransactionTypeId = '3f9fbf53-057f-4cf7-90f5-5035edd2e158';

    const filteredPurposeOptions = useMemo(() => {
        if (!mappedPurposeTransactionTypesData || !Array.isArray(mappedPurposeTransactionTypesData)) return {};
        return (mappedPurposeTransactionTypesData as TransactionPurposeMap[])
            .filter((item) => item.transactionType.id === selectedTransactionTypeId)
            .reduce((acc: Record<string, { label: string }>, item) => {
                acc[item.purpose.purpose_name] = { label: item.purpose.purpose_name };
                return acc;
            }, {});
    }, [mappedPurposeTransactionTypesData, selectedTransactionTypeId]);

    const purposeValue = useWatch({ control: formControl, name: 'transactionDetails.purpose' });
    const selectedMapping = useMemo(() => {
        if (!mappedPurposeTransactionTypesData || !Array.isArray(mappedPurposeTransactionTypesData) || !purposeValue) return null;
        return (mappedPurposeTransactionTypesData as TransactionPurposeMap[]).find(
            (item) => item.transactionType.id === selectedTransactionTypeId && item.purpose.purpose_name === purposeValue
        );
    }, [mappedPurposeTransactionTypesData, purposeValue, selectedTransactionTypeId]);

    useEffect(() => {
        if (selectedMapping?.id) {
            setValue('transactionDetails.transaction_purpose_map_id', selectedMapping.id, {
                shouldValidate: false,
                shouldDirty: false,
            });
        }
    }, [selectedMapping, setValue]);

    const field = transactionBasicDetailsConfig.find((f) => f.name === 'purpose') as FieldConfig;
    
    return (
        <FieldWrapper key="purpose">
            {getController({ 
                ...field, 
                options: filteredPurposeOptions, 
                name: `transactionDetails.purpose`, 
                control: formControl, 
                errors: undefined 
            })}
        </FieldWrapper>
    );
};

const ReduxFormSync = ({ formControl }: { formControl: any }) => {
  const dispatch = useDispatch<AppDispatch>();
  const control = formControl;

  const fxCurrency = useWatch({ control, name: 'transactionDetails.fx_currency' });
  const fxAmount = useWatch({ control, name: 'transactionDetails.fx_amount' });
  const companySettlementRate = useWatch({ control, name: 'transactionDetails.company_settlement_rate' });
  const addMargin = useWatch({ control, name: 'transactionDetails.add_margin' });
  const customerRate = useWatch({ control, name: 'transactionDetails.customer_rate' });
  const applicantPanNumber = useWatch({ control, name: 'transactionDetails.applicant_pan_number' });
  const sourceOfFunds = useWatch({ control, name: 'transactionDetails.source_of_funds' });
  const purpose = useWatch({ control, name: 'transactionDetails.purpose' });

  const debouncedDispatch = useMemo(
    () =>
      debounce((payload: any) => {
        dispatch(updateTransactionField(payload));
      }, 500),
    [dispatch]
  );

  useEffect(() => {
    debouncedDispatch({
      fx_currency: fxCurrency,
      fx_amount: Number(fxAmount) || 0,
      company_settlement_rate: Number(companySettlementRate) || 0,
      add_margin: Number(addMargin) || 0,
      customer_rate: Number(customerRate) || 0,
      applicant_pan_number: applicantPanNumber,
      source_of_funds: sourceOfFunds,
      purpose: purpose,
    });
  }, [
    fxCurrency,
    fxAmount,
    companySettlementRate,
    addMargin,
    customerRate,
    applicantPanNumber,
    sourceOfFunds,
    purpose,
    debouncedDispatch,
  ]);

  return null;
};

const SettlementRateUpdater = ({ formControl, fxCurrency }: { formControl: any; fxCurrency: string }) => {
    const { setValue } = useFormContext();
    const prevSettlementRateRef = useRef<number | null>(null);
    const { data: specificCurrencyRate } = useGetSpecificCurrencyRates(
        fxCurrency && typeof fxCurrency === 'string' && fxCurrency.trim() ? fxCurrency.trim() : ''
    );

    useEffect(() => {
        if (fxCurrency && specificCurrencyRate && typeof fxCurrency === 'string') {
          const rate = specificCurrencyRate;
          const buyRate = Number(rate.card_buy_rate);
          if (
            rate.currency_code === fxCurrency.trim() &&
            !isNaN(buyRate) &&
            buyRate > 0 &&
            prevSettlementRateRef.current !== buyRate
          ) {
            prevSettlementRateRef.current = buyRate;
            setValue('transactionDetails.company_settlement_rate', buyRate, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }
        }
      }, [fxCurrency, specificCurrencyRate, setValue]);

    return null;
};

const CustomerRateCalculator = ({ formControl }: { formControl: any }) => {
    const { setValue } = useFormContext();
    const fxAmount = useWatch({ control: formControl, name: 'transactionDetails.fx_amount' });
    const companySettlementRate = useWatch({ control: formControl, name: 'transactionDetails.company_settlement_rate' });
    const addMargin = useWatch({ control: formControl, name: 'transactionDetails.add_margin' });
    const prevCustomerRateParamsRef = useRef<{ settlementRate: number | null; margin: number | null }>({
        settlementRate: null,
        margin: null,
    });

    const debouncedCalculateCustomerRate = useCallback(
        debounce((settlementRate: number, margin: number) => {
          const calculatedCustomerRate = Number(settlementRate || 0) + Number(margin || 0);
          setValue('transactionDetails.customer_rate', calculatedCustomerRate, {
            shouldValidate: false,
            shouldDirty: false,
          });
        }, 800),
        [setValue]
    );

    useEffect(() => {
        if (fxAmount != null && companySettlementRate != null) {
          const margin = addMargin || 0;
          if (
            prevCustomerRateParamsRef.current.settlementRate !== companySettlementRate ||
            prevCustomerRateParamsRef.current.margin !== margin
          ) {
            prevCustomerRateParamsRef.current = {
              settlementRate: companySettlementRate,
              margin: margin,
            };
            debouncedCalculateCustomerRate(companySettlementRate, margin);
          }
        }
        return () => {
          debouncedCalculateCustomerRate.cancel();
        };
    }, [fxAmount, companySettlementRate, addMargin, debouncedCalculateCustomerRate]);

    return null;
};

const SourceOfFundsDependentFields = ({ formControl }: { formControl: any }) => {
    const { setValue, clearErrors } = useFormContext();
    const sourceOfFunds = useWatch({ control: formControl, name: 'transactionDetails.source_of_funds' });

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

    if (sourceOfFunds !== 'others') return null;

    return (
        <FormFieldRow wrapperClassName="xl:row-cols-4">
          {(['paid_by', 'payee_name', 'payee_pan_number', 'payee_dob'] as const).map((name) => {
            const field = transactionBasicDetailsConfig.find((f) => f.name === name) as FieldConfig;
            return (
              <FieldWrapper key={name}>
                {getController({ ...field, name: `transactionDetails.${name}`, control: formControl, errors: undefined })}
              </FieldWrapper>
            );
          })}
        </FormFieldRow>
    );
};

const TransactionBasicDetails = memo(({ setAccordionState }: CommonCreateTransactionProps) => {
  const { control } = useFormContext();
  const { data: allCurrencyRates } = useGetAllCurrencyRates();
  const fxCurrency = useWatch({ control, name: 'transactionDetails.fx_currency' });

  const currencyCodeType = useMemo(() => 
    allCurrencyRates?.reduce((acc: Record<string, { label: string }>, currency) => {
      acc[currency.currency_code] = { label: currency.currency_code };
      return acc;
    }, {}) || {}
  , [allCurrencyRates]);

  return (
    <Spacer>
      <ReduxFormSync formControl={control} />
      <SettlementRateUpdater formControl={control} fxCurrency={fxCurrency} />
      <CustomerRateCalculator formControl={control} />
      <FormContentWrapper className="rounded-lg w-full mr-auto bg-transparent">
        <Spacer>
          <FormFieldRow wrapperClassName="xl:row-cols-4">
            {(['agent_reference_number', 'fx_currency','fx_amount','company_settlement_rate' ] as const).map((name) => {
              const field = transactionBasicDetailsConfig.find((f) => f.name === name) as FieldConfig;
              let fieldWithOptions = field;
              if (name === 'fx_currency') {
                fieldWithOptions = { ...field, options: currencyCodeType };
              }
              return (
                <FieldWrapper key={name}>
                  {getController({ ...fieldWithOptions, name: `transactionDetails.${name}`, control, errors: undefined })}
                </FieldWrapper>
              );
            })}
          </FormFieldRow>
          <FormFieldRow wrapperClassName="xl:row-cols-4">
            {(['add_margin', 'customer_rate','nostro_charges'] as const).map((name) => {
              const field = transactionBasicDetailsConfig.find((f) => f.name === name) as FieldConfig;
              return (
                <FieldWrapper key={name}>
                  {getController({ ...field, name: `transactionDetails.${name}`, control, errors: undefined })}
                </FieldWrapper>
              );
            })}
            <PurposeFieldWrapper formControl={control} />
          </FormFieldRow>
          <p className="font-semibold text-gray-600">KYC Details</p>
          <>
            <FormFieldRow wrapperClassName="xl:row-cols-4">
              {(['applicant_name','applicant_dob', 'applicant_email', 'applicant_mobile_number'] as const).map(
                (name) => {
                  const field = transactionBasicDetailsConfig.find((f) => f.name === name) as FieldConfig;
                  return (
                    <FieldWrapper key={name}>
                      {getController({ ...field, name: `transactionDetails.${name}`, control, errors: undefined })}
                    </FieldWrapper>
                  );
                }
              )}
            </FormFieldRow>
            <FormFieldRow wrapperClassName="xl:row-cols-4">
              {(['applicant_pan_number', 'source_of_funds'] as const).map(
                (name) => {
                  const field = transactionBasicDetailsConfig.find((f) => f.name === name) as FieldConfig;
                  return (
                    <FieldWrapper key={name}>
                      {getController({ ...field, name: `transactionDetails.${name}`, control, errors: undefined })}
                    </FieldWrapper>
                  );
                }
              )}
            </FormFieldRow>
            <SourceOfFundsDependentFields formControl={control} />
            <FormFieldRow wrapperClassName="xl:row-cols-4">
              {(['passport_number', 'passport_issue_date', 'passport_expiry_date', 'place_of_issue'] as const).map(
                (name) => {
                  const field = transactionBasicDetailsConfig.find((f) => f.name === name) as FieldConfig;
                  return (
                    <FieldWrapper key={name}>
                      {getController({ ...field, name: `transactionDetails.${name}`, control, errors: undefined })}
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
                      {getController({ ...field, name: `transactionDetails.${name}`, control, errors: undefined })}
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
                    {getController({ ...field, name: `transactionDetails.${name}`, control, errors: undefined })}
                  </FieldWrapper>
                );
              })}
            </FormFieldRow>
          </>
        </Spacer>
      </FormContentWrapper>
    </Spacer>
  );
});

export default TransactionBasicDetails;
