import Spacer from '@/components/form/wrapper/spacer';
import { currencyDetailsConfig } from './currency-details.config';
import RateTable from '../../../../../../../rate-table/rate-table';
import { useNavigate } from 'react-router-dom';
import { CommonCreateTransactionProps } from '@/features/maker/components/transaction/types/create-transaction.types';
import { useState, useEffect, useRef, useMemo, memo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import { getController } from '@/components/form/utils/get-controller';
import { Button } from '@/components/ui/button';
import { FieldConfig } from '../../../types/createTransactionForm.types';
import { useGetCurrencyRates } from '@/hooks/useCurrencyRate';
import { useGstCalculation } from '@/features/maker/components/transaction/hooks/useGstCalculation';
import { useTcsCalculation } from '@/features/maker/components/transaction/hooks/useTcsCalculation';
import { useGetAgentDetails } from '@/features/maker/components/transaction/hooks/useGetAgentDetails';
import { toast } from 'sonner';
import { GenericDialog } from '@/components/ui/generic-dialog';
import Payments from '@/components/payments/Payments';
import { useUploadPaymentChallan } from '@/features/maker/components/transaction/hooks/useUploadPaymentChallan';
import { ImageViewModal } from '@/components/common/image-view-modal';
import { useGetPresignedUrls } from '@/features/maker/components/transaction/hooks/useGetPresignedUrls';
import { generateRateTablePdf } from '@/utils/pdfUtils';
import { ConfirmationAlert } from '@/components/common/confirmation-alert';
import { getFieldLabel } from './currency-details.utils';
import { useAccordionStateProvider } from '../../../context/accordion-control-context';
import { useDebounce } from '@/hooks/useDebounce';
import { useGetDealDetails } from '@/features/maker/components/transaction/hooks/useGetPaymentDetails';
import { KycSelectionDialog } from './kyc-selection-dialog';

const CurrencyDetails = memo(({ setAccordionState, viewMode, paymentData, dealBookingId }: CommonCreateTransactionProps) => {
  const { accordionState } = useAccordionStateProvider();
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [localFile, setLocalFile] = useState<File | null>(null);
  const [isPdf, setIsPdf] = useState(false);
  const [isKycDialogOpen, setIsKycDialogOpen] = useState(false);
  const mountedRef = useRef(false);
  const navigate = useNavigate();
  const { control, trigger, setValue, reset, getValues, formState } = useFormContext();
  const { data: currencyRates, isLoading: currencyLoading } = useGetCurrencyRates();

  const { data: dealDetails, refetch: refetchDealDetails } = useGetDealDetails(dealBookingId || '');
  
  useEffect(() => {
    if (dealDetails && dealDetails.paymentDetails) {
         const paymentRecord = (dealDetails as any).payment_record || dealDetails.paymentDetails;
         if(paymentRecord) {
            setSelectedPayment(paymentRecord);
         }
    } else if (paymentData) {
        // Fallback or Initial Load from props
        setSelectedPayment(paymentData);
    }
  }, [dealDetails, paymentData]);
  
  // Update selectedPayment with ID if missing, using redux
  // This must be AFTER reduxState is defined
  useEffect(() => {
    // Only attempt if reduxState is available (which it will be via Redux)
    // but we need to access the variable safely.
    // However, reduxTransactionId is defined below. 
    // We need to move this effect AFTER the selector or move the selector UP.
  }, []); 

  const reduxState = useSelector((state: RootState) => state.transactionForm);
  const { 
    fx_currency: fxCurrency,
    fx_amount: fxAmount, 
    customer_rate: customerRate, 
    applicant_pan_number: panNumber,
    source_of_funds: sourceofFund,
    purpose,
    nostro_charges: reduxNostroType,
    transaction_id: reduxTransactionId
  } = reduxState;

  // Now we can use reduxTransactionId
  useEffect(() => {
      if (reduxTransactionId && selectedPayment && !selectedPayment.transaction_id) {
          setSelectedPayment((prev: any) => ({ ...prev, transaction_id: reduxTransactionId }));
      }
  }, [reduxTransactionId, selectedPayment]);

  // Targeted watches instead of watching everything
  const transactionAmount = useWatch({ control, name: 'currencyDetails.invoiceRateTable.transaction_amount.rate' });
  const totalTcsAmt = useWatch({ control, name: 'currencyDetails.total_transaction_amount_tcs' });
  const declarationAmt = useWatch({ control, name: 'currencyDetails.declared_previous_amount' });
  const previousTransactionAmt = useWatch({ control, name: 'currencyDetails.previous_transaction_amount' });

  // Targeted watches for RateTable inputs to avoid full component re-render on ogni field change
  // Actually, RateTable needs invoiceRateTable, but we can memoize RateTable itself.
  // Targeted watches for RateTable inputs to avoid full component re-render
  // We explicitly avoid watching the entire 'invoiceRateTable' object
  
  const transactionValueRate = useWatch({ control, name: 'currencyDetails.invoiceRateTable.transaction_value.rate' });
  const remittanceRate = useWatch({ control, name: 'currencyDetails.invoiceRateTable.remittance_charges.rate' });
  const nostroRate = useWatch({ control, name: 'currencyDetails.invoiceRateTable.nostro_charges.rate' });
  const otherRate = useWatch({ control, name: 'currencyDetails.invoiceRateTable.other_charges.rate' });
  
  const remittanceCompanyRate = useWatch({ control, name: 'currencyDetails.invoiceRateTable.remittance_charges.company_rate' });
  const remittanceAgentMarkUp = useWatch({ control, name: 'currencyDetails.invoiceRateTable.remittance_charges.agent_mark_up' });
  
  const nostroCompanyRate = useWatch({ control, name: 'currencyDetails.invoiceRateTable.nostro_charges.company_rate' });
  const nostroAgentMarkUp = useWatch({ control, name: 'currencyDetails.invoiceRateTable.nostro_charges.agent_mark_up' });
  
  const otherCompanyRate = useWatch({ control, name: 'currencyDetails.invoiceRateTable.other_charges.company_rate' });
  const otherAgentMarkUp = useWatch({ control, name: 'currencyDetails.invoiceRateTable.other_charges.agent_mark_up' });

  const gstAmount = useWatch({ control, name: 'currencyDetails.invoiceRateTable.gst_amount.rate' });
  const tcsAmount = useWatch({ control, name: 'currencyDetails.invoiceRateTable.tcs.rate' });
  const totalInrAmount = useWatch({ control, name: 'currencyDetails.invoiceRateTable.total_inr_amount.rate' });
  
  // Reconstruct invoiceRateTable for valid dependencies in the rate table component if needed, 
  // or pass individual props to RateTable to avoid object recreation.
  // For now, we will construct a partial object ONLY for passing to RateTable if it requires it,
  // but importantly, we are NOT watching the whole object anymore.
  const invoiceRateTable = useMemo(() => ({
      transaction_value: { rate: transactionValueRate, company_rate: customerRate, agent_mark_up: 0 },
      remittance_charges: { rate: remittanceRate, company_rate: remittanceCompanyRate, agent_mark_up: remittanceAgentMarkUp },
      nostro_charges: { rate: nostroRate, company_rate: nostroCompanyRate, agent_mark_up: nostroAgentMarkUp },
      other_charges: { rate: otherRate, company_rate: otherCompanyRate, agent_mark_up: otherAgentMarkUp },
      gst_amount: { rate: gstAmount },
      tcs: { rate: tcsAmount },
      total_inr_amount: { rate: totalInrAmount }
  }), [transactionValueRate, customerRate, remittanceRate, nostroRate, otherRate, remittanceCompanyRate, remittanceAgentMarkUp, nostroCompanyRate, nostroAgentMarkUp, otherCompanyRate, otherAgentMarkUp, gstAmount, tcsAmount, totalInrAmount]);

// Variables previously here were duplicates and have been removed.

  const watchedNostroType = useWatch({ control, name: 'transactionDetails.nostro_charges' });
  const selectedNostroType = watchedNostroType || reduxNostroType;

  const formData = useMemo(() => {
    if (viewMode) {
      return getValues();
    }
    return null;
  }, [viewMode, getValues]);

  const { extractedMargins } = useGetAgentDetails(fxCurrency, viewMode, formData);
  const { mutateAsync: uploadChallan } = useUploadPaymentChallan();
  const { mutateAsync: getPresignedUrlsAsync } = useGetPresignedUrls();

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

  const calculatedTransactionAmount = useMemo(() => {
    if (
      transactionValueRate != null &&
      remittanceRate != null &&
      nostroRate != null &&
      otherRate != null
    ) {
      const nostroPayable = selectedNostroType === 'BEN' ? 0 : Number(nostroRate);
      return Number(transactionValueRate) + Number(remittanceRate) + nostroPayable + Number(otherRate);
    }
    return 0;
  }, [transactionValueRate, remittanceRate, nostroRate, otherRate, selectedNostroType]);

  const debouncedTransactionAmount = useDebounce(calculatedTransactionAmount.toString(), 1000);

  const tcsPayload = useMemo(() => {
     const isEducation = (purpose || '').toLowerCase() === 'education';
     const calculatedTotalTcsAmt =
        Number(transactionValueRate || 0) + Number(previousTransactionAmt || 0) + Number(declarationAmt || 0);

     return {
        purpose: 'Personal Visit / Leisure Travel',
        panNumber,
        sourceofFund,
        declarationAmt: isEducation ? String(declarationAmt) : '0',
        txnAmount: calculatedTotalTcsAmt.toString(),
     };
  }, [purpose, panNumber, sourceofFund, declarationAmt, transactionValueRate, previousTransactionAmt]);

  const debouncedTcsPayload = useDebounce(tcsPayload, 1000);

  const { data: gstData } = useGstCalculation(
    debouncedTransactionAmount,
    accordionState.currentActiveTab === 'panel3'
  );

  const { data: tcsData } = useTcsCalculation(
    debouncedTcsPayload,
    accordionState.currentActiveTab === 'panel3'
  );

  const beneficiaryAmount = useMemo(() => {
    if (customerRate == null || Number(customerRate) === 0) return 0;
    const currentNostroRate = Number(nostroCompanyRate || 0) + Number(nostroAgentMarkUp || 0);
    const currentTransactionValueRate = Number(customerRate) * Number(fxAmount || 0);
    const adjustment = selectedNostroType === 'BEN' ? currentNostroRate : 0;
    return (currentTransactionValueRate - adjustment) / Number(customerRate);
  }, [customerRate, fxAmount, nostroCompanyRate, nostroAgentMarkUp, selectedNostroType]);

  // Prevent overwriting manual edits on remount by checking if rates are already set
  // We only want to apply extracted margins if the field is empty or if the currency/mode changed meaningfully
  useEffect(() => {
    // console.log('CurrencyDetails ExtractedMargins:', extractedMargins);
    if (extractedMargins) {
       // Check individual fields and apply margins if they are missing/zero
       
       const currentRemittance = getValues('currencyDetails.invoiceRateTable.remittance_charges.company_rate');
       console.log('Current Remittance Value:', currentRemittance, 'New Margin:', extractedMargins.productMargin);
       
       // Explicitly check for 0, "0", null, undefined, ""
       if (!currentRemittance || Number(currentRemittance) === 0) {
           console.log('Applying Remittance Margin:', extractedMargins.productMargin);
           setValue('currencyDetails.invoiceRateTable.remittance_charges.company_rate', extractedMargins.productMargin, { shouldValidate: true, shouldDirty: true });
       }
       
       const currentNostro = getValues('currencyDetails.invoiceRateTable.nostro_charges.company_rate');
       if (!currentNostro || Number(currentNostro) === 0) {
           console.log('Applying Nostro Margin:', extractedMargins.nostroMargin);
           setValue('currencyDetails.invoiceRateTable.nostro_charges.company_rate', extractedMargins.nostroMargin, { shouldValidate: true, shouldDirty: true });
       }

       const currentOther = getValues('currencyDetails.invoiceRateTable.other_charges.company_rate');
       if (!currentOther || Number(currentOther) === 0) {
           console.log('Applying Other Margin:', extractedMargins.otherChargesRate);
           setValue('currencyDetails.invoiceRateTable.other_charges.company_rate', extractedMargins.otherChargesRate, { shouldValidate: true, shouldDirty: true });
       }
    }
  }, [extractedMargins, setValue, getValues]);

  // Restore Missing Effects for calculating rates (Amount column)

  // Remittance Charges Calculation
  // Remittance Charges Calculation
  useEffect(() => {
    // Default to 0 if null/undefined
    const companyRate = Number(remittanceCompanyRate || 0);
    const markUp = Number(remittanceAgentMarkUp || 0);
    const rate = companyRate + markUp;
    
    setValue('currencyDetails.invoiceRateTable.remittance_charges.rate', rate, { shouldValidate: false, shouldDirty: false });
  }, [remittanceCompanyRate, remittanceAgentMarkUp, setValue]);

  // Nostro Charges Calculation
  useEffect(() => {
    // Default to 0 if null/undefined
    const companyRate = Number(nostroCompanyRate || 0);
    const markUp = Number(nostroAgentMarkUp || 0);
    const rate = companyRate + markUp;

    setValue('currencyDetails.invoiceRateTable.nostro_charges.rate', rate, { shouldValidate: false, shouldDirty: false });
  }, [nostroCompanyRate, nostroAgentMarkUp, setValue]);

  // Other Charges Calculation
  // Other Charges Calculation
  useEffect(() => {
    // Default to 0 if null/undefined
    const companyRate = Number(otherCompanyRate || 0);
    const markUp = Number(otherAgentMarkUp || 0);
    const rate = companyRate + markUp;

    setValue('currencyDetails.invoiceRateTable.other_charges.rate', rate, { shouldValidate: false, shouldDirty: false });
  }, [otherCompanyRate, otherAgentMarkUp, setValue]);

  useEffect(() => {
     // Robust calculation with defaults
      const tVal = Number(transactionValueRate || 0);
      const rRate = Number(remittanceRate || 0);
      const nRate = Number(nostroRate || 0);
      const oRate = Number(otherRate || 0);
      
      const nostroPayable = selectedNostroType === 'BEN' ? 0 : nRate;
      const transactionAmt = tVal + rRate + nostroPayable + oRate;
      
      // Update only if different to avoid infinite loops if it were bidirectional (it's not)
      // Use explicit check to prevent unnecessary dispatches if value is effectively 0 and field is already 0
      setValue('currencyDetails.invoiceRateTable.transaction_amount.rate', transactionAmt, { shouldValidate: false, shouldDirty: false });

  }, [transactionValueRate, remittanceRate, nostroRate, otherRate, selectedNostroType, setValue]);

  useEffect(() => {
    const totalInr = Number(transactionAmount || 0) + Number(gstAmount || 0) + Number(tcsAmount || 0);
    setValue('currencyDetails.invoiceRateTable.total_inr_amount.rate', totalInr, { shouldValidate: false, shouldDirty: false });
  }, [transactionAmount, gstAmount, tcsAmount, setValue]);

  useEffect(() => {
    const calculatedTotalTcsAmt = Number(transactionValueRate || 0) + Number(previousTransactionAmt || 0) + Number(declarationAmt || 0);
    setValue('currencyDetails.total_transaction_amount_tcs', calculatedTotalTcsAmt, { shouldValidate: false, shouldDirty: false });
  }, [transactionValueRate, previousTransactionAmt, declarationAmt, setValue]);

  useEffect(() => {
    if (gstData && gstData.statuscode === '200') {
        setValue('currencyDetails.invoiceRateTable.gst_amount.rate', Number(gstData.GST), { shouldValidate: false, shouldDirty: false });
    }
  }, [gstData, setValue]);

  useEffect(() => {
    if (tcsData && tcsData.statuscode === '200') {
        setValue('currencyDetails.invoiceRateTable.tcs.rate', Number(tcsData.TCS), { shouldValidate: false, shouldDirty: false });
    }
  }, [tcsData, setValue]);

  const flattenErrors = (obj: any, prefix = ''): string[] => {
    const keys: string[] = [];
    for (const key in obj) {
      if (obj[key] && typeof obj[key] === 'object' && obj[key].message) {
        keys.push(prefix ? `${prefix}.${key}` : key);
      } else if (obj[key] && typeof obj[key] === 'object') {
        keys.push(...flattenErrors(obj[key], prefix ? `${prefix}.${key}` : key));
      }
    }
    return keys;
  };

  const handleSave = async () => {
    const isValid = await trigger();
    if (!isValid) {
      const missingFields = flattenErrors(formState.errors);
      if (missingFields.length > 0) {
        toast.error(`Missing required field: ${getFieldLabel(missingFields[0])}`);
      }
      return;
    }
    const formElement = document.getElementById('create-transaction-form') as HTMLFormElement;
    if (formElement) formElement.requestSubmit();
  };

  const handleCancelConfirm = () => {
    reset();
    if (setAccordionState) setAccordionState({ currentActiveTab: 'panel1' });
  };
  const handlePayment = () => { setIsModalOpen(true); };
  const handleUploadSubmit = async (file: File) => {
    if (selectedPayment) {
      const paymentRecordId = selectedPayment?.raw_data?.deal?.payment_records?.[0]?.id;
      const response = await uploadChallan({ id: paymentRecordId || selectedPayment.id, file });
      if (response?.url) await refetchDealDetails?.();
    }
  };

  const handleViewScreenshot = async (s3Key: string) => {
    const response = await getPresignedUrlsAsync([s3Key]);
    if (response?.urls?.[0]?.presigned_url) {
        setModalImageSrc(response.urls[0].presigned_url);
        setModalTitle('Payment Screenshot');
        setIsImageModalOpen(true);
    }
  };

  const handleViewLocalFile = (file: File) => {
    setLocalFile(file);
    setModalImageSrc(URL.createObjectURL(file));
    setModalTitle('Payment Screenshot');
    setIsPdf(file.type === 'application/pdf');
    setIsImageModalOpen(true);
  };

  return (
    <Spacer>
      {(accordionState.currentActiveTab === 'panel3' || viewMode) ? (
        <>
          <FormFieldRow rowCols={2} wrapperClassName="flex-row lg:!flex-nowrap items-start">
            <div className="flex flex-wrap md:!w-full lg:w-1/2 gap-4">
              <FormFieldRow rowCols={1} wrapperClassName="md:row-cols-1 lg:row-cols-1" className="w-full">
                {(['fx_currency', 'fx_amount'] as const).map((name) => {
                  const field = currencyDetailsConfig.find((f) => f.name === name) as FieldConfig;
                  const fieldWithOptions = name === 'fx_currency' ? { ...field, type: 'combobox' as any, options: currencyOptions } : field;
                  return (
                    <FieldWrapper key={name}>
                      {getController({ ...fieldWithOptions, name: `currencyDetails.${name}`, control })}
                    </FieldWrapper>
                  );
                })}
              </FormFieldRow>
              <FormFieldRow rowCols={1} wrapperClassName="md:row-cols-1 lg:row-cols-1" className="w-full">
                {(['settlement_rate', 'add_margin'] as const).map((name) => {
                  const field = currencyDetailsConfig.find((f) => f.name === name) as FieldConfig;
                  return (
                    <FieldWrapper key={name}>
                      {getController({ ...field, name: `currencyDetails.${name}`, control })}
                    </FieldWrapper>
                  );
                })}
              </FormFieldRow>
              <FormFieldRow rowCols={1} wrapperClassName="md:row-cols-1 lg:row-cols-1" className="w-full">
                {(['customer_rate', ...((purpose || '').toLowerCase() === 'education' ? ['declared_education_loan_amount'] as const : [])]).map((name) => {
                  const field = currencyDetailsConfig.find((f) => f.name === name) as FieldConfig;
                  return (
                    <FieldWrapper key={name}>
                      {getController({ ...field, name: `currencyDetails.${name}`, control })}
                    </FieldWrapper>
                  );
                })}
              </FormFieldRow>
              <FormFieldRow rowCols={1} wrapperClassName="md:row-cols-1 lg:row-cols-1" className="w-full">
                {(['previous_transaction_amount', ...((purpose || '').toLowerCase() === 'education' ? ['declared_previous_amount'] as const : [])]).map((name) => {
                  const field = currencyDetailsConfig.find((f) => f.name === name) as FieldConfig;
                  return (
                    <FieldWrapper key={name}>
                      {getController({ ...field, name: `currencyDetails.${name}`, control })}
                    </FieldWrapper>
                  );
                })}
              </FormFieldRow>
              <FormFieldRow rowCols={1} wrapperClassName="md:row-cols-1 lg:row-cols-1" className="w-full">
                {(['total_transaction_amount_tcs'] as const).map((name) => {
                  const field = currencyDetailsConfig.find((f) => f.name === name) as FieldConfig;
                  return (
                    <FieldWrapper key={name}>
                      {getController({ ...field, name: `currencyDetails.${name}`, control })}
                    </FieldWrapper>
                  );
                })}
              </FormFieldRow>
            </div>
            <div className="flex flex-wrap md:!w-full lg:w-1/2">
              <RateTable
                id={'currencyDetails.invoiceRateTable'}
                mode={'edit'}
                totalAmount={transactionAmount}
                beneficiaryAmount={beneficiaryAmount}
                editableFields={['remittance_charges.agent_mark_up', 'nostro_charges.agent_mark_up', 'other_charges.agent_mark_up']}
                invoiceData={invoiceRateTable}
                nostroType={selectedNostroType}
              />
            </div>
          </FormFieldRow>

          <div className="mt-16 flex flex-col items-center gap-10">
            <div className="flex justify-center gap-1 flex-wrap">
              {!viewMode && (
                <>
                  <ConfirmationAlert title="Cancel Transaction" description="Are you sure?" onConfirm={handleCancelConfirm}>
                    <Button type="button" variant="light" className="mx-2">Cancel</Button>
                  </ConfirmationAlert>
                  <ConfirmationAlert title="Save Transaction" description="Are you sure?" onConfirm={handleSave}>
                    <Button type="button" variant="secondary" disabled={isSaving} className="mx-2 w-24">{isSaving ? 'Saving...' : 'Save'}</Button>
                  </ConfirmationAlert>
                </>
              )}
              {(!viewMode || selectedPayment) && (
                <>
                  <Button type="button" onClick={handlePayment} variant="secondary" className="mr-2" disabled={!!(selectedPayment?.payment_challan_url || paymentData?.payment_challan_url)}>Offline Bank Transfer</Button>
                  <Button type="button" onClick={() => setIsKycDialogOpen(true)} variant="secondary" className="mr-2">KYC Upload</Button>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="p-4 text-center text-gray-400">Please complete previous sections.</div>
      )}
      <GenericDialog open={isModalOpen} onOpenChange={setIsModalOpen} title="Order Generated" description={`Tnx Reference No - ${selectedPayment?.transaction_id || ''}`}
      >
        <Payments setIsOpen={setIsModalOpen} uploadScreen={false} data={selectedPayment || paymentData} onSubmit={handleUploadSubmit} onViewScreenshot={handleViewScreenshot} onViewLocalFile={handleViewLocalFile} />
      </GenericDialog>
      <ImageViewModal isOpen={isImageModalOpen} onClose={() => { setIsImageModalOpen(false); if (localFile) URL.revokeObjectURL(modalImageSrc); }} imageSrc={modalImageSrc} title={modalTitle} isPdf={isPdf} />
      <KycSelectionDialog open={isKycDialogOpen} onOpenChange={setIsKycDialogOpen} transactionRefNo={dealDetails?.transaction?.transaction_id || reduxTransactionId || ''} onUploadNow={() => navigate('/branch_agent_maker/transaction/kyc', { state: { transaction: paymentData?.raw_data || dealDetails?.transaction } })} />
    </Spacer>
  );
});

export default CurrencyDetails;
