import Spacer from '@/components/form/wrapper/spacer';
import { currencyDetailsConfig } from './currency-details.config';
import RateTable from '../../../../../../../rate-table/rate-table';
import { CommonCreateTransactionProps } from '@/features/maker/types/create-transaction.types';
import { useState, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import FormFieldRow from '@/components/form/wrapper/form-field-row';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import { getController } from '@/components/form/utils/get-controller';
import { Button } from '@/components/ui/button';
import { FieldConfig } from '../../../types/createTransactionForm.types';
import { useGetCurrencyRates } from '@/hooks/useCurrencyRate';

const CurrencyDetails = ({ setAccordionState }: CommonCreateTransactionProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const {
    control,
    formState: { errors },
    trigger,
    setValue,
  } = useFormContext();
  const { data: currencyRates, isLoading: currencyLoading } = useGetCurrencyRates();

  const currencyOptions =
    currencyRates?.reduce((acc: Record<string, { label: string }>, currency) => {
      acc[currency.currency_code] = { label: currency.currency_code };
      return acc;
    }, {}) || {};

  // Watch values from TransactionBasicDetails
  const fxCurrency = useWatch({ control, name: 'transactionDetails.fx_currency' });
  const fxAmount = useWatch({ control, name: 'transactionDetails.fx_amount' });
  const companySettlementRate = useWatch({ control, name: 'transactionDetails.company_settlement_rate' });
  const addMargin = useWatch({ control, name: 'transactionDetails.add_margin' });
  const customerRate = useWatch({ control, name: 'transactionDetails.customer_rate' });

  // Sync values from TransactionBasicDetails to CurrencyDetails
  useEffect(() => {
    if (fxCurrency && typeof fxCurrency === 'string' && fxCurrency.trim().length >= 3 && currencyOptions[fxCurrency.trim()]) {
      setValue('currencyDetails.fx_currency', fxCurrency.trim(), { shouldValidate: false, shouldDirty: false });
    }
  }, [fxCurrency, currencyOptions, setValue]);

  useEffect(() => {
    if (fxAmount && !isNaN(Number(fxAmount))) {
      setValue('currencyDetails.fx_amount', fxAmount, { shouldValidate: false, shouldDirty: false });
    }
  }, [fxAmount, setValue]);

  useEffect(() => {
    if (companySettlementRate && !isNaN(Number(companySettlementRate))) {
      setValue('currencyDetails.settlement_rate', companySettlementRate, { shouldValidate: false, shouldDirty: false });
    }
  }, [companySettlementRate, setValue]);

  useEffect(() => {
    if (addMargin && !isNaN(Number(addMargin))) {
      setValue('currencyDetails.add_margin', addMargin, { shouldValidate: false, shouldDirty: false });
    }
  }, [addMargin, setValue]);

  useEffect(() => {
    if (customerRate && !isNaN(Number(customerRate))) {
      setValue('currencyDetails.customer_rate', customerRate, { shouldValidate: false, shouldDirty: false });
    }
  }, [customerRate, setValue]);

  const handleSave = async () => {
    const isValid = await trigger();
    if (!isValid) {
      return;
    }
    setIsSaving(true);
    try {
      // TODO: Implement actual save functionality, e.g., using useCreateTransaction hook
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Spacer>
      <FormFieldRow rowCols={2} wrapperClassName="flex-row md:!flex-nowrap items-start">
        <div className="flex flex-wrap w-1/2 gap-4">
          <FormFieldRow rowCols={2} className="w-full">
            {(['fx_currency', 'fx_amount'] as const).map((name) => {
              const field = currencyDetailsConfig.find((f) => f.name === name) as FieldConfig;
              let fieldWithOptions = field;
              if (name === 'fx_currency') {
                fieldWithOptions = { ...field, options: currencyOptions };
              }
              return (
                <FieldWrapper key={name}>
                  {getController({ ...fieldWithOptions, name: `currencyDetails.${name}`, control, errors })}
                </FieldWrapper>
              );
            })}
          </FormFieldRow>
          <FormFieldRow rowCols={2} className="w-full">
            {(['settlement_rate', 'add_margin'] as const).map((name) => {
              const field = currencyDetailsConfig.find((f) => f.name === name) as FieldConfig;
              return (
                <FieldWrapper key={name}>
                  {getController({ ...field, name: `currencyDetails.${name}`, control, errors })}
                </FieldWrapper>
              );
            })}
          </FormFieldRow>
          <FormFieldRow rowCols={2} className="w-full">
            {(['customer_rate', 'declared_education_loan_amount'] as const).map((name) => {
              const field = currencyDetailsConfig.find((f) => f.name === name) as FieldConfig;
              return (
                <FieldWrapper key={name}>
                  {getController({ ...field, name: `currencyDetails.${name}`, control, errors })}
                </FieldWrapper>
              );
            })}
          </FormFieldRow>
          <FormFieldRow rowCols={2} className="w-full">
            {(['previous_transaction_amount', 'declared_previous_amount'] as const).map((name) => {
              const field = currencyDetailsConfig.find((f) => f.name === name) as FieldConfig;
              return (
                <FieldWrapper key={name}>
                  {getController({ ...field, name: `currencyDetails.${name}`, control, errors })}
                </FieldWrapper>
              );
            })}
          </FormFieldRow>
          <FormFieldRow rowCols={2} className="w-full">
            {(['total_transaction_amount_tcs'] as const).map((name) => {
              const field = currencyDetailsConfig.find((f) => f.name === name) as FieldConfig;
              return (
                <FieldWrapper key={name}>
                  {getController({ ...field, name: `currencyDetails.${name}`, control, errors })}
                </FieldWrapper>
              );
            })}
          </FormFieldRow>
        </div>
        <div className="flex flex-wrap w-1/2">
          <RateTable
            id={'invoiceRateTable'}
            mode={'edit'}
            totalAmount={123}
            editableFields={['remittanceCharges.agentMarkUp', 'nostroCharges.agentMarkUp', 'otherCharges.agentMarkUp']}
          />
        </div>
      </FormFieldRow>
      <div className="flex justify-center items-center">
        <Button variant="secondary" onClick={handleSave} disabled={isSaving} className="mx-2 w-24">
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </Spacer>
  );
};

export default CurrencyDetails;
