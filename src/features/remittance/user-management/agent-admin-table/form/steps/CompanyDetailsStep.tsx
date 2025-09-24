import React from 'react';
import { useFormContext } from 'react-hook-form';
import { agentAdminCreationConfig } from '../agent-admin-creation.config';
import { getController } from '@/components/form/utils/get-controller';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import FormFieldRow from '@/components/form/wrapper/form-field-row';

export const CompanyDetailsStep: React.FC = () => {
  const { control, formState: { errors } } = useFormContext();
  const config = agentAdminCreationConfig();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">GST Details</h3>
        <FormFieldRow className="mb-4" rowCols={3}>
          <FieldWrapper>
            {getController({
              ...config.fields.companyDetails.gstClassification,
              control,
              errors,
            })}
          </FieldWrapper>
          <FieldWrapper>
            {getController({
              ...config.fields.companyDetails.gstNumber,
              control,
              errors,
            })}
          </FieldWrapper>
          <FieldWrapper>
            {getController({
              ...config.fields.companyDetails.gstPhoneNo,
              control,
              errors,
            })}
          </FieldWrapper>
        </FormFieldRow>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Address as per GST</h3>
        <FormFieldRow className="mb-4" rowCols={4}>
          <FieldWrapper>
            {getController({
              ...config.fields.companyDetails.flatDoorNumber,
              control,
              errors,
            })}
          </FieldWrapper>
          <FieldWrapper>
            {getController({
              ...config.fields.companyDetails.roadStreet,
              control,
              errors,
            })}
          </FieldWrapper>
          <FieldWrapper>
            {getController({
              ...config.fields.companyDetails.areaLocality,
              control,
              errors,
            })}
          </FieldWrapper>
          <FieldWrapper>
            {getController({
              ...config.fields.companyDetails.gstCity,
              control,
              errors,
            })}
          </FieldWrapper>
        </FormFieldRow>
        <FormFieldRow className="mb-4" rowCols={3}>
          <FieldWrapper>
            {getController({
              ...config.fields.companyDetails.gstState,
              control,
              errors,
            })}
          </FieldWrapper>
          <FieldWrapper>
            {getController({
              ...config.fields.companyDetails.pinCode,
              control,
              errors,
            })}
          </FieldWrapper>
          <FieldWrapper>
            {getController({
              ...config.fields.companyDetails.gstBranch,
              control,
              errors,
            })}
          </FieldWrapper>
        </FormFieldRow>
      </div>
    </div>
  );
};