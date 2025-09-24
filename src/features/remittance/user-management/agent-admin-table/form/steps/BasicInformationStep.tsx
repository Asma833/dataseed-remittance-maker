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
          {(['vendorCode', 'fullName', 'emailId'] as const).map((fieldName) => {
            const field = config.fields.basicInformation[fieldName];
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
        <FormFieldRow className="mb-4" rowCols={3}>
          {(['phoneNo', 'agentType', 'agentBranchCity'] as const).map((fieldName) => {
            const field = config.fields.basicInformation[fieldName];
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
        <FormFieldRow className="mb-4" rowCols={3}>
          {(['agentHOBranchState', 'ebixRMName', 'ebixRMBranchName'] as const).map((fieldName) => {
            const field = config.fields.basicInformation[fieldName];
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
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Other Details</h3>
        <FormFieldRow className="mb-4" rowCols={3}>
          {(['systemCode'] as const).map((fieldName) => {
            const field = config.fields.basicInformation[fieldName];
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
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Status</h3>
        <FormFieldRow className="mb-4" rowCols={3}>
          {(['status'] as const).map((fieldName) => {
            const field = config.fields.basicInformation[fieldName];
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
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Credit Information</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Please input the desired line credit limit and credit days.
        </p>
        <FormFieldRow className="mb-4" rowCols={3}>
          {(['monthlyCreditLimit', 'totalCreditDays'] as const).map((fieldName) => {
            const field = config.fields.basicInformation[fieldName];
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
      </div>
    </div>
  );
};

