import React from 'react';
import { useFormContext } from 'react-hook-form';
import { agentAdminCreationConfig } from '../agent-admin-creation.config';
import { getController } from '@/components/form/utils/get-controller';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import SubTitle from '../components/sub-title';

export const CompanyDetailsStep: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const config = agentAdminCreationConfig();

  return (
    <div className="space-y-6">
      <div>
        <SubTitle title="GST Details" />
        <FormFieldRow className="mb-4" rowCols={4}>
          {(['gstClassification', 'gstNumber', 'gstPhoneNo'] as const).map((fieldName) => {
            const field = config.fields.companyDetails[fieldName];
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
        <SubTitle title="Address as per GST" />
        <FormFieldRow className="mb-4" rowCols={4}>
          {(['flatDoorNumber', 'roadStreet', 'areaLocality', 'gstCity'] as const).map((fieldName) => {
            const field = config.fields.companyDetails[fieldName];
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
        <FormFieldRow className="mb-4" rowCols={4}>
          {(['gstState', 'pinCode', 'gstBranch'] as const).map((fieldName) => {
            const field = config.fields.companyDetails[fieldName];
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
