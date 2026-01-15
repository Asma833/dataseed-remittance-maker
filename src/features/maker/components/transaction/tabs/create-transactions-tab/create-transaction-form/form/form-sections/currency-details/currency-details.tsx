import Spacer from '@/components/form/wrapper/spacer';
import { currencyDetailsConfig } from './currency-details.config';
import RateTable from '../../../../../../../rate-table/rate-table';
import { useNavigate } from 'react-router-dom';
import { CommonCreateTransactionProps } from '@/features/maker/components/transaction/types/create-transaction.types';
import { useState, useEffect, useRef, useMemo, memo } from 'react';
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
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

// 1. Isolated Calculation Component
const CalculationsSync = ({ formControl }: { formControl: any }) => {
    const { setValue } = useFormContext();
    const reduxState = useSelector((state: RootState) => state.transactionForm);
    const { accordionState } = useAccordionStateProvider();
    const mountedRef = useRef(true);

    // Watchers for local calculations
    const previousTransactionAmt = useWatch({ control: formControl, name: 'currencyDetails.previous_transaction_amount' });
    const declarationAmt = useWatch({ control: formControl, name: 'currencyDetails.declared_previous_amount' });
    
    // Watch specific invoiceRateTable fields to avoid root watcher lag
    const transactionValueRate = useWatch({ control: formControl, name: 'currencyDetails.invoiceRateTable.transaction_value.rate' });
    const remittanceRate = useWatch({ control: formControl, name: 'currencyDetails.invoiceRateTable.remittance_charges.rate' });
    const nostroRateValue = useWatch({ control: formControl, name: 'currencyDetails.invoiceRateTable.nostro_charges.rate' });
    const otherRate = useWatch({ control: formControl, name: 'currencyDetails.invoiceRateTable.other_charges.rate' });
    
    // Redux source values
    const { 
        fx_currency: fxCurrency,
        fx_amount: fxAmount, 
        customer_rate: customerRate, 
        add_margin: addMargin,
        company_settlement_rate: settlementRate,
        applicant_pan_number: panNumber,
        source_of_funds: sourceofFund,
        purpose
    } = reduxState;

    // Derived Calculation
    const calculatedTransactionAmount = useMemo(() => {
        return Number(transactionValueRate || 0) + Number(remittanceRate || 0) + Number(nostroRateValue || 0) + Number(otherRate || 0);
    }, [transactionValueRate, remittanceRate, nostroRateValue, otherRate]);

    const debouncedTransactionAmount = useDebounce(calculatedTransactionAmount.toString(), 800);

    const tcsPayload = useMemo(() => {
        const isEducation = (purpose || '').toLowerCase() === 'education';
        const calculatedTotalTcsAmt = Number(transactionValueRate || 0) + Number(previousTransactionAmt || 0) + Number(declarationAmt || 0);
        return {
            purpose: 'Personal Visit / Leisure Travel',
            panNumber,
            sourceofFund,
            declarationAmt: isEducation ? String(declarationAmt) : '0',
            txnAmount: calculatedTotalTcsAmt.toString(),
        };
    }, [purpose, panNumber, sourceofFund, declarationAmt, transactionValueRate, previousTransactionAmt]);

    const debouncedTcsPayload = useDebounce(tcsPayload, 800);

    const { data: gstData } = useGstCalculation(debouncedTransactionAmount, accordionState.currentActiveTab === 'panel3');
    const { data: tcsData } = useTcsCalculation(debouncedTcsPayload, accordionState.currentActiveTab === 'panel3');

    // Sync Redux/Calculations to Form
    useEffect(() => {
        if (fxCurrency) setValue('currencyDetails.fx_currency', fxCurrency);
        if (fxAmount) setValue('currencyDetails.fx_amount', fxAmount);
        if (settlementRate) setValue('currencyDetails.settlement_rate', settlementRate);
        if (customerRate) {
            setValue('currencyDetails.customer_rate', customerRate);
            setValue('currencyDetails.invoiceRateTable.transaction_value.company_rate', customerRate);
        }
        if (addMargin != null) {
            setValue('currencyDetails.add_margin', Number(addMargin));
            setValue('currencyDetails.invoiceRateTable.transaction_value.agent_mark_up', Number(addMargin));
        }
        if (fxAmount && customerRate) {
            const rate = Number(customerRate) * Number(fxAmount);
            setValue('currencyDetails.invoiceRateTable.transaction_value.rate', rate);
        }
    }, [fxCurrency, fxAmount, settlementRate, customerRate, addMargin, setValue]);

    useEffect(() => {
        if (gstData?.statuscode === '200') setValue('currencyDetails.invoiceRateTable.gst_amount.rate', Number(gstData.GST));
    }, [gstData, setValue]);

    useEffect(() => {
        if (tcsData?.statuscode === '200') setValue('currencyDetails.invoiceRateTable.tcs.rate', Number(tcsData.TCS));
    }, [tcsData, setValue]);

    // Batch calculation for Total INR and TCS Total
    useEffect(() => {
        const gstAmount = formControl._formValues.currencyDetails?.invoiceRateTable?.gst_amount?.rate || 0;
        const tcsAmount = formControl._formValues.currencyDetails?.invoiceRateTable?.tcs?.rate || 0;
        
        const totalInr = Number(calculatedTransactionAmount) + Number(gstAmount) + Number(tcsAmount);
        setValue('currencyDetails.invoiceRateTable.total_inr_amount.rate', totalInr);

        const calculatedTotalTcsAmt = Number(transactionValueRate || 0) + Number(previousTransactionAmt || 0) + Number(declarationAmt || 0);
        setValue('currencyDetails.total_transaction_amount_tcs', calculatedTotalTcsAmt);
    }, [calculatedTransactionAmount, transactionValueRate, previousTransactionAmt, declarationAmt, setValue]);

    return null;
};

