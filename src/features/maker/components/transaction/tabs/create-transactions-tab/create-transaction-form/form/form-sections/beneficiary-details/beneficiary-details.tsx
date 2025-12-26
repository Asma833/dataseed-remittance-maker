import Spacer from '@/components/form/wrapper/spacer';
import { beneficiaryBank, beneficiaryDetailsConfig } from './beneficairy-details.config';
import { CommonCreateTransactionProps } from '@/features/maker/components/transaction/types/create-transaction.types';
import { useState } from 'react';
import { useFormContext, useWatch, useFormState } from 'react-hook-form';
import { ShadCnRadioGroup } from '@/components/form/controller/ShadCnRadioGroup';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import { getController } from '@/components/form/utils/get-controller';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const BeneficiaryDetails = ({ setAccordionState }: CommonCreateTransactionProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { control, trigger } = useFormContext();
  const { errors } = useFormState();
  const intermediaryBankDetails = useWatch({ name: 'beneficiaryDetails.intermediaryBankDetails', defaultValue: 'no' });

  // const flattenErrors = (obj: any, prefix = ''): string[] => {
  //   const keys: string[] = [];
  //   for (const key in obj) {
  //     if (obj[key] && typeof obj[key] === 'object' && obj[key].message) {
  //       keys.push(prefix ? `${prefix}.${key}` : key);
  //     } else if (obj[key] && typeof obj[key] === 'object') {
  //       keys.push(...flattenErrors(obj[key], prefix ? `${prefix}.${key}` : key));
  //     }
  //   }
  //   return keys;
  // };

  // const getFieldLabel = (key: string): string => {
  //   const parts = key.split('.');
  //   const fieldName = parts[parts.length - 1];
  //   const config = [...beneficiaryDetailsConfig, ...beneficiaryBank];
  //   const field = config.find((f) => f.name === fieldName);
  //   return field?.label || key;
  // };

  // const handleSave = async () => {
  //   const isValid = await trigger();
  //   if (!isValid) {
  //     const missingFields = flattenErrors(errors);
  //     toast.error(`Missing required field: ${getFieldLabel(missingFields[0])}`);
  //     return;
  //   }
  //   // Submit the form to hit the API
  //   const formElement = document.getElementById('create-transaction-form') as HTMLFormElement;
  //   if (formElement) {
  //     formElement.requestSubmit();
  //   }
  // };
  return (
    <Spacer>
      <FormFieldRow rowCols={4}>
        {(['beneficiary_name', 'beneficiary_address', 'beneficiary_city', 'beneficiary_country'] as const).map(
          (name) => {
            const field = beneficiaryDetailsConfig.find((f) => f.name === name);
            if (!field) return null;
            return (
              <FieldWrapper key={name}>
                {getController({ ...field, name: `beneficiaryDetails.${name}`, control, errors })}
              </FieldWrapper>
            );
          }
        )}
      </FormFieldRow>
      <FormFieldRow rowCols={4}>
        {(
          [
            'beneficiary_account_number_iban_number',
            'beneficiary_swift_code',
            'beneficiary_bank_name',
            'beneficiary_bank_address',
          ] as const
        ).map((name) => {
          const field = beneficiaryDetailsConfig.find((f) => f.name === name);
          if (!field) return null;
          return (
            <FieldWrapper key={name}>
              {getController({ ...field, name: `beneficiaryDetails.${name}`, control, errors })}
            </FieldWrapper>
          );
        })}
      </FormFieldRow>
      <FormFieldRow rowCols={4}>
        {(
          ['sort_bsb_aba_transit_code', 'nostro_charges', 'message_to_beneficiary_additional_information'] as const
        ).map((name) => {
          const field = beneficiaryDetailsConfig.find((f) => f.name === name);
          if (!field) return null;
          return (
            <FieldWrapper
              key={name}
              className={name === 'message_to_beneficiary_additional_information' ? 'col-span-2' : ''}
            >
              {getController({ ...field, name: `beneficiaryDetails.${name}`, control, errors })}
            </FieldWrapper>
          );
        })}
      </FormFieldRow>
      <FormFieldRow rowCols={4}>
        {(['student_name', 'student_passport_number', 'payment_instruction_number', 'university_name'] as const).map(
          (name) => {
            const field = beneficiaryDetailsConfig.find((f) => f.name === name);
            if (!field) return null;
            return (
              <FieldWrapper key={name}>
                {getController({ ...field, name: `beneficiaryDetails.${name}`, control, errors })}
              </FieldWrapper>
            );
          }
        )}
      </FormFieldRow>
      <div className="flex w-full items-start">
        <FieldWrapper className="w-1/4">
          <ShadCnRadioGroup
            name="beneficiaryDetails.intermediaryBankDetails"
            label="Intermediary Bank Details"
            options={{
              yes: { label: 'Yes' },
              no: { label: 'No' },
            }}
            className="justify-start"
          />
        </FieldWrapper>
        {intermediaryBankDetails === 'yes' && (
          <div className="flex-1">
            <FormFieldRow rowCols={3}>
              {beneficiaryBank.map((item) => {
                return (
                  <FieldWrapper key={item.name}>
                    {getController({
                      name: `beneficiaryDetails.${item.name}`,
                      label: item.label,
                      type: item.type,
                      placeholder: item.placeholder,
                      required: item.required,
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
      <div className="flex justify-center items-center">
        {/* <Button variant="secondary" onClick={handleSave} disabled={isSaving} className="mx-2 w-24">
          {isSaving ? 'Saving...' : 'Save'}
        </Button> */}
        {/* <Button variant='light' onClick={handleEdit} className='w-24'  disabled={isEditing}>
          {isEditing ? 'Editing' : 'Edit'}
        </Button> */}
      </div>
    </Spacer>
  );
};

export default BeneficiaryDetails;
