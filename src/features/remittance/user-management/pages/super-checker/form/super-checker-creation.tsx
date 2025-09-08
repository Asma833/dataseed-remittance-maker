import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import type { z } from "zod";
import { FormContentWrapper } from "@/components/form/wrapper/form-content-wrapper";
import FormFieldRow from "@/components/form/wrapper/form-field-row";
import Spacer from "@/components/form/wrapper/spacer";
import { useNavigate, useLocation } from "react-router-dom";
import { superCheckerCreationConfig } from "./super-checker-creation.config";
import FieldWrapper from "@/components/form/wrapper/field-wrapper";
import { FormProvider } from "@/components/form/providers/form-provider";
import { getController } from "@/components/form/utils/get-controller";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { superCheckerSchema } from "./super-checker-creation.schema";


export const CreateSuperChecker = () => {
  type SuperCheckerFormType = z.infer<typeof superCheckerSchema>;
  const methods = useForm<SuperCheckerFormType>({
    resolver: zodResolver(superCheckerSchema),
    defaultValues: {
      checkerDetails: {
        fullName: "",
        email: "",
        phoneNumber: "",
        location: "",
        productType: "remittance",
        transactionType: "buy",
        status: "active"
      }
    }
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
      const mappedData = {
        checkerDetails: {
          fullName: data.fullName || '',
          email: data.emailId || '',
          phoneNumber: data.phoneNo || '',
          location: data.location || '',
          productType: data.productType?.toLowerCase() === 'remittance' ? 'remittance' : 'cnc',
          transactionType: data.productSubType?.toLowerCase().includes('buy') ? 'buy' : 'sell',
          status: data.status?.toLowerCase() || 'active'
        }
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
        setValue('checkerDetails.productType', mappedData.checkerDetails.productType as 'cnc' | 'remittance');
        setValue('checkerDetails.transactionType', mappedData.checkerDetails.transactionType as 'buy' | 'sell');
        setValue('checkerDetails.status', mappedData.checkerDetails.status as 'active' | 'inactive');

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
            <ArrowLeft className="cursor-pointer h-5 w-5" onClick={handleBack} />
            <h2 className="text-xl font-semibold tracking-tight">Dataseed Super Checker</h2>
          </div>
        
       <FormProvider methods={methods}>
        <FormContentWrapper className="p-3 rounded-lg mr-auto w-full shadow-top">
        <h2 className="text-xl font-bold mb-4 title-case p-2 border-b border-gray-300">{superChecker ? 'Update Super Checker' : 'Create Super Checker'}</h2>
        <Spacer>
          <FormFieldRow rowCols={4}>
            {(['fullName', 'email', 'phoneNumber', 'location'] as const).map((fieldName) => {
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
          <FormFieldRow>
            {(['productType'] as const).map((fieldName) => {
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
          <FormFieldRow>
            {(['transactionType'] as const).map((fieldName) => {
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
                  })}
                </FieldWrapper>
              );
            })}
          </FormFieldRow>
          <div className="flex justify-items-start space-x-2 mt-4">
            <Button variant="outline" className="rounded-2xl w-28" onClick={handleBack}>Back</Button>
            <Button type="submit" className="rounded-2xl w-28" onClick={handleFormSubmit}>{superChecker ? 'Update' : 'Create'}</Button>
          </div>
        </Spacer>
      </FormContentWrapper>
    </FormProvider>
    </div>
  );
}

