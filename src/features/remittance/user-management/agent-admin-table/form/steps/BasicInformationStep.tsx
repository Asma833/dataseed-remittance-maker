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
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const config = agentAdminCreationConfig();

  return (
    <div className="space-y-6">
      <div>
        <SubTitle title="Basic Details" />
        <FormFieldRow className="mb-4" rowCols={3}>
          {(['agent_name','emailId','systemCode'] as const).map((fieldName) => {
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
          {(['agentHOBranchState', 'rm_name', 'rm_branch_name'] as const).map((fieldName) => {
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
                  className: 'justify-start',
                  errors,
                })}
              </FieldWrapper>
            );
          })}
        </FormFieldRow>
      </div>
      <div>
        <SubTitle title="Credit Type & Credit Information" />
        <FormFieldRow className="mb-4" rowCols={4}>
          {(['agentCategory','monthlyCreditLimit', 'totalCreditDays'] as const).map((fieldName) => {
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
      <SubTitle title="Create Password" />
      <FormFieldRow rowCols={3}>
        {(['password', 'confirmPassword'] as const).map((fieldName) => {
          const field = config.fields.basicInformation[fieldName];
          return (
            <FieldWrapper key={fieldName}>
              {getController({
                ...(field ?? {}),
                name: field.name,
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
