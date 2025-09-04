import { FormContentWrapper } from "@/components/form/wrapper/form-content-wrapper";
import FormFieldRow from "@/components/form/wrapper/form-field-row";
import Spacer from "@/components/form/wrapper/spacer";
import { FormField } from "@/components/ui/form";
import { superCheckerCreationConfig } from "./super-checker-creation.config";
import FieldWrapper from "@/components/form/wrapper/field-wrapper";
import { FormProvider, useForm } from "react-hook-form";
import { getController } from "@/components/form/utils/get-controller";


export const CreateSuperChecker = () => {
  const methods = useForm();
  const { control, formState: { errors } } = methods;

  return (
    <FormProvider {...methods}>
      <FormContentWrapper className="p-2 rounded-lg mr-auto bg-transparent">
        <h2 className="text-xl font-bold mb-4 title-case">Super Checker Creation</h2>
        <Spacer>
          <FormFieldRow rowCols={4}>
            {(['fullName', 'email', 'phoneNumber', 'location'] as const).map((fieldName) => {
              const field = superCheckerCreationConfig().fields.checkerDetails[fieldName];
              return (
                <FieldWrapper key={fieldName}>
                  {getController({
                    ...(typeof field === 'object' && field !== null ? field : {}),
                    name: fieldName,
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
                    name: fieldName,
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
                    name: fieldName,
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
                    name: fieldName,
                    control,
                    errors,
                  })}
                </FieldWrapper>
              );
            })}
          </FormFieldRow>
        </Spacer>
      </FormContentWrapper>
    </FormProvider>
  );
}

