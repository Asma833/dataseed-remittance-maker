import React, { useMemo, useEffect } from 'react';
import { useFormContext, useWatch, Controller, FieldError } from 'react-hook-form';
import { agentAdminCreationConfig } from '../agent-admin-creation.config';
import { getController } from '@/components/form/utils/get-controller';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import SubTitle from '../components/sub-title';

type ProductKey = 'card' | 'currency' | 'remittance' | 'referral';

export const ProductPurposeStep: React.FC = () => {
  const {
    control,
    setValue,
    formState: { errors },
    trigger,
  } = useFormContext();

  const config = agentAdminCreationConfig();

  // live values
  const choose = useWatch({
    control,
    name: 'productPurpose.chooseProductType',
  }) as Partial<Record<ProductKey, boolean>> | undefined;

  // map product -> label + purposes field name
  const nodes = useMemo(() => {
    const opts = config.fields.productPurpose.chooseProductType
      .options as Record<ProductKey, { label: string }>;
    return ([
      { key: 'card',       label: opts.card?.label ?? 'Card',       purposesField: 'purposeTypesForCard' },
      { key: 'currency',   label: opts.currency?.label ?? 'Currency', purposesField: 'purposeTypesForCurrency' },
      { key: 'remittance', label: opts.remittance?.label ?? 'Remittance', purposesField: 'purposeTypesForRemittance' },
      { key: 'referral',   label: opts.referral?.label ?? 'Referral', purposesField: 'purposeTypesForReferral' },
    ] as const);
  }, [config]);

  const clearPurposes = (pf: string) => {
    // assumes your purposes are objects with boolean values. adjust if different.
    setValue(`productPurpose.${pf}`, {}, { shouldValidate: true, shouldDirty: true });
  };


  return (
    <div className="space-y-6 min-h-[500px]">
     
      {/* ===== Product & Purpose Type (TREE with checkboxes) ===== */}
      <div>
        <SubTitle title="Product & Purpose Type" />
        <div className="space-y-2">
          {nodes.map(({ key, label, purposesField }) => {
            const checked = !!choose?.[key];

            return (
              <div key={key} className="border-l-2 border-gray-300 pl-3">
                {/* Row header becomes a checkbox */}
                <div className="flex items-center gap-2 py-2">
                  <Controller
                    control={control}
                    name={`productPurpose.chooseProductType.${key}` as const}
                    render={({ field }) => (
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          className="h-4 w-4 accent-purple-600"
                          checked={!!field.value}
                          onChange={(e) => {
                            const next = e.target.checked;
                            field.onChange(next);
                            // when unchecking, clear the selected purposes for this product
                            if (!next) clearPurposes(purposesField);
                            // Trigger validation for chooseProductType after change
                            trigger('productPurpose.chooseProductType');
                          }}
                        />
                        <span className="font-medium text-gray-700">{label}</span>
                      </label>
                    )}
                  />
                </div>

                {/* Children: only render when product is selected */}
                {checked && (
                  <div className="ml-6 mt-2">
                    <div className="bg-gray-100 p-2 py-4 mb-2 rounded-lg shadow-sm">
                      {getController({
                        ...(config.fields.productPurpose as any)[purposesField],
                        name: `productPurpose.${purposesField}`,
                        control,
                        required: true, // required iff product checked
                        errors,
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Global error display for chooseProductType */}
          {errors?.productPurpose &&
            'chooseProductType' in errors.productPurpose &&
            errors.productPurpose.chooseProductType && (
            <p className="text-red-600 text-sm mt-1 ml-2">
              {(errors.productPurpose.chooseProductType as FieldError).message ||
                'Please select at least one Product Type'}
            </p>
          )}
        </div>
      </div>
       {/* ===== Additional Rights (unchanged) ===== */}
      <div>
        <SubTitle title="Additional Rights" />
        <FormFieldRow className="mb-4" rowCols={4}>
          {(
            [
              'addOnForexMargin',
              'addOnNostroMargin',
              'addOnTTMargin',
              'addOnOtherChargersMargin',
            ] as const
          ).map((fieldName) => {
            const field = config.fields.productPurpose[fieldName];
            return (
              <FieldWrapper key={fieldName} className="bg-gray-100 p-2 py-4 mb-2 rounded-lg">
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

        <FormFieldRow className="mb-4 justify-center" rowCols={4}>
          {(['esignDocumentDownload', 'vkycDocumentDownload'] as const).map((fieldName) => {
            const field = config.fields.productPurpose[fieldName];
            return (
              <FieldWrapper key={fieldName} className="bg-gray-100 p-2 py-4 mb-2 rounded-lg">
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
    </div>
  );
};
