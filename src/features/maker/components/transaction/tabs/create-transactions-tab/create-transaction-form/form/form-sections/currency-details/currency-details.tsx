import Spacer from '@/components/form/wrapper/spacer';
import { currencyDetailsConfig } from './currency-details.config';
import RateTable from '../../../../../../../rate-table/rate-table';
import { CommonCreateTransactionProps } from '@/features/maker/components/transaction/types/create-transaction.types';
import { useState, useEffect, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import FormFieldRow from '@/components/form/wrapper/form-field-row';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import { getController } from '@/components/form/utils/get-controller';
import { Button } from '@/components/ui/button';
import { FieldConfig } from '../../../types/createTransactionForm.types';
import { useGetCurrencyRates } from '@/hooks/useCurrencyRate';
import { useGstCalculation } from '@/features/maker/components/transaction/hooks/useGstCalculation';
import { useTcsCalculation } from '@/features/maker/components/transaction/hooks/useTcsCalculation';
import { useGetAgentDetails } from '@/features/maker/components/transaction/hooks/useGetAgentDetails';


const CurrencyDetails = ({ setAccordionState }: CommonCreateTransactionProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const mountedRef = useRef(false);
  const {
    control,
    formState: { errors },
    trigger,
    setValue,
  } = useFormContext();
  const { data: currencyRates, isLoading: currencyLoading } = useGetCurrencyRates();
  const { calculateGst } = useGstCalculation();
  const { calculateTcs } = useTcsCalculation();

  const fxCurrency = useWatch({ control, name: 'transactionDetails.fx_currency' });
  const { extractedMargins } = useGetAgentDetails(fxCurrency);
  
  const currencyOptions =
    currencyRates?.reduce((acc: Record<string, { label: string }>, currency) => {
      acc[currency.currency_code] = { label: currency.currency_code };
      return acc;
    }, {}) || {};

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Watch values from TransactionBasicDetails
  const fxAmount = useWatch({ control, name: 'transactionDetails.fx_amount' });
  const companySettlementRate = useWatch({ control, name: 'transactionDetails.company_settlement_rate' });
  const addMargin = useWatch({ control, name: 'transactionDetails.add_margin' });
  const customerRate = useWatch({ control, name: 'transactionDetails.customer_rate' });
  const purpose = useWatch({ control, name: 'transactionDetails.purpose' });
  const panNumber = useWatch({ control, name: 'transactionDetails.applicant_pan_number' });
  const sourceofFund = useWatch({ control, name: 'transactionDetails.source_of_funds' });
  const declarationAmt = useWatch({ control, name: 'currencyDetails.declared_previous_amount' });

  // Watch the entire invoiceRateTable to pass to RateTable
  const invoiceRateTable = useWatch({ control, name: 'currencyDetails.invoiceRateTable' });

  // Watch specific invoiceRateTable fields to avoid infinite loops
  const transactionValueCompanyRate = useWatch({
    control,
    name: 'currencyDetails.invoiceRateTable.transaction_value.company_rate',
  });
  const transactionValueAgentMarkUp = useWatch({
    control,
    name: 'currencyDetails.invoiceRateTable.transaction_value.agent_mark_up',
  });
  const remittanceCompanyRate = useWatch({
    control,
    name: 'currencyDetails.invoiceRateTable.remittance_charges.company_rate',
  });
  const remittanceAgentMarkUp = useWatch({
    control,
    name: 'currencyDetails.invoiceRateTable.remittance_charges.agent_mark_up',
  });
  const nostroCompanyRate = useWatch({ control, name: 'currencyDetails.invoiceRateTable.nostro_charges.company_rate' });
  const nostroAgentMarkUp = useWatch({
    control,
    name: 'currencyDetails.invoiceRateTable.nostro_charges.agent_mark_up',
  });
  const otherCompanyRate = useWatch({ control, name: 'currencyDetails.invoiceRateTable.other_charges.company_rate' });
  const otherAgentMarkUp = useWatch({ control, name: 'currencyDetails.invoiceRateTable.other_charges.agent_mark_up' });
  const transactionValueRate = useWatch({ control, name: 'currencyDetails.invoiceRateTable.transaction_value.rate' });
  const remittanceRate = useWatch({ control, name: 'currencyDetails.invoiceRateTable.remittance_charges.rate' });
  const nostroRate = useWatch({ control, name: 'currencyDetails.invoiceRateTable.nostro_charges.rate' });
  const otherRate = useWatch({ control, name: 'currencyDetails.invoiceRateTable.other_charges.rate' });
  const transactionAmount = useWatch({ control, name: 'currencyDetails.invoiceRateTable.transaction_amount.rate' });
  const gstAmount = useWatch({ control, name: 'currencyDetails.invoiceRateTable.gst_amount.rate' });
  const tcsAmount = useWatch({ control, name: 'currencyDetails.invoiceRateTable.tcs.rate' });
  const totalInrAmount = useWatch({ control, name: 'currencyDetails.invoiceRateTable.total_inr_amount.rate' });

  // Sync values from TransactionBasicDetails to CurrencyDetails
  useEffect(() => {
    if (
      fxCurrency &&
      typeof fxCurrency === 'string' &&
      fxCurrency.trim().length >= 3 &&
      currencyOptions[fxCurrency.trim()]
    ) {
      setValue('currencyDetails.fx_currency', fxCurrency.trim(), { shouldValidate: false, shouldDirty: false });
    }
  }, [fxCurrency, currencyOptions]);

  useEffect(() => {
    if (fxAmount && !isNaN(Number(fxAmount))) {
      setValue('currencyDetails.fx_amount', fxAmount, { shouldValidate: false, shouldDirty: false });
    }
  }, [fxAmount]);

  useEffect(() => {
    if (companySettlementRate && !isNaN(Number(companySettlementRate))) {
      setValue('currencyDetails.settlement_rate', companySettlementRate, { shouldValidate: false, shouldDirty: false });
    }
  }, [companySettlementRate, setValue]);

  useEffect(() => {
    if (addMargin != null && !isNaN(Number(addMargin))) {
      setValue('currencyDetails.add_margin', addMargin, { shouldValidate: false, shouldDirty: false });
      // Set agent_mark_up fields
      setValue('currencyDetails.invoiceRateTable.transaction_value.agent_mark_up', Number(addMargin), {
        shouldValidate: false,
        shouldDirty: false,
      });
      setValue('currencyDetails.invoiceRateTable.remittance_charges.agent_mark_up', Number(addMargin), {
        shouldValidate: false,
        shouldDirty: false,
      });
      setValue('currencyDetails.invoiceRateTable.nostro_charges.agent_mark_up', Number(addMargin), {
        shouldValidate: false,
        shouldDirty: false,
      });
      setValue('currencyDetails.invoiceRateTable.other_charges.agent_mark_up', Number(addMargin), {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
  }, [addMargin, setValue]);

  useEffect(() => {
    if (customerRate && !isNaN(Number(customerRate))) {
      setValue('currencyDetails.customer_rate', customerRate, { shouldValidate: false, shouldDirty: false });
    }
  }, [customerRate]);

  // Set transaction_value.company_rate to companySettlementRate
  useEffect(() => {
    if (mountedRef.current && companySettlementRate) {
      setValue('currencyDetails.invoiceRateTable.transaction_value.company_rate', Number(companySettlementRate), {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
  }, [companySettlementRate, setValue]);

  // Set company rates from agent details

  useEffect(() => {

    if (mountedRef.current && extractedMargins) {

      setValue('currencyDetails.invoiceRateTable.remittance_charges.company_rate', extractedMargins.productMargin, {
        shouldValidate: false,
        shouldDirty: false,
      });

      setValue('currencyDetails.invoiceRateTable.nostro_charges.company_rate', extractedMargins.nostroMargin, {
        shouldValidate: false,
        shouldDirty: false,
      });

      setValue('currencyDetails.invoiceRateTable.other_charges.company_rate', extractedMargins.otherChargesRate, {
        shouldValidate: false,
        shouldDirty: false,
      });

    }

  }, [extractedMargins, setValue]);

  // Calculate transaction_value.rate as company_settlement_rate + add_margin
  // Calculate transaction_value.rate as company_rate + agent_mark_up
  useEffect(() => {
    if (mountedRef.current && transactionValueCompanyRate != null && transactionValueAgentMarkUp != null) {
      const rate = Number(transactionValueCompanyRate) + Number(transactionValueAgentMarkUp);
      setValue('currencyDetails.invoiceRateTable.transaction_value.rate', rate, {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
  }, [transactionValueCompanyRate, transactionValueAgentMarkUp, setValue]);

  // Calculate remittance_charges.rate as company_rate + agent_mark_up
  useEffect(() => {
    if (mountedRef.current && remittanceCompanyRate != null && remittanceAgentMarkUp != null) {
      const rate = Number(remittanceCompanyRate) + Number(remittanceAgentMarkUp);
      setValue('currencyDetails.invoiceRateTable.remittance_charges.rate', rate, {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
  }, [remittanceCompanyRate, remittanceAgentMarkUp, setValue]);

  // Calculate nostro_charges.rate as company_rate + agent_mark_up
  useEffect(() => {
    if (mountedRef.current && nostroCompanyRate != null && nostroAgentMarkUp != null) {
      const rate = Number(nostroCompanyRate) + Number(nostroAgentMarkUp);
      setValue('currencyDetails.invoiceRateTable.nostro_charges.rate', rate, {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
  }, [nostroCompanyRate, nostroAgentMarkUp, setValue]);

  // Calculate other_charges.rate as company_rate + agent_mark_up
  useEffect(() => {
    if (mountedRef.current && otherCompanyRate != null && otherAgentMarkUp != null) {
      const rate = Number(otherCompanyRate) + Number(otherAgentMarkUp);
      setValue('currencyDetails.invoiceRateTable.other_charges.rate', rate, {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
  }, [otherCompanyRate, otherAgentMarkUp, setValue]);

  useEffect(() => {
    if (
      mountedRef.current &&
      transactionValueRate != null &&
      remittanceRate != null &&
      nostroRate != null &&
      otherRate != null
    ) {
      const transactionAmt =
        Number(transactionValueRate) + Number(remittanceRate) + Number(nostroRate) + Number(otherRate);
      setValue('currencyDetails.invoiceRateTable.transaction_amount.rate', transactionAmt, {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
  }, [transactionValueRate, remittanceRate, nostroRate, otherRate]);

  useEffect(() => {
    if (mountedRef.current) {
      const totalInr = Number(transactionAmount || 0) + Number(gstAmount || 0) + Number(tcsAmount || 0);
      setValue('currencyDetails.invoiceRateTable.total_inr_amount.rate', totalInr, {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
  }, [transactionAmount, gstAmount, tcsAmount]);

  // GST Calculation
  useEffect(() => {
    if (mountedRef.current && transactionAmount && transactionAmount > 0) {
      const fetchGst = async () => {
        try {
          const response = await calculateGst({ txnAmount: transactionAmount.toString() });
          if (response.statuscode === "200" && response.responsecode === "success") {
            setValue('currencyDetails.invoiceRateTable.gst_amount.rate', Number(response.GST), {
              shouldValidate: false,
              shouldDirty: false,
            });
          } else {
            console.error('GST calculation failed:', response.responsemessage);
            setValue('currencyDetails.invoiceRateTable.gst_amount.rate', 0, {
              shouldValidate: false,
              shouldDirty: false,
            });
          }
        } catch (err) {
          console.error('Error calculating GST:', err);
          setValue('currencyDetails.invoiceRateTable.gst_amount.rate', 0, {
            shouldValidate: false,
            shouldDirty: false,
          });
        }
      };
      fetchGst();
    }
  }, [transactionAmount, calculateGst, setValue]);

  // TCS Calculation
  useEffect(() => {
    const amountBeforeTcs = Number(transactionAmount || 0) + Number(gstAmount || 0);
    const isEducation = (purpose || '').toLowerCase() === 'education';
    console.log('TCS Debug:', { amountBeforeTcs, purpose, panNumber, sourceofFund, declarationAmt, isEducation });
    if (
      mountedRef.current &&
      amountBeforeTcs > 0 &&
      purpose &&
      panNumber &&
      sourceofFund &&
      (!isEducation || declarationAmt)
    ) {
      const fetchTcs = async () => {
        try {
          const response = await calculateTcs({
            purpose: "Private Visit",
            panNumber,
            sourceofFund,
            declarationAmt: isEducation ? declarationAmt : '',
            txnAmount: amountBeforeTcs.toString(),
          });
          if (response.statuscode === "200" && response.responsecode === "success") {
            setValue('currencyDetails.invoiceRateTable.tcs.rate', Number(response.TCS), {
              shouldValidate: false,
              shouldDirty: false,
            });
            setValue('currencyDetails.total_transaction_amount_tcs', Number(response.TCS), {
              shouldValidate: false,
              shouldDirty: false,
            });
          } else {
            console.error('TCS calculation failed:', response.responsemessage);
            setValue('currencyDetails.invoiceRateTable.tcs.rate', 0, {
              shouldValidate: false,
              shouldDirty: false,
            });
            setValue('currencyDetails.total_transaction_amount_tcs', 0, {
              shouldValidate: false,
              shouldDirty: false,
            });
          }
        } catch (err) {
          console.error('Error calculating TCS:', err);
          setValue('currencyDetails.invoiceRateTable.tcs.rate', 0, {
            shouldValidate: false,
            shouldDirty: false,
          });
          setValue('currencyDetails.total_transaction_amount_tcs', 0, {
            shouldValidate: false,
            shouldDirty: false,
          });
        }
      };
      fetchTcs();
    }
  }, [transactionAmount, gstAmount, purpose, panNumber, sourceofFund, declarationAmt, calculateTcs, setValue]);

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
            {(
              [
                'customer_rate',
                ...((purpose || '').toLowerCase() === 'education' ? ['declared_education_loan_amount'] : []),
              ] as const
            ).map((name) => {
              const field = currencyDetailsConfig.find((f) => f.name === name) as FieldConfig;
              const isConditionalField = name === 'declared_education_loan_amount';
              return (
                <FieldWrapper key={name}>
                  {getController({
                    ...field,
                    required: isConditionalField ? (purpose || '').toLowerCase() === 'education' : field.required,
                    name: `currencyDetails.${name}`,
                    control,
                    errors,
                  })}
                </FieldWrapper>
              );
            })}
          </FormFieldRow>
          <FormFieldRow rowCols={2} className="w-full">
            {(
              [
                'previous_transaction_amount',
                ...((purpose || '').toLowerCase() === 'education' ? ['declared_previous_amount'] : []),
              ] as const
            ).map((name) => {
              const field = currencyDetailsConfig.find((f) => f.name === name) as FieldConfig;
              const isConditionalField = name === 'declared_previous_amount';
              return (
                <FieldWrapper key={name}>
                  {getController({
                    ...field,
                    required: isConditionalField ? (purpose || '').toLowerCase() === 'education' : field.required,
                    name: `currencyDetails.${name}`,
                    control,
                    errors,
                  })}
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
            id={'currencyDetails.invoiceRateTable'}
            mode={'edit'}
            totalAmount={totalInrAmount || 0}
            editableFields={[
              'transaction_value.agent_mark_up',
              'remittance_charges.agent_mark_up',
              'nostro_charges.agent_mark_up',
              'other_charges.agent_mark_up',
            ]}
            invoiceData={invoiceRateTable}
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

