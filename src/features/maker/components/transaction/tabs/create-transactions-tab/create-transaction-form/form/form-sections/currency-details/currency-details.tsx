import Spacer from '@/components/form/wrapper/spacer';
import { currencyDetailsConfig } from './currency-details.config';
import RateTable from '../../../../../../../rate-table/rate-table';
import { useNavigate } from 'react-router-dom';
import { CommonCreateTransactionProps } from '@/features/maker/components/transaction/types/create-transaction.types';
import { useState, useEffect, useRef } from 'react';
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
import { generateRateTablePdf } from '@/utils/pdfUtils';
import { ConfirmationAlert } from '@/components/common/confirmation-alert';
import { formatINR } from '@/utils/form-helpers';

const CurrencyDetails = ({ setAccordionState, viewMode, paymentData }: CommonCreateTransactionProps) => {
  // Add console log for debugging
  console.log('CurrencyDetails render - viewMode:', viewMode, 'paymentData:', paymentData);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const mountedRef = useRef(false);
  const navigate = useNavigate();
  const { control, trigger, setValue, reset, getValues } = useFormContext();
  const { errors } = useFormState();
  const { data: currencyRates, isLoading: currencyLoading } = useGetCurrencyRates();
  const { calculateGst } = useGstCalculation();
  const { calculateTcs } = useTcsCalculation();

  const fxCurrency = useWatch({ control, name: 'transactionDetails.fx_currency' });
  
  // Get the entire form data to pass to useGetAgentDetails in view mode
  const formData = getValues();
  
  // Pass viewMode and form data to useGetAgentDetails
  const { extractedMargins } = useGetAgentDetails(fxCurrency, viewMode, formData);
  const { mutateAsync: uploadChallan } = useUploadPaymentChallan();

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
    }
  }, [addMargin, setValue]);

  useEffect(() => {
    if (customerRate && !isNaN(Number(customerRate))) {
      setValue('currencyDetails.customer_rate', customerRate, { shouldValidate: false, shouldDirty: false });
    }
  }, [customerRate]);

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
      // Only set these values if they're not already set in view mode
      if (!viewMode || !invoiceRateTable.remittance_charges.company_rate) {
        setValue('currencyDetails.invoiceRateTable.remittance_charges.company_rate', extractedMargins.productMargin, {
          shouldValidate: false,
          shouldDirty: false,
        });
      }

      if (!viewMode || !invoiceRateTable.nostro_charges.company_rate) {
        setValue('currencyDetails.invoiceRateTable.nostro_charges.company_rate', extractedMargins.nostroMargin, {
          shouldValidate: false,
          shouldDirty: false,
        });
      }

      if (!viewMode || !invoiceRateTable.other_charges.company_rate) {
        setValue('currencyDetails.invoiceRateTable.other_charges.company_rate', extractedMargins.otherChargesRate, {
          shouldValidate: false,
          shouldDirty: false,
        });
      }
    }
  }, [extractedMargins, setValue, viewMode, invoiceRateTable]);

  // Calculate transaction_value.rate as company_settlement_rate + add_margin
  // Calculate transaction_value.rate as company_rate + agent_mark_up
  useEffect(() => {
    if (mountedRef.current && fxAmount && transactionValueCompanyRate != null && transactionValueAgentMarkUp != null) {
      const rate = Number(transactionValueCompanyRate)  * Number(fxAmount) ;
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
  
  // Special effect for view mode to ensure invoice table data is properly populated
  // This effect runs only once when the component mounts in view mode
  useEffect(() => {
    if (viewMode && mountedRef.current && invoiceRateTable) {
      // In view mode, we want to make sure the invoice table data is preserved
      // This ensures that the data from mapDealDetailsApiToFormInput is not overwritten
      console.log('View mode effect - preserving invoice table data', invoiceRateTable);
      
      // Create a local copy of the data to avoid dependency issues
      const tableData = { ...invoiceRateTable };
      
      // We don't need to set these values if they're already set correctly
      // This is just a safeguard to ensure the data is consistent
      if (tableData.transaction_value && tableData.transaction_value.rate) {
        setValue('currencyDetails.invoiceRateTable.transaction_value.rate', tableData.transaction_value.rate, {
          shouldValidate: false,
          shouldDirty: false,
        });
      }
      
      if (tableData.remittance_charges && tableData.remittance_charges.rate) {
        setValue('currencyDetails.invoiceRateTable.remittance_charges.rate', tableData.remittance_charges.rate, {
          shouldValidate: false,
          shouldDirty: false,
        });
      }
      
      if (tableData.nostro_charges && tableData.nostro_charges.rate) {
        setValue('currencyDetails.invoiceRateTable.nostro_charges.rate', tableData.nostro_charges.rate, {
          shouldValidate: false,
          shouldDirty: false,
        });
      }
      
      if (tableData.other_charges && tableData.other_charges.rate) {
        setValue('currencyDetails.invoiceRateTable.other_charges.rate', tableData.other_charges.rate, {
          shouldValidate: false,
          shouldDirty: false,
        });
      }
      
      if (tableData.transaction_amount && tableData.transaction_amount.rate) {
        setValue('currencyDetails.invoiceRateTable.transaction_amount.rate', tableData.transaction_amount.rate, {
          shouldValidate: false,
          shouldDirty: false,
        });
      }
      
      if (tableData.gst_amount && tableData.gst_amount.rate) {
        setValue('currencyDetails.invoiceRateTable.gst_amount.rate', tableData.gst_amount.rate, {
          shouldValidate: false,
          shouldDirty: false,
        });
      }
      
      if (tableData.tcs && tableData.tcs.rate) {
        setValue('currencyDetails.invoiceRateTable.tcs.rate', tableData.tcs.rate, {
          shouldValidate: false,
          shouldDirty: false,
        });
      }
      
      if (tableData.total_inr_amount && tableData.total_inr_amount.rate) {
        setValue('currencyDetails.invoiceRateTable.total_inr_amount.rate', tableData.total_inr_amount.rate, {
          shouldValidate: false,
          shouldDirty: false,
        });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode]); // Only depend on viewMode to prevent infinite loops

  // GST Calculation
  const gstTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (mountedRef.current && transactionAmount && transactionAmount > 0) {
      // Clear previous timeout
      if (gstTimeoutRef.current) {
        clearTimeout(gstTimeoutRef.current);
      }
      // Set new timeout for debounced call
      gstTimeoutRef.current = setTimeout(async () => {
        try {
          const response = await calculateGst({ txnAmount: transactionAmount.toString() });
          if (response.statuscode === '200' && response.responsecode === 'success') {
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
      }, 2000); // 2000ms debounce delay
    }
    return () => {
      if (gstTimeoutRef.current) {
        clearTimeout(gstTimeoutRef.current);
      }
    };
  }, [transactionAmount, calculateGst, setValue]);

  // TCS Calculation
  const tcsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    const amountBeforeTcs = Number(transactionAmount || 0) + Number(gstAmount || 0);
    const isEducation = (purpose || '').toLowerCase() === 'education';
    if (
      mountedRef.current &&
      amountBeforeTcs > 0 &&
      purpose &&
      panNumber &&
      sourceofFund &&
      (!isEducation || declarationAmt)
    ) {
      // Clear previous timeout
      if (tcsTimeoutRef.current) {
        clearTimeout(tcsTimeoutRef.current);
      }
      // Set new timeout for debounced call
      tcsTimeoutRef.current = setTimeout(async () => {
        try {
          const response = await calculateTcs({
            purpose: purpose || 'Personal Visit / Leisure Travel',
            panNumber,
            sourceofFund,
            declarationAmt: isEducation ? declarationAmt : '0',
            txnAmount: amountBeforeTcs.toString(),
          });
          if (response.statuscode === '200' && response.responsecode === 'success') {
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
      }, 2000); // 2000ms debounce delay
    }
    return () => {
      if (tcsTimeoutRef.current) {
        clearTimeout(tcsTimeoutRef.current);
      }
    };
  }, [transactionAmount, gstAmount, purpose, panNumber, sourceofFund, declarationAmt, calculateTcs, setValue]);
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
  const getFieldLabel = (key: string): string => {
    const parts = key.split('.');
    const fieldName = parts[parts.length - 1];
    const config = currencyDetailsConfig;
    const field = config.find((f) => f.name === fieldName);
    return field?.label || key;
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

    generateRateTablePdf(invoiceRateTable, totalInrAmount || 0, 'transaction-rate-details');
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
      await uploadChallan({
        id: selectedPayment.id,
        file,
      });
    }
  };
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Spacer>
        <FormFieldRow rowCols={2} wrapperClassName="flex-row md:!flex-nowrap items-start">
          <div className="flex flex-wrap md:w-full lg:w-1/2 gap-4">
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
          <div className="flex flex-wrap md:w-full lg:w-1/2">
            <RateTable
              id={'currencyDetails.invoiceRateTable'}
              mode={'edit'}
              totalAmount={totalInrAmount || 0}
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
                  <Button variant="secondary" disabled={isSaving} className="mx-2 w-24">
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
                    Share Transaction Details PDF
                  </Button>
                </ConfirmationAlert>
                <Button type="button" onClick={handlePayment} variant="secondary">
                  Payment
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
        />
      </GenericDialog>
    </>
  );
};

export default CurrencyDetails;
