import React from 'react';
import { useFormContext } from 'react-hook-form';
import { agentAdminCreationConfig } from '../agent-admin-creation.config';
import { getController } from '@/components/form/utils/get-controller';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import FormFieldRow from '@/components/form/wrapper/form-field-row';

interface BasicInformationStepProps {
  isCompleted?: boolean;
}

export const BasicInformationStep: React.FC<BasicInformationStepProps> = ({ isCompleted = false }) => {
  const { control, formState: { errors } } = useFormContext();
  const config = agentAdminCreationConfig();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Details</h3>
        <FormFieldRow className="mb-4" rowCols={3}>
          <FieldWrapper>
            {getController({
              ...config.fields.basicInformation.vendorCode,
              control,
              errors,
            })}
          </FieldWrapper>
          <FieldWrapper>
            {getController({
              ...config.fields.basicInformation.fullName,
              control,
              errors,
            })}
          </FieldWrapper>
          <FieldWrapper>
            {getController({
              ...config.fields.basicInformation.emailId,
              control,
              errors,
            })}
          </FieldWrapper>
        </FormFieldRow>
        <FormFieldRow className="mb-4" rowCols={3}>
          <FieldWrapper>
            {getController({
              ...config.fields.basicInformation.phoneNo,
              control,
              errors,
            })}
          </FieldWrapper>
          <FieldWrapper>
            {getController({
              ...config.fields.basicInformation.agentType,
              control,
              errors,
            })}
          </FieldWrapper>
          <FieldWrapper>
            {getController({
              ...config.fields.basicInformation.agentBranchCity,
              control,
              errors,
            })}
          </FieldWrapper>
        </FormFieldRow>
        <FormFieldRow className="mb-4" rowCols={3}>
          <FieldWrapper>
            {getController({
              ...config.fields.basicInformation.agentHOBranchState,
              control,
              errors,
            })}
          </FieldWrapper>
          <FieldWrapper>
            {getController({
              ...config.fields.basicInformation.ebixRMName,
              control,
              errors,
            })}
          </FieldWrapper>
          <FieldWrapper>
            {getController({
              ...config.fields.basicInformation.ebixRMBranchName,
              control,
              errors,
            })}
          </FieldWrapper>
        </FormFieldRow>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Other Details</h3>
        <FormFieldRow className="mb-4" rowCols={3}>
          <FieldWrapper>
            {getController({
              ...config.fields.basicInformation.systemCode,
              control,
              errors,
            })}
          </FieldWrapper>
        </FormFieldRow>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Status</h3>
        <FormFieldRow className="mb-4" rowCols={1}>
          <FieldWrapper>
            {getController({
              ...config.fields.basicInformation.status,
              control,
              errors,
            })}
          </FieldWrapper>
        </FormFieldRow>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Credit Information</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Please input the desired line credit limit and credit days.
        </p>
        <FormFieldRow className="mb-4" rowCols={3}>
          <FieldWrapper>
            {getController({
              ...config.fields.basicInformation.monthlyCreditLimit,
              control,
              errors,
            })}
          </FieldWrapper>
          <FieldWrapper>
            {getController({
              ...config.fields.basicInformation.totalCreditDays,
              control,
              errors,
            })}
          </FieldWrapper>
        </FormFieldRow>
      </div>
    </div>
  );
};

