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

  // 1. Watch individual fields from Transaction Details (Panel 1) to avoid object-level re-renders
  const rawFxCurrency = useWatch({ control, name: 'transactionDetails.fx_currency' });
  const rawFxAmount = useWatch({ control, name: 'transactionDetails.fx_amount' });
  const rawSettlementRate = useWatch({ control, name: 'transactionDetails.company_settlement_rate' });
  const rawAddMargin = useWatch({ control, name: 'transactionDetails.add_margin' });
  const rawCustomerRate = useWatch({ control, name: 'transactionDetails.customer_rate' });
  const rawPanNumber = useWatch({ control, name: 'transactionDetails.applicant_pan_number' });
  const rawSourceOfFunds = useWatch({ control, name: 'transactionDetails.source_of_funds' });
  const rawPurpose = useWatch({ control, name: 'transactionDetails.purpose' });
  const rawNostroCharges = useWatch({ control, name: 'transactionDetails.nostro_charges' });

  // Low-priority / Debounced Watches
  const debouncedFxCurrency = useDebounce(rawFxCurrency, 300);
  const debouncedFxAmount = useDebounce(rawFxAmount, 300);
  const debouncedSettlementRate = useDebounce(rawSettlementRate, 300);
  const debouncedAddMargin = useDebounce(rawAddMargin, 300);
  const debouncedCustomerRate = useDebounce(rawCustomerRate, 300);
  const debouncedPanNumber = useDebounce(rawPanNumber, 300);
  const debouncedSourceOfFunds = useDebounce(rawSourceOfFunds, 300);
  const debouncedPurpose = useDebounce(rawPurpose, 300);
  const debouncedNostroCharges = useDebounce(rawNostroCharges, 300);


  // Side Effect: Fetch Specific Currency Rate
  const { data: specificCurrencyRate } = useGetSpecificCurrencyRates(
    rawFxCurrency && typeof rawFxCurrency === 'string' && rawFxCurrency.trim() ? rawFxCurrency.trim() : ''
  );

  // Side Effect: Update Company Settlement Rate when Currency Changes
  const prevSettlementRateRef = useRef<number | null>(null);
  useEffect(() => {
    if (rawFxCurrency && specificCurrencyRate && typeof rawFxCurrency === 'string') {
      const rate = specificCurrencyRate;
      const buyRate = Number(rate.card_buy_rate);
      if (
        rate.currency_code === rawFxCurrency.trim() &&
        !isNaN(buyRate) &&
        buyRate > 0 &&
        prevSettlementRateRef.current !== buyRate
      ) {
        prevSettlementRateRef.current = buyRate;
        setValue('transactionDetails.company_settlement_rate', buyRate, { shouldValidate: false, shouldDirty: false });
      }
    }
  }, [rawFxCurrency, specificCurrencyRate, setValue]);

  // Side Effect: Clear Payee Fields when Source of Funds is not 'others'
  const { clearErrors } = useFormContext(); // Need clearErrors
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
        
        // Only update if different to avoid loops (though debounce helps)
        setValue('transactionDetails.customer_rate', calculatedCustomerRate, { shouldValidate: false, shouldDirty: false });
    }
  }, [debouncedSettlementRate, debouncedAddMargin, setValue]);

  // Sync Transaction Details TO Redux whenever they change
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
  }, [debouncedFxCurrency, debouncedFxAmount, debouncedSettlementRate, debouncedAddMargin, debouncedCustomerRate, debouncedPanNumber, debouncedSourceOfFunds, debouncedPurpose, debouncedNostroCharges, dispatch]);

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
