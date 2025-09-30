import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
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
import { TableTitle } from '@/features/auth/components/table-title';
import { FormTitle } from '@/features/auth/components/form-title';
import { useCreateSuperChecker } from '../../hooks/useCreateSuperChecker';
import { useUpdateSuperChecker } from '../../hooks/useUpdateSuperChecker';
import { ProductTransactionSelector } from '@/components/form/product-transaction-selector';

export const CreateSuperChecker = () => {
  type SuperCheckerFormType = z.infer<typeof superCheckerSchema>;
  const methods = useForm<SuperCheckerFormType>({
  resolver: zodResolver(superCheckerSchema),
  mode: "onChange",           
  reValidateMode: "onChange", 
  defaultValues: {
    checkerDetails: {
      fullName: "",
      email: "",
      phoneNumber: "",
      productType: { card: true }, // your default
      agents: [],
      password: "",
      confirmPassword: "",
      transactionTypeMap: { card: 'buy', currency: 'buy' }, // default transaction type
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

  const { mutate: createSuperChecker, isLoading: isCreating } = useCreateSuperChecker({
    onSuperCheckerCreateSuccess: () => navigate(-1),
  });
  const { mutate: updateSuperChecker, isLoading: isUpdating } = useUpdateSuperChecker({
    onSuperCheckerUpdateSuccess: () => navigate(-1),
  });

  const handleBack = () => {
    navigate(-1);
  };

  

  
  //  const handleFormSubmit = handleSubmit(onSubmit);
     const handleFormSubmit = handleSubmit((formdata: SuperCheckerFormType) => {
      console.log(formdata, "formdata");
      const requestData = {
      full_name: formdata.checkerDetails.fullName,
      email: formdata.checkerDetails.email,
      password: formdata.checkerDetails.password,
      phone_number: formdata.checkerDetails.phoneNumber,
      agent_ids: [
    "691ee70a-1a34-4012-83e8-e67883c2b772"
  ],
    product_types: Object.keys(formdata.checkerDetails.productType)
      .filter((key) => formdata.checkerDetails.productType[key as keyof typeof formdata.checkerDetails.productType])
      .map((product) => {
        if (product === 'card' || product === 'currency') {
          const transaction = formdata.checkerDetails.transactionTypeMap?.[product as 'card' | 'currency'];
          const trans = transaction ? transaction.charAt(0).toUpperCase() + transaction.slice(1) : 'Buy';
          return `${product.charAt(0).toUpperCase() + product.slice(1)}-${trans}`;
        } else {
          return product.charAt(0).toUpperCase() + product.slice(1);
        }
      }),
      }
    if (superChecker) {
      updateSuperChecker({ ...requestData, id: superChecker.id });
    } else {
      createSuperChecker({ ...requestData, password: requestData.password as string });
    }
  });
  const mapSuperCheckerData = (data: any) => {
    if (!data) return {
      checkerDetails: {
        fullName: '',
        email: '',
        phoneNumber: '',
        productType: { card: true },
        agents: [],
        password: '',
        confirmPassword: '',
      }
    };
    // Map incoming data fields to form field names
    const productType: Record<string, boolean> = {};
    if (data.product_types) {
      data.product_types.forEach((pt: string) => {
        const [prod] = pt.split('-');
        const key = prod.toLowerCase();
        productType[key] = true;
      });
    } else {
      productType.card = true; // default
    }
    const mappedData = {
      checkerDetails: {
        fullName: data.full_name || '',
        email: data.email || '',
        phoneNumber: data.phone_number || '',
        productType,
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
      setValue('checkerDetails.productType', mappedData.checkerDetails.productType);
      setValue('checkerDetails.agents', mappedData.checkerDetails.agents || []);
      setValue('checkerDetails.password', mappedData.checkerDetails.password);
      setValue('checkerDetails.confirmPassword', mappedData.checkerDetails.confirmPassword);

      // Set transactionTypeMap based on product_types
      const transactionTypeMap: Record<'card' | 'currency', 'buy' | 'sell'> = {} as any;
      if (superChecker.product_types) {
        superChecker.product_types.forEach((pt: string) => {
          const [prod, trans] = pt.split('-');
          const key = prod.toLowerCase();
          if (key === 'card' || key === 'currency') {
            transactionTypeMap[key as 'card' | 'currency'] = trans.toLowerCase() as 'buy' | 'sell';
          }
        });
      }
      setValue('checkerDetails.transactionTypeMap', transactionTypeMap);

      // Trigger form validation and re-rendering
      setTimeout(() => {
        trigger();
        console.log('Form values after patching:', getValues());
      }, 100);
    }
  }, [setValue, location.state, getValues]);

  return (
    <div className="space-y-1 w-full">
      <div className="flex items-center space-x-2">
      <FormTitle tableName="Super Checker List Table"
        actionName={superChecker ? 'Update Superchecker' : 'Create New Superchecker'}
        />
      </div>

      <FormProvider methods={methods}>
        <form onSubmit={handleFormSubmit}>
          <FormContentWrapper className="p-4 rounded-lg mr-auto w-full shadow-top">
          <TableTitle title={superChecker ? 'Update Superchecker' : 'Create New Superchecker'} titleClassName="text-black"/>
          <Spacer>
            <div className="relative p-1">
              <label className="text-sm font-medium absolute">Basic Details</label>
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

          {/* Product and Transaction Type - Using Reusable Component */}
          <ProductTransactionSelector
            control={control}
            errors={errors}
            productFieldName="checkerDetails.productType"
            transactionFieldName="checkerDetails.transactionTypeMap"
            productOptions={superCheckerCreationConfig().fields.checkerDetails.productType.options}
            showTransactionFor={['card', 'currency']}
          />
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
            {/* <FormFieldRow>
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
            </FormFieldRow> */}
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
              <label className="text-sm font-semibold absolute">Create Password</label>
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
              <Button type="submit" variant="secondary" className="w-28" disabled={isCreating || isUpdating}>
                {isCreating || isUpdating ? 'Submitting...' : (superChecker ? 'Update' : 'Create')}
              </Button>
            </div>
          </Spacer>
          </FormContentWrapper>
        </form>
      </FormProvider>
    </div>
  );
};
