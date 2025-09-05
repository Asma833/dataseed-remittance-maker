import { FormContentWrapper } from "@/components/form/wrapper/form-content-wrapper";
import FormFieldRow from "@/components/form/wrapper/form-field-row";
import Spacer from "@/components/form/wrapper/spacer";
import { FormField } from "@/components/ui/form";
import { superCheckerCreationConfig } from "./super-checker-creation.config";
import FieldWrapper from "@/components/form/wrapper/field-wrapper";
import { FormProvider, useForm } from "react-hook-form";
import { getController } from "@/components/form/utils/get-controller";
import { Button } from "@/components/ui/button";

export const CreateSuperChecker = () => {
  const methods = useForm();
  const { control, formState: { errors } } = methods;

  return (
    <FormProvider {...methods}>
      <FormContentWrapper className="p-6 rounded-lg mr-auto shadow-md w-full">
        <h2 className="text-xl font-bold mb-4 title-case p-2 border-b border-gray-300">Create Super Checker</h2>
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
          <div className="flex justify-items-start space-x-2 mt-4">
            <Button variant="outline" className="rounded-2xl w-28">Back</Button>
            <Button type="submit" className="rounded-2xl w-28">Submit</Button>
          </div>
        </Spacer>
      </FormContentWrapper>
    </FormProvider>
  );
}

