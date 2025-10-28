import React, { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { agentAdminCreationConfig } from '../agent-admin-creation.config';
import { getController } from '@/components/form/utils/get-controller';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import SubTitle from '../components/sub-title';

export const CompanyDetailsStep: React.FC = () => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();
  const config = agentAdminCreationConfig();
  const gstClassification = useWatch({ control, name: 'gstClassification' });

  // Reset address fields when gstClassification is unregistered
  useEffect(() => {
    if (gstClassification === 'unregistered') {
      setValue('flatDoorNumber', '');
      setValue('roadStreet', '');
      setValue('areaLocality', '');
      setValue('gstCity', '');
      setValue('gstState', '');
      setValue('pinCode', '');
      setValue('gstBranch', '');
    }
  }, [gstClassification, setValue]);

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

      {gstClassification !== 'unregistered' && (
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
      )}
    </div>
  );
};
