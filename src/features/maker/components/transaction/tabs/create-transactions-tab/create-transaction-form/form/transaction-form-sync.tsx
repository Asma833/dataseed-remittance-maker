import { useEffect, memo, useRef } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useFormContext, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateTransactionField } from '@/features/maker/store/transaction-form-slice';
import { RootState } from '@/store';
import { useGetCurrencyRates as useGetSpecificCurrencyRates } from '@/features/maker/components/transaction/hooks/useCurrencyRate';

/**
 * TransactionFormSync
 * This component stays mounted for the life of the form.
 * It handles:
 * 1. Syncing form values (Transaction Details) to Redux.
 * 2. Syncing Redux values (Calculations/Shared State) back to Currency Details fields.
 */
const TransactionFormSync = memo(() => {
  const dispatch = useDispatch();
  const { setValue, control } = useFormContext();
  const reduxState = useSelector((state: RootState) => state.transactionForm);

  // 1. Watch all fields for Redux Sync in one go
  const allValues = useWatch({
    control,
    name: [
      'transactionDetails.fx_currency',
      'transactionDetails.fx_amount',
      'transactionDetails.company_settlement_rate',
      'transactionDetails.add_margin',
      'transactionDetails.customer_rate',
      'transactionDetails.applicant_pan_number',
      'transactionDetails.source_of_funds',
      'transactionDetails.purpose',
      'transactionDetails.nostro_charges'
    ]
  });

  const [
    rawFxCurrency,
    rawFxAmount,
    rawSettlementRate,
    rawAddMargin,
    rawCustomerRate,
    rawPanNumber,
    rawSourceOfFunds,
    rawPurpose,
    rawNostroCharges
  ] = allValues;

  // Single debounce for all values to prevent timer thrashing
  const debouncedValues = useDebounce(allValues, 300);
  
  const [
    debouncedFxCurrency,
    debouncedFxAmount,
    debouncedSettlementRate,
    debouncedAddMargin,
    debouncedCustomerRate,
    debouncedPanNumber,
    debouncedSourceOfFunds,
    debouncedPurpose,
    debouncedNostroCharges
  ] = debouncedValues;

  // Side Effect: Fetch Specific Currency Rate (Use Debounced Value to save requests)
  const { data: specificCurrencyRate } = useGetSpecificCurrencyRates(
    debouncedFxCurrency && typeof debouncedFxCurrency === 'string' && debouncedFxCurrency.trim() ? debouncedFxCurrency.trim() : ''
  );

  // Side Effect: Update Company Settlement Rate when Currency Changes
  const prevSettlementRateRef = useRef<number | null>(null);
  useEffect(() => {
    // Only update if currency matches and valid
    if (debouncedFxCurrency && specificCurrencyRate && typeof debouncedFxCurrency === 'string') {
      const rate = specificCurrencyRate;
      const buyRate = Number(rate.card_buy_rate);
      if (
        rate.currency_code === debouncedFxCurrency.trim() &&
        !isNaN(buyRate) &&
        buyRate > 0 &&
        prevSettlementRateRef.current !== buyRate
      ) {
        prevSettlementRateRef.current = buyRate;
        setValue('transactionDetails.company_settlement_rate', buyRate, { shouldValidate: false, shouldDirty: false });
      }
    }
  }, [debouncedFxCurrency, specificCurrencyRate, setValue]);

  // Side Effect: Clear Payee Fields when Source of Funds is not 'others'
  const { clearErrors } = useFormContext(); 
  useEffect(() => {
    if (debouncedSourceOfFunds !== 'others') {
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
  }, [debouncedSourceOfFunds, setValue, clearErrors]);

  // Calculate Customer Rate (Settlement + Margin)
  useEffect(() => {
    if (debouncedSettlementRate != null) {
        const rate = Number(debouncedSettlementRate || 0);
        const margin = Number(debouncedAddMargin || 0);
        const calculatedCustomerRate = rate + margin;
        
        setValue('transactionDetails.customer_rate', calculatedCustomerRate, { shouldValidate: false, shouldDirty: false });
    }
  }, [debouncedSettlementRate, debouncedAddMargin, setValue]);

  // Sync Transaction Details TO Redux - Single Effect
  useEffect(() => {
    dispatch(
      updateTransactionField({
        fx_currency: typeof debouncedFxCurrency === 'string' ? debouncedFxCurrency.trim() : debouncedFxCurrency,
        fx_amount: Number(debouncedFxAmount || 0),
        company_settlement_rate: Number(debouncedSettlementRate || 0),
        add_margin: Number(debouncedAddMargin || 0),
        customer_rate: Number(debouncedCustomerRate || 0),
        applicant_pan_number: debouncedPanNumber,
        source_of_funds: debouncedSourceOfFunds,
        purpose: debouncedPurpose,
        nostro_charges: debouncedNostroCharges || '',
      })
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValues, dispatch]); // Depend on the array itself

  // 2. Sync Redux State BACK TO Currency Details (Panel 3)
  // This ensures that when Panel 3 mounts, it immediately has the latest values from Redux
  const {
    fx_currency: fxCurrency,
    fx_amount: fxAmount,
    company_settlement_rate: settlementRate,
    customer_rate: customerRate,
    add_margin: addMargin,
    nostro_charges: selectedNostroType,
  } = reduxState;

  useEffect(() => {
    if (fxCurrency && typeof fxCurrency === 'string') {
      setValue('currencyDetails.fx_currency', fxCurrency.trim(), { shouldValidate: false, shouldDirty: false });
    }
    if (fxAmount != null) {
      setValue('currencyDetails.fx_amount', fxAmount, { shouldValidate: false, shouldDirty: false });
    }
    if (settlementRate != null) {
      setValue('currencyDetails.settlement_rate', settlementRate, { shouldValidate: false, shouldDirty: false });
      // In the table, company_rate for transaction value should be the settlement rate
      setValue('currencyDetails.invoiceRateTable.transaction_value.company_rate', settlementRate, {
        shouldValidate: false,
        shouldDirty: false,
      });
    }

    if (customerRate != null) {
      setValue('currencyDetails.customer_rate', customerRate, { shouldValidate: false, shouldDirty: false });
    }

    if (addMargin != null) {
      setValue('currencyDetails.add_margin', addMargin, { shouldValidate: false, shouldDirty: false });
      setValue('currencyDetails.invoiceRateTable.transaction_value.agent_mark_up', addMargin, {
        shouldValidate: false,
        shouldDirty: false,
      });
    }

    if (fxAmount && customerRate) {
      const rate = Number(customerRate) * Number(fxAmount);
      setValue('currencyDetails.invoiceRateTable.transaction_value.rate', rate, {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
  }, [fxCurrency, fxAmount, settlementRate, customerRate, addMargin, selectedNostroType, setValue]);

  return null;
});

export default TransactionFormSync;
