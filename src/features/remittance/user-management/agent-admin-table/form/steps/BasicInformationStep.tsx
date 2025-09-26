import React from 'react';
import { useFormContext } from 'react-hook-form';
import { agentAdminCreationConfig } from '../agent-admin-creation.config';
import { getController } from '@/components/form/utils/get-controller';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import SubTitle from '../components/sub-title';

interface BasicInformationStepProps {
  isCompleted?: boolean;
}

export const BasicInformationStep: React.FC<BasicInformationStepProps> = () => {
  const { control, formState: { errors } } = useFormContext();
  const config = agentAdminCreationConfig();

  return (
    <div className="space-y-6">
      <div>
        <SubTitle title="Basic Details" />
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
        <SubTitle title="Other Details" />
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
        <SubTitle title="User Status" />
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
        <SubTitle title="Credit Information" titleClassName="mb-0"/>
        <p className="text-[12px] text-gray-500 pl-1 mb-2">
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

