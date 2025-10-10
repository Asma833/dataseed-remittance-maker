import React from 'react';
import { useFormContext } from 'react-hook-form';
import { agentAdminCreationConfig } from '../agent-admin-creation.config';
import { getController } from '@/components/form/utils/get-controller';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import SubTitle from '../components/sub-title';

export const ProductPurposeStep: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const config = agentAdminCreationConfig();

  return (
    <div className="space-y-6">
      <div>
        <SubTitle title="Document Downloads" />
        <FormFieldRow className="mb-4" rowCols={4}>
          {(['addOnForexMargin', 'addOnNostroMargin', 'addOnTTMargin', 'addOnOtherChargersMargin'] as const).map(
            (fieldName) => {
              const field = config.fields.productPurpose[fieldName];
              return (
                <FieldWrapper key={fieldName} className="bg-gray-100 p-2 pt-3 mb-2 rounded-lg">
                  {getController({
                    ...(typeof field === 'object' && field !== null ? field : {}),
                    name: `productPurpose.${fieldName}`,
                    control,
                    errors,
                    className: 'justify-center',
                  })}
                </FieldWrapper>
              );
            }
          )}
        </FormFieldRow>
        <FormFieldRow className="mb-4 justify-center" rowCols={4}>
          {(['esignDocumentDownload', 'vkycDocumentDownload'] as const).map((fieldName) => {
            const field = config.fields.productPurpose[fieldName];
            return (
              <FieldWrapper key={fieldName} className="bg-gray-100 p-2 pt-3 mb-2 rounded-lg">
                {getController({
                  ...(typeof field === 'object' && field !== null ? field : {}),
                  name: `productPurpose.${fieldName}`,
                  control,
                  errors,
                  className: 'justify-center',
                })}
              </FieldWrapper>
            );
          })}
        </FormFieldRow>
      </div>

      <div>
        <SubTitle title="Product and Credit Types" />
        <FormFieldRow className="mb-4" rowCols={1}>
          <FieldWrapper>
            {getController({
              ...config.fields.productPurpose.chooseProductType,
              name: 'productPurpose.chooseProductType',
              control,
              errors,
            })}
          </FieldWrapper>
        </FormFieldRow>
        <FormFieldRow className="mb-4" rowCols={1}>
          <FieldWrapper>
            {getController({
              ...config.fields.productPurpose.creditType,
              name: 'productPurpose.creditType',
              control,
              errors,
            })}
          </FieldWrapper>
        </FormFieldRow>
        <FormFieldRow className="bg-gray-100 p-2 mb-2 rounded-lg" rowCols={1}>
          <FieldWrapper>
            {getController({
              ...config.fields.productPurpose.purposeTypesForCard,
              name: 'productPurpose.purposeTypesForCard',
              control,
              variant: 'pill',
              errors,
            })}
          </FieldWrapper>
        </FormFieldRow>
      </div>
    </div>
  );
};
