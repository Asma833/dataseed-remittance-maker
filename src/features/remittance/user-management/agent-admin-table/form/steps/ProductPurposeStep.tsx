import React from 'react';
import { useFormContext } from 'react-hook-form';
import { agentAdminCreationConfig } from '../agent-admin-creation.config';
import { getController } from '@/components/form/utils/get-controller';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import FormFieldRow from '@/components/form/wrapper/form-field-row';

export const ProductPurposeStep: React.FC = () => {
  const { control, formState: { errors } } = useFormContext();
  const config = agentAdminCreationConfig();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Document Downloads</h3>
        <FormFieldRow className="mb-4" rowCols={3}>
          {(['addOnMargin', 'esignDocumentDownload', 'vkycDocumentDownload'] as const).map((fieldName) => {
            const field = config.fields.productPurpose[fieldName];
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
        <h3 className="text-lg font-semibold mb-4">Product and Credit Types</h3>
        <FormFieldRow className="mb-4">
          <FieldWrapper>
            {getController({
              ...config.fields.productPurpose.chooseProductType,
              name: 'chooseProductType',
              control,
              errors,
            })}
          </FieldWrapper>
        </FormFieldRow>
        <FormFieldRow className="mb-4">
          <FieldWrapper>
            {getController({
              ...config.fields.productPurpose.creditType,
              name: 'creditType',
              control,
              errors,
            })}
          </FieldWrapper>
        </FormFieldRow>
        <FormFieldRow className="mb-4">
          <FieldWrapper>
            {getController({
              ...config.fields.productPurpose.purposeTypesForCard,
              name: 'purposeTypesForCard',
              control,
              errors,
            })}
          </FieldWrapper>
        </FormFieldRow>
      </div>
    </div>
  );
};