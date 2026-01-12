import Spacer from '@/components/form/wrapper/spacer';
import { currencyDetailsConfig } from './currency-details.config';
import RateTable from '../../../../../../../rate-table/rate-table';
import { useNavigate } from 'react-router-dom';
import { CommonCreateTransactionProps } from '@/features/maker/components/transaction/types/create-transaction.types';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useFormContext, useFormState, useWatch } from 'react-hook-form';
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

const CurrencyDetails = ({ setAccordionState, viewMode, paymentData, dealBookingId }: CommonCreateTransactionProps) => {
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
  const { control, trigger, setValue, reset, getValues } = useFormContext();
  const { errors, isDirty } = useFormState();
  const { data: currencyRates, isLoading: currencyLoading } = useGetCurrencyRates();

  const { data: dealDetails, refetch: refetchDealDetails } = useGetDealDetails(dealBookingId || '');
  
  useEffect(() => {
    if (dealDetails && dealDetails.paymentDetails) {
        // Find payment record if structure matches or if dealDetails is directly useful
         const paymentRecord = (dealDetails as any).payment_record || dealDetails.paymentDetails;
         if(paymentRecord) {
            setSelectedPayment(paymentRecord);
         }
    }
  }, [dealDetails]);

  const fxCurrency = useWatch({ control, name: 'transactionDetails.fx_currency' });
  const fxAmount = useWatch({ control, name: 'transactionDetails.fx_amount' });
  const transactionAmount = useWatch({ control, name: 'currencyDetails.invoiceRateTable.transaction_amount.rate' });
  const totalTcsAmt = useWatch({ control, name: 'currencyDetails.total_transaction_amount_tcs' });
  const purpose = useWatch({ control, name: 'transactionDetails.purpose' });
  const panNumber = useWatch({ control, name: 'transactionDetails.applicant_pan_number' });
  const sourceofFund = useWatch({ control, name: 'transactionDetails.source_of_funds' });
  const declarationAmt = useWatch({ control, name: 'currencyDetails.declared_previous_amount' });



  // Get the form data only once during component initialization for view mode
  // This prevents infinite re-renders by not calling getValues() on every render
  const formData = useMemo(() => {
    if (viewMode) {
      return getValues();
    }
    return null;
  }, [viewMode]); // Remove getValues from dependencies to prevent infinite loops

  // Pass viewMode and form data to useGetAgentDetails
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

  // Watch values from TransactionBasicDetails
  const companySettlementRate = useWatch({ control, name: 'transactionDetails.company_settlement_rate' });
  const addMargin = useWatch({ control, name: 'transactionDetails.add_margin' });
  const customerRate = useWatch({ control, name: 'transactionDetails.customer_rate' });
  const previousTransactionAmt = useWatch({ control, name: 'currencyDetails.previous_transaction_amount' });


  // Watch the entire invoiceRateTable to pass to RateTable
  const invoiceRateTable = useWatch({ control, name: 'currencyDetails.invoiceRateTable' });

  // Watch specific invoiceRateTable fields to avoid infinite loops
  const transactionValueCompanyRate = invoiceRateTable?.transaction_value?.company_rate;
  const transactionValueAgentMarkUp = invoiceRateTable?.transaction_value?.agent_mark_up;
  const remittanceCompanyRate = invoiceRateTable?.remittance_charges?.company_rate;
  const remittanceAgentMarkUp = invoiceRateTable?.remittance_charges?.agent_mark_up;
  const nostroCompanyRate = invoiceRateTable?.nostro_charges?.company_rate;
  const nostroAgentMarkUp = invoiceRateTable?.nostro_charges?.agent_mark_up;
  const otherCompanyRate = invoiceRateTable?.other_charges?.company_rate;
  const otherAgentMarkUp = invoiceRateTable?.other_charges?.agent_mark_up;
  const transactionValueRate = invoiceRateTable?.transaction_value?.rate;
  const remittanceRate = invoiceRateTable?.remittance_charges?.rate;
  const nostroRate = invoiceRateTable?.nostro_charges?.rate;
  const otherRate = invoiceRateTable?.other_charges?.rate;

  const gstAmount = invoiceRateTable?.gst_amount?.rate;
  const tcsAmount = invoiceRateTable?.tcs?.rate;
  const totalInrAmount = invoiceRateTable?.total_inr_amount?.rate;

  const selectedNostroType = useWatch({ control, name: 'transactionDetails.nostro_charges' });

  // Calculate Transaction Amount locally for API trigger to ensure stability
  const calculatedTransactionAmount = useMemo(() => {
    if (
      transactionValueRate != null &&
      remittanceRate != null &&
      nostroRate != null &&
      otherRate != null
    ) {
      return Number(transactionValueRate) + Number(remittanceRate) + Number(nostroRate) + Number(otherRate);
    }
    return 0;
  }, [transactionValueRate, remittanceRate, nostroRate, otherRate]);

  // Debounced Values
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

  // Calculate beneficiary amount synchronous with latest rates to avoid render cycle lag
  const beneficiaryAmount = useMemo(() => {
    if (customerRate == null || Number(customerRate) === 0) return 0;

    // Synchronously calculate derived rates for immediate sync
    const currentNostroRate = Number(nostroCompanyRate || 0) + Number(nostroAgentMarkUp || 0);
    // Note: transactionValueCompanyRate is synced to customerRate via useEffect, so we use customerRate directly for "latest"
    const currentTransactionValueRate = Number(customerRate) * Number(fxAmount || 0);

    const adjustment = selectedNostroType === 'BEN' ? currentNostroRate : 0;

    return (currentTransactionValueRate - adjustment) / Number(customerRate);
  }, [customerRate, fxAmount, nostroCompanyRate, nostroAgentMarkUp, selectedNostroType]);

  // Sync values from TransactionBasicDetails to CurrencyDetails
  useEffect(() => {
    if (
      fxCurrency &&
      typeof fxCurrency === 'string' &&
      fxCurrency.trim().length >= 3 &&
      currencyOptions[fxCurrency.trim()] &&
      mountedRef.current
    ) {
      setValue('currencyDetails.fx_currency', fxCurrency.trim(), { shouldValidate: false, shouldDirty: false });
    }
  }, [fxCurrency, currencyOptions, setValue]);

  useEffect(() => {
    if (fxAmount && !isNaN(Number(fxAmount)) && mountedRef.current) {
      setValue('currencyDetails.fx_amount', fxAmount, { shouldValidate: false, shouldDirty: false });
    }
  }, [fxAmount, setValue]);

  useEffect(() => {
    if (companySettlementRate && !isNaN(Number(companySettlementRate)) && mountedRef.current) {
      setValue('currencyDetails.settlement_rate', companySettlementRate, { shouldValidate: false, shouldDirty: false });
    }
  }, [companySettlementRate, setValue]);

  useEffect(() => {
    if (addMargin != null && !isNaN(Number(addMargin)) && mountedRef.current) {
      setValue('currencyDetails.add_margin', addMargin, { shouldValidate: false, shouldDirty: false });
      // Set agent_mark_up fields
      setValue('currencyDetails.invoiceRateTable.transaction_value.agent_mark_up', Number(addMargin), {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
  }, [addMargin, setValue]);

  useEffect(() => {
    if (customerRate && !isNaN(Number(customerRate)) && mountedRef.current) {
      setValue('currencyDetails.customer_rate', customerRate, { shouldValidate: false, shouldDirty: false });
    }
  }, [customerRate, setValue]);

  // Set transaction_value.company_rate to customerRate
  useEffect(() => {
    if (mountedRef.current && customerRate) {
      setValue('currencyDetails.invoiceRateTable.transaction_value.company_rate', customerRate, {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
  }, [customerRate, setValue]);

  // Set company rates from agent details or from view mode data
  useEffect(() => {
    if (mountedRef.current && extractedMargins) {
      // Set the company rates from extracted margins
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
    if (mountedRef.current && fxAmount && transactionValueCompanyRate != null && transactionValueAgentMarkUp != null) {
      const rate = Number(transactionValueCompanyRate) * Number(fxAmount);
      setValue('currencyDetails.invoiceRateTable.transaction_value.rate', rate, {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
  }, [fxAmount, transactionValueCompanyRate, transactionValueAgentMarkUp, setValue]);

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

  // Calculate Total Transaction Amount (TCS)
  useEffect(() => {
    if (mountedRef.current) {
      const calculatedTotalTcsAmt =
        Number(transactionValueRate || 0) + Number(previousTransactionAmt || 0) + Number(declarationAmt || 0);
      setValue('currencyDetails.total_transaction_amount_tcs', calculatedTotalTcsAmt, {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
  }, [transactionValueRate, previousTransactionAmt, declarationAmt, setValue]);

  // GST Calculation
  // GST Calculation Effect
  useEffect(() => {
    if (mountedRef.current && gstData) {
      if (gstData.statuscode === '200' && gstData.responsecode === 'success') {
        setValue('currencyDetails.invoiceRateTable.gst_amount.rate', Number(gstData.GST), {
          shouldValidate: false,
          shouldDirty: false,
        });
      } else {
        console.error('GST calculation failed:', gstData.responsemessage);
        setValue('currencyDetails.invoiceRateTable.gst_amount.rate', 0, {
          shouldValidate: false,
          shouldDirty: false,
        });
      }
    }
  }, [gstData, setValue]);

  // TCS Calculation Effect
  useEffect(() => {
    if (mountedRef.current && tcsData) {
      if (tcsData.statuscode === '200' && tcsData.responsecode === 'success') {
        setValue('currencyDetails.invoiceRateTable.tcs.rate', Number(tcsData.TCS), {
          shouldValidate: false,
          shouldDirty: false,
        });
      } else {
         console.error('TCS calculation failed:', tcsData.responsemessage);
         setValue('currencyDetails.invoiceRateTable.tcs.rate', 0, {
            shouldValidate: false,
            shouldDirty: false,
          });
      }
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
      const missingFields = flattenErrors(errors);
      toast.error(`Missing required field: ${getFieldLabel(missingFields[0])}`);
      return;
    }
    // Submit the form to hit the API
    const formElement = document.getElementById('create-transaction-form') as HTMLFormElement;
    if (formElement) {
      formElement.requestSubmit();
    }
  };
  const handleShareTransactionDetails = () => {
    if (!invoiceRateTable) {
      toast.error('No rate table data available');
      return;
    }

    generateRateTablePdf(invoiceRateTable, totalInrAmount || 0, beneficiaryAmount || 0, 'transaction-rate-details');
    toast.success('PDF downloaded successfully');
  };
  const handleCancelConfirm = () => {
    // Reset the form to its initial state
    reset();
    // Reset accordion to first panel if setAccordionState is available
    if (setAccordionState) {
      setAccordionState({ currentActiveTab: 'panel1' });
    }
  };
  const handlePayment = () => {
    setSelectedPayment(paymentData);
    setIsModalOpen(true);
  };
  const handleUploadSubmit = async (file: File) => {
    if (selectedPayment) {
      const paymentRecordId = selectedPayment?.raw_data?.deal.payment_records[0]?.id;
      await uploadChallan({
        id: paymentRecordId || selectedPayment.id,
        file,
      });

      // Refetch transaction data to get updated payment info
      await refetchDealDetails?.();
    }
  };

  const handleViewScreenshot = async (s3Key: string, refNo: string) => {
    try {
      const response = await getPresignedUrlsAsync([s3Key]);
      if (response?.urls?.[0]?.presigned_url) {
        setModalImageSrc(response.urls[0].presigned_url);
        setModalTitle('Payment Screenshot');
        setIsPdf(false);
        setIsImageModalOpen(true);
      }
    } catch (error) {
      console.error('Failed to get presigned URL:', error);
    }
  };

  const handleViewLocalFile = (file: File) => {
    setLocalFile(file);
    setModalImageSrc(URL.createObjectURL(file));
    setModalTitle('Payment Screenshot');
    setIsPdf(file.type === 'application/pdf');
    setIsImageModalOpen(true);
  };
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Spacer>
        <FormFieldRow rowCols={2} wrapperClassName="flex-row lg:!flex-nowrap items-start">
          <div className="flex flex-wrap md:!w-full lg:w-1/2 gap-4">
            <FormFieldRow rowCols={1} wrapperClassName="md:row-cols-1 lg:row-cols-1" className="w-full">
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
            <FormFieldRow rowCols={1} wrapperClassName="md:row-cols-1 lg:row-cols-1" className="w-full">
              {(['settlement_rate', 'add_margin'] as const).map((name) => {
                const field = currencyDetailsConfig.find((f) => f.name === name) as FieldConfig;
                return (
                  <FieldWrapper key={name}>
                    {getController({ ...field, name: `currencyDetails.${name}`, control, errors })}
                  </FieldWrapper>
                );
              })}
            </FormFieldRow>
            <FormFieldRow rowCols={1} wrapperClassName="md:row-cols-1 lg:row-cols-1" className="w-full">
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
            <FormFieldRow rowCols={1} wrapperClassName="md:row-cols-1 lg:row-cols-1" className="w-full">
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
            <FormFieldRow rowCols={1} wrapperClassName="md:row-cols-1 lg:row-cols-1" className="w-full">
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
          <div className="flex flex-wrap md:!w-full lg:w-1/2">
            <RateTable
              id={'currencyDetails.invoiceRateTable'}
              mode={'edit'}
              totalAmount={totalInrAmount || 0}
              beneficiaryAmount={beneficiaryAmount}
              editableFields={[
                'remittance_charges.agent_mark_up',
                'nostro_charges.agent_mark_up',
                'other_charges.agent_mark_up',
              ]}
              invoiceData={invoiceRateTable}
            />
          </div>
        </FormFieldRow>

        <div className="mt-16 flex flex-col items-center gap-10">
          <div className="flex justify-center gap-1 flex-wrap">
            <>
              {viewMode && (
                <ConfirmationAlert
                  title="Go Back"
                  description="Are you sure you want to go back? Any unsaved changes will be lost."
                  onConfirm={handleBack}
                >
                  <Button type="button" variant="light">
                    Back
                  </Button>
                </ConfirmationAlert>
              )}
              {!viewMode && (
                <ConfirmationAlert
                  title="Cancel Transaction"
                  description="Are you sure you want to cancel? All unsaved changes will be lost."
                  onConfirm={handleCancelConfirm}
                >
                  <Button type="button" variant="light" className="mx-2">
                    Cancel
                  </Button>
                </ConfirmationAlert>
              )}
              {viewMode ? (
                <ConfirmationAlert
                  title="Update Transaction"
                  description="Are you sure you want to update this transaction?"
                  onConfirm={handleSave}
                >
                  <Button variant="secondary" disabled={isSaving || !isDirty} className="mx-2 w-24">
                    {isSaving ? 'Updating...' : 'Update'}
                  </Button>
                </ConfirmationAlert>
              ) : (
                <ConfirmationAlert
                  title="Save Transaction"
                  description="Are you sure you want to save this transaction?"
                  onConfirm={handleSave}
                >
                  <Button variant="secondary" disabled={isSaving} className="mx-2 w-24">
                    {isSaving ? 'Saving...' : 'Save'}
                  </Button>
                </ConfirmationAlert>
              )}
            </>
            {viewMode && (
              <>
                <ConfirmationAlert
                  title="Share Transaction Details"
                  description="Are you sure you want to download the PDF?"
                  onConfirm={handleShareTransactionDetails}
                >
                  <Button type="button" variant="secondary" className="mr-2">
                    Share Transaction Details
                  </Button>
                </ConfirmationAlert>
                <Button type="button" onClick={handlePayment} variant="secondary" className="mr-2">
                  Offline Bank Transfer
                </Button>
                 <Button type="button" onClick={() => setIsKycDialogOpen(true)} variant="secondary" className="mr-2">
                  KYC Upload
                </Button>
              </>
            )}
          </div>
        </div>
      </Spacer>
      <GenericDialog open={isModalOpen} onOpenChange={setIsModalOpen} title="Payment" contentClassName="md:w-[40vw]">
        <Payments
          setIsOpen={setIsModalOpen}
          uploadScreen={false}
          data={selectedPayment}
          onSubmit={handleUploadSubmit}
          onViewScreenshot={handleViewScreenshot}
          onViewLocalFile={handleViewLocalFile}
        />
      </GenericDialog>
      <ImageViewModal
        isOpen={isImageModalOpen}
        onClose={() => {
          setIsImageModalOpen(false);
          if (localFile) {
            URL.revokeObjectURL(modalImageSrc);
            setLocalFile(null);
          }
        }}
        imageSrc={modalImageSrc}
        title={modalTitle}
        isPdf={isPdf}
      />
      <KycSelectionDialog
        open={isKycDialogOpen}
        onOpenChange={setIsKycDialogOpen}
        transactionRefNo={
          selectedPayment?.ref_no ||
          paymentData?.ref_no ||
          dealDetails?.transaction?.transaction_id ||
          dealDetails?.transactionDetails?.company_reference_number ||
          ''
        }
        onShareLink={(url) => {
            console.log('Sharing link:', url);
            toast.success('Link shared successfully');
            setIsKycDialogOpen(false);
        }}

        onUploadNow={() => {
            const transactionToPass = paymentData?.raw_data?.transaction;
            if (transactionToPass) {
                navigate('/branch_agent_maker/transaction/kyc', { state: { transaction: transactionToPass } });
            } else {
                 navigate('/branch_agent_maker/transaction/kyc');
            }
             setIsKycDialogOpen(false);
        }}
      />
    </>
  );
};

export default CurrencyDetails;
