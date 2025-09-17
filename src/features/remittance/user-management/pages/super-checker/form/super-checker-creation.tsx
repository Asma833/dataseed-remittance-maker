import { useEffect, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';
import { NotificationBanner } from '@/components/ui/notification-banner';
import type { z } from 'zod';
import { FormContentWrapper } from '@/components/form/wrapper/form-content-wrapper';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import Spacer from '@/components/form/wrapper/spacer';
import { useNavigate, useLocation } from 'react-router-dom';
import { superCheckerCreationConfig } from './super-checker-creation.config';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import { FormProvider } from '@/components/form/providers/form-provider';
import { getController } from '@/components/form/utils/get-controller';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { superCheckerSchema } from './super-checker-creation.schema';
import { cn } from '@/utils/cn';

export const CreateSuperChecker = () => {
  type SuperCheckerFormType = z.infer<typeof superCheckerSchema>;
  const methods = useForm<SuperCheckerFormType>({
    resolver: zodResolver(superCheckerSchema),
    defaultValues: {
      checkerDetails: {
        fullName: '',
        email: '',
        phoneNumber: '',
        location: '',
        productType: { card: true }, // Multi-checkbox expects object, not string
        transactionType: 'buy', // Single checkbox expects string
        status: 'active',
        agents: [],
        password: '',
        confirmPassword: '',
      },
    },
  });
  const {
    control,
    getValues,
    reset,
    setValue,
    trigger,
    formState: { errors },
    handleSubmit,
  } = methods;
  const navigate = useNavigate();
  const location = useLocation();
  const superChecker = location.state?.superChecker;

  const handleBack = () => {
    navigate(-1);
  };

  const onSubmit = async (data: any) => {
    //console.log('Form submitted with data:', data);
    // Add actual submission logic here
  };

  const handleFormSubmit = handleSubmit(onSubmit);
  const mapSuperCheckerData = (data: any) => {
    // Map incoming data fields to form field names
    const productTypeValue = data.productType?.toLowerCase();
    const mappedData = {
      checkerDetails: {
        fullName: data.fullName || '',
        email: data.emailId || '',
        phoneNumber: data.phoneNo || '',
        location: data.location || '',
        productType: productTypeValue === 'remittance' ? { remittance: true } :
                    productTypeValue === 'currency' ? { currency: true } :
                    productTypeValue === 'referral' ? { referral: true } :
                    { card: true }, // default to card
        transactionType: data.productSubType?.toLowerCase().includes('buy') ? 'buy' : 'sell',
        status: data.status?.toLowerCase() || 'active',
        agents: data.agents || [],
        password: data.password || '',
        confirmPassword: data.confirmPassword || '',
      },
    };
    return mappedData;
  };

  useEffect(() => {
    const superChecker = location.state?.superChecker;
    if (superChecker) {
      const mappedData = mapSuperCheckerData(superChecker);
      // Patch values one by one to handle different field names
      setValue('checkerDetails.fullName', mappedData.checkerDetails.fullName);
      setValue('checkerDetails.email', mappedData.checkerDetails.email);
      setValue('checkerDetails.phoneNumber', mappedData.checkerDetails.phoneNumber);
      setValue('checkerDetails.location', mappedData.checkerDetails.location);
      setValue(
        'checkerDetails.productType',
        {
          card: Boolean(mappedData.checkerDetails.productType.card),
          currency: Boolean(mappedData.checkerDetails.productType.currency),
          remittance: Boolean(mappedData.checkerDetails.productType.remittance),
          referral: Boolean(mappedData.checkerDetails.productType.referral),
        } as Record<'card' | 'currency' | 'remittance' | 'referral', boolean>
      );
      setValue('checkerDetails.transactionType', mappedData.checkerDetails.transactionType as 'buy' | 'sell');
      setValue('checkerDetails.status', mappedData.checkerDetails.status as 'active' | 'inactive');
      setValue('checkerDetails.agents', mappedData.checkerDetails.agents || []);
      setValue('checkerDetails.password', mappedData.checkerDetails.password);
      setValue('checkerDetails.confirmPassword', mappedData.checkerDetails.confirmPassword);

      // Trigger form validation and re-rendering
      setTimeout(() => {
        trigger();
        console.log('Form values after patching:', getValues());
      }, 100);
    }
  }, [setValue, location.state, getValues]);

  // Selected products (multi-select - get first selected product for conditional logic)
  const productTypeObj = useWatch({ control, name: 'checkerDetails.productType' }) as Record<string, boolean> || {};
  const selectedProducts: string = (Object.keys(productTypeObj) as Array<'card' | 'currency' | 'remittance' | 'referral'>).find(key => productTypeObj[key]) || '';

  // Set default transaction type based on product type
  useEffect(() => {
    if (productTypeObj.card) {
      setValue('checkerDetails.transactionType', 'buy');
    } else if (productTypeObj.currency) {
      setValue('checkerDetails.transactionType', 'sell');
    }
  }, [productTypeObj, setValue]);
  return (
    <div className="space-y-1 w-full">
      <div className="flex items-center space-x-2">
        <h2 className="text-sm font-semibold tracking-tight">Super Checker List Table / <span className="text-[var(--color-title)]">Create Superchecker</span></h2>
      </div>

      <FormProvider methods={methods}>
        <FormContentWrapper className="p-4 rounded-lg mr-auto w-full shadow-top">
          <h2 className="text-xl font-bold mb-4 title-case p-2 pt-0 border-b border-gray-300">
            {superChecker ? 'Update Superchecker' : 'Create New Superchecker'}
          </h2>
          <Spacer>
            <div className="relative p-1">
              <label className="text-sm text-[var(--color-form-label)] font-medium absolute">Basic Details</label>
            </div>
            <FormFieldRow rowCols={4}>
              {(['fullName', 'email', 'phoneNumber'] as const).map((fieldName) => {
                const field = superCheckerCreationConfig().fields.checkerDetails[fieldName];
                return (
                  <FieldWrapper key={fieldName}>
                    {getController({
                      ...(typeof field === 'object' && field !== null ? field : {}),
                      name: `checkerDetails.${fieldName}`,
                      control,
                      errors,
                    })}
                  </FieldWrapper>
                );
              })}
            </FormFieldRow>

          {/* Product and Transaction Type */}
          <div className="grid md:grid-cols-[30%_65%] lg:grid-cols-[15%_35%] md:gap-6 relative">
            {/* LEFT: Product Type */}
            <FieldWrapper>
              {getController({
                ...(superCheckerCreationConfig().fields.checkerDetails.productType ?? {}),
                name: 'checkerDetails.productType',
                control,
                errors,
              })}
            </FieldWrapper>

            {/* RIGHT: one bubble per selected product (Card/Currency), stacked */}
            <div className="grid items-start">
              {(['card', 'currency'] as const)
                .filter((p) => !!productTypeObj?.[p])
                .map((p, idx) => (
                  <FieldWrapper
                    key={`txn-${p}`}
                    className={[
                      // bubble
                      'relative overflow-visible self-start [height:fit-content]',
                      'rounded-lg border border-gray-300 bg-gray-50 px-3 py-2',

                      // TRIANGLE NOTCH (16x13, fill + outline)
                      'before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-4',
                      "before:content-[''] before:border-solid",
                      'before:[border-right-width:16px] before:[border-top-width:6.5px] before:[border-bottom-width:6.5px]',
                      'before:border-y-transparent before:[border-right-color:#D8D8D8]',
                      'after:absolute after:top-1/2 after:-translate-y-1/2 after:left-[-17px]',
                      "after:content-[''] after:border-solid",
                      'after:[border-right-width:17px] after:[border-top-width:7.5px] after:[border-bottom-width:7.5px]',
                      'after:border-y-transparent after:[border-right-color:#D1D5DB]',

                      // spacing adjustment
                      idx === 0 ? 'mt-1' : 'sm:mt-1 md:mt-[-35px]',
                    ].join(' ')}
                  >
                    {/* Force single-row alignment inside, overriding getController defaults */}
                    <div
                      className={[
                        'grid grid-cols-[auto_1fr] items-center',
                        "[&_[data-slot='form-item']]:m-0",
                        "[&_[data-slot='form-item']]:grid",
                        "[&_[data-slot='form-item']]:grid-cols-[auto_auto]",
                        "[&_[data-slot='form-item']]:items-center",
                        "[&_[data-slot='form-item']>label]:m-0",
                        "[&_[data-slot='form-item']>div]:m-0",
                        "[&_.flex]:flex-row [&_.flex]:items-center",
                      ].join(' ')}
                    >
                      {/* Right cell: radios inline */}
                      <div className="flex items-center leading-none">
                        {getController({
                          ...(superCheckerCreationConfig().fields.checkerDetails.transactionType ?? {}),
                          inline: true,
                          options: [
                            { label: 'Buy', value: 'buy' },
                            { label: 'Sell', value: 'sell' },
                          ],
                          name: `checkerDetails.transactionTypeMap.${p}`,
                          control,
                          errors,
                        })}
                      </div>
                    </div>
                  </FieldWrapper>
                ))}
            </div>
          </div>




            <FormFieldRow rowCols={4}>
              {(['agents'] as const).map((fieldName) => {
                const field = superCheckerCreationConfig().fields.checkerDetails[fieldName];
                return (
                  <FieldWrapper key={fieldName}>
                    {getController({
                      ...(typeof field === 'object' && field !== null ? field : {}),
                      name: `checkerDetails.${fieldName}`,
                      control,
                      errors,
                      isMulti:true
                    })}
                  </FieldWrapper>
                );
              })}
            </FormFieldRow>
            <FormFieldRow>
              {(['status'] as const).map((fieldName) => {
                const field = superCheckerCreationConfig().fields.checkerDetails[fieldName];
                return (
                  <FieldWrapper key={fieldName}>
                    {getController({
                      ...(typeof field === 'object' && field !== null ? field : {}),
                      name: `checkerDetails.${fieldName}`,
                      control,
                      errors,
                      disabled: fieldName === 'status' ? !superChecker : false, // Disable status field in create mode
                    })}
                  </FieldWrapper>
                );
              })}
            </FormFieldRow>
            {
              !superChecker && (
                <NotificationBanner
                  message="Newly created checkers active by default"
                  variant="warning"
                  size="sm"
                />
              )
            }
          
            <div className="relative p-1">
              <label className="text-sm text-[var(--color-form-label)] font-medium absolute">Create Password</label>
            </div>

            <FormFieldRow rowCols={4}>
              {(['password', 'confirmPassword'] as const).map((fieldName) => {
                const field = superCheckerCreationConfig().fields.checkerDetails[fieldName];
                return (
                  <FieldWrapper key={fieldName}>
                    {getController({
                      ...(typeof field === 'object' && field !== null ? field : {}),
                      name: `checkerDetails.${fieldName}`,
                      control,
                      errors,
                    })}
                  </FieldWrapper>
                );
              })}
            </FormFieldRow>
            <div className="flex justify-items-start space-x-2 mt-4 px-1">
              <Button variant="outline" className="w-28" onClick={handleBack}>
                Back
              </Button>
              <Button type="submit" variant="secondary" className="w-28" onClick={handleFormSubmit}>
                {superChecker ? 'Update' : 'Create'}
              </Button>
            </div>
          </Spacer>
        </FormContentWrapper>
      </FormProvider>
    </div>
  );
};