// 2. Isolated RateTable Component
const RateTableWrapper = ({ formControl }: { formControl: any }) => {
    const invoiceRateTable = useWatch({ control: formControl, name: 'currencyDetails.invoiceRateTable' });
    const reduxState = useSelector((state: RootState) => state.transactionForm);
    const selectedNostroType = useWatch({ control: formControl, name: 'transactionDetails.nostro_charges' });

    const totalInrAmount = invoiceRateTable?.total_inr_amount?.rate;
    const { customer_rate: customerRate, fx_amount: fxAmount } = reduxState;

    const beneficiaryAmount = useMemo(() => {
        if (!customerRate || Number(customerRate) === 0) return 0;
        const nostroRate = Number(invoiceRateTable?.nostro_charges?.rate || 0);
        const transactionValueRate = Number(invoiceRateTable?.transaction_value?.rate || 0);
        const adjustment = selectedNostroType === 'BEN' ? nostroRate : 0;
        return (transactionValueRate - adjustment) / Number(customerRate);
    }, [customerRate, fxAmount, invoiceRateTable?.nostro_charges?.rate, invoiceRateTable?.transaction_value?.rate, selectedNostroType]);

    return (
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
    );
};

const CurrencyDetails = memo(({ setAccordionState, viewMode, paymentData, dealBookingId }: CommonCreateTransactionProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [localFile, setLocalFile] = useState<File | null>(null);
  const [isPdf, setIsPdf] = useState(false);
  const [isKycDialogOpen, setIsKycDialogOpen] = useState(false);
  const navigate = useNavigate();
  const methods = useFormContext();
  const { control, trigger, setValue, reset, getValues } = methods;
  
  useEffect(() => {
    if (Object.keys(methods.formState.errors).length > 0) {
      console.log('Form State Errors Changed:', methods.formState.errors);
    }
  }, [methods.formState.errors]);

  const purpose = useWatch({ control, name: 'transactionDetails.purpose' });

  const { data: currencyRates } = useGetCurrencyRates();
  const currencyOptions = useMemo(() => 
    currencyRates?.reduce((acc: Record<string, { label: string }>, currency) => {
      acc[currency.currency_code] = { label: currency.currency_code };
      return acc;
    }, {}) || {}
  , [currencyRates]);

  const { data: dealDetails } = useGetDealDetails(dealBookingId || '');
  const { mutateAsync: uploadChallan } = useUploadPaymentChallan();
  const { mutateAsync: getPresignedUrlsAsync } = useGetPresignedUrls();

  useEffect(() => {
    if (dealDetails && (dealDetails as any).payment_record) {
        const paymentRecord = (dealDetails as any).payment_record;
        const transactionId = (dealDetails as any).transaction?.transaction_id || (dealDetails as any).transactionDetails?.transaction_id;
        
        setSelectedPayment({
            ...paymentRecord,
            transaction_id: transactionId,
            ref_no: transactionId // Fallback for ref_no as well
        });
    }
  }, [dealDetails]);

  const handleSave = async () => {
    const isValid = await trigger();
    if (!isValid) {
      // Access errors directly from context to ensure they are fresh
      const fieldErrors = methods.formState.errors;
      
      const getDeepErrors = (obj: any, prefix = ''): string[] => {
        return Object.keys(obj).flatMap(key => {
          const error = obj[key];
          const path = prefix ? `${prefix}.${key}` : key;
          
          if (error && typeof error === 'object') {
            if (error.message) {
              return [path];
            }
            return getDeepErrors(error, path);
          }
          return [];
        });
      };

      const missingFields = getDeepErrors(fieldErrors);
      
      console.log('Validation failed. Full Error Object:', JSON.stringify(fieldErrors, null, 2));
      console.log('Current Form Values:', JSON.stringify(methods.getValues(), null, 2));
      console.log('Failing fields:', missingFields);

      // Manual Schema Check as a fallback
      import('../../common-schema').then(({ createTransactionSchema }) => {
        const result = createTransactionSchema.safeParse(methods.getValues());
        if (!result.success) {
          console.log('Manual Schema Validation Errors:', result.error.format());
          const manualMissingFields = (result.error as any).issues.map((err: any) => err.path.join('.'));
          toast.error(`Please fill all required fields (Found via Manual Check): ${manualMissingFields.join(', ')}`);
        } else {
          if (missingFields.length > 0) {
            toast.error(`Please fill all required fields: ${missingFields.join(', ')}`);
          } else {
            toast.error("Validation failed, but no specific field errors found. Please check all sections.");
          }
        }
      });
      
      return;
    }
    const formElement = document.getElementById('create-transaction-form') as HTMLFormElement;
    if (formElement) formElement.requestSubmit();
  };

  const handleShareTransactionDetails = () => {
    const values = getValues();
    const rateTable = values.currencyDetails.invoiceRateTable;
    const totalInr = rateTable.total_inr_amount.rate;
    // Note: beneficiaryAmount logic is duplicated or needs careful extraction if needed here
    generateRateTablePdf(rateTable, totalInr, 0, 'transaction-rate-details');
    toast.success('PDF downloaded successfully');
  };

  return (
    <>
      <Spacer>
        <CalculationsSync formControl={control} />
        <FormFieldRow rowCols={2} wrapperClassName="flex-row lg:!flex-nowrap items-start">
          <div className="flex flex-wrap md:!w-full lg:w-1/2 gap-4">
            <FormFieldRow rowCols={1} wrapperClassName="md:row-cols-1 lg:row-cols-1" className="w-full">
              {(['fx_currency', 'fx_amount'] as const).map((name) => {
                const field = currencyDetailsConfig.find((f) => f.name === name) as FieldConfig;
                let fieldWithOptions = field;
                if (name === 'fx_currency') fieldWithOptions = { ...field, options: currencyOptions };
                return (
                  <FieldWrapper key={name}>
                    {getController({ ...fieldWithOptions, name: `currencyDetails.${name}`, control, errors: undefined })}
                  </FieldWrapper>
                );
              })}
            </FormFieldRow>
            <FormFieldRow rowCols={1} wrapperClassName="md:row-cols-1 lg:row-cols-1" className="w-full">
              {(['settlement_rate', 'add_margin'] as const).map((name) => {
                const field = currencyDetailsConfig.find((f) => f.name === name) as FieldConfig;
                return (
                  <FieldWrapper key={name}>
                    {getController({ ...field, name: `currencyDetails.${name}`, control, errors: undefined })}
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
                      errors: undefined,
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
                      errors: undefined,
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
                    {getController({ ...field, name: `currencyDetails.${name}`, control, errors: undefined })}
                  </FieldWrapper>
                );
              })}
            </FormFieldRow>
          </div>
          <div className="flex flex-wrap md:!w-full lg:w-1/2">
            <RateTableWrapper formControl={control} />
          </div>
        </FormFieldRow>

        <div className="mt-16 flex flex-col items-center gap-10">
          <div className="flex justify-center gap-1 flex-wrap">
              {!viewMode && (
                <>
                <ConfirmationAlert
                  title="Cancel Transaction"
                  description="Are you sure you want to cancel? All unsaved changes will be lost."
                  onConfirm={() => { reset(); if (setAccordionState) setAccordionState({ currentActiveTab: 'panel1' }); }}
                >
                  <Button type="button" variant="light" className="mx-2">Cancel</Button>
                </ConfirmationAlert>
                 <ConfirmationAlert
                  title="Save Transaction"
                  description="Are you sure you want to save this transaction?"
                  onConfirm={handleSave}
                >
                  <Button variant="secondary" disabled={isSaving} className="mx-2 w-24">
                    {isSaving ? 'Saving...' : 'Save'}
                  </Button>
                </ConfirmationAlert>
                </>
              )}
             
            {viewMode && (
              <>
                <Button type="button" onClick={() => setIsModalOpen(true)} variant="secondary" className="mr-2">Offline Bank Transfer</Button>
                <Button type="button" onClick={() => setIsKycDialogOpen(true)} variant="secondary" className="mr-2">KYC Upload</Button>
              </>
            )}
          </div>
        </div>
      </Spacer>
      <GenericDialog open={isModalOpen} onOpenChange={setIsModalOpen} title="Payment" description="">
        <Payments
          setIsOpen={setIsModalOpen}
          uploadScreen={false}
          data={selectedPayment || paymentData}
          onSubmit={async (file) => {
            const id = selectedPayment?.id || paymentData?.id;
            await uploadChallan({ id, file });
          }}
          onViewScreenshot={async (s3Key) => {
            const response = await getPresignedUrlsAsync([s3Key]);
            if (response?.urls?.[0]?.presigned_url) { setModalImageSrc(response.urls[0].presigned_url); setIsImageModalOpen(true); }
          }}
          onViewLocalFile={(file) => { setModalImageSrc(URL.createObjectURL(file)); setIsImageModalOpen(true); }}
        />
      </GenericDialog>
      <ImageViewModal isOpen={isImageModalOpen} onClose={() => setIsImageModalOpen(false)} imageSrc={modalImageSrc} title="View Screenshot" isPdf={isPdf} />
      <KycSelectionDialog open={isKycDialogOpen} onOpenChange={setIsKycDialogOpen} transactionRefNo="" onShareLink={() => {}} onUploadNow={() => navigate('/branch_agent_maker/transaction/kyc')} />
    </>
  );
});

export default CurrencyDetails;
