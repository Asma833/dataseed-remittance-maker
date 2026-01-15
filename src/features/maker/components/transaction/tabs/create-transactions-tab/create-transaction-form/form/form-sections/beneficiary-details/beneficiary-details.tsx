import { memo } from 'react';
import Spacer from '@/components/form/wrapper/spacer';
import { beneficiaryBank, beneficiaryDetailsConfig } from './beneficairy-details.config';
import { CommonCreateTransactionProps } from '@/features/maker/components/transaction/types/create-transaction.types';
import { useFormContext, useWatch } from 'react-hook-form';
import { ShadCnRadioGroup } from '@/components/form/controller/ShadCnRadioGroup';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import { getController } from '@/components/form/utils/get-controller';

const IntermediaryBankSection = ({ formControl }: { formControl: any }) => {
    const intermediaryBankDetails = useWatch({ 
        control: formControl, 
        name: 'beneficiaryDetails.intermediaryBankDetails', 
        defaultValue: 'no' 
    });

    return (
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
                    <FormFieldRow wrapperClassName="xl:row-cols-3">
                        {beneficiaryBank.map((item) => {
                            return (
                                <FieldWrapper key={item.name}>
                                    {getController({
                                        name: `beneficiaryDetails.${item.name}`,
                                        label: item.label,
                                        type: item.type,
                                        placeholder: item.placeholder,
                                        required: item.required,
                                        control: formControl,
                                        errors: undefined,
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

const BeneficiaryDetails = memo(({ setAccordionState }: CommonCreateTransactionProps) => {
  const { control } = useFormContext();

  return (
    <Spacer>
      <FormFieldRow wrapperClassName="xl:row-cols-4">
        {(['beneficiary_name', 'beneficiary_address', 'beneficiary_city', 'beneficiary_country'] as const).map(
          (name) => {
            const field = beneficiaryDetailsConfig.find((f) => f.name === name);
            if (!field) return null;
            return (
              <FieldWrapper key={name}>
                {getController({ ...field, name: `beneficiaryDetails.${name}`, control, errors: undefined })}
              </FieldWrapper>
            );
          }
        )}
      </FormFieldRow>
      <FormFieldRow wrapperClassName="xl:row-cols-4">
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
              {getController({ ...field, name: `beneficiaryDetails.${name}`, control, errors: undefined })}
            </FieldWrapper>
          );
        })}
      </FormFieldRow>
      <FormFieldRow wrapperClassName="xl:row-cols-4">
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
              {getController({ ...field, name: `beneficiaryDetails.${name}`, control, errors: undefined })}
            </FieldWrapper>
          );
        })}
      </FormFieldRow>
      <FormFieldRow wrapperClassName="xl:row-cols-4">
        {(['student_name', 'student_passport_number', 'payment_instruction_number', 'university_name'] as const).map(
          (name) => {
            const field = beneficiaryDetailsConfig.find((f) => f.name === name);
            if (!field) return null;
            return (
              <FieldWrapper key={name}>
                {getController({ ...field, name: `beneficiaryDetails.${name}`, control, errors: undefined })}
              </FieldWrapper>
            );
          }
        )}
      </FormFieldRow>
      
      <IntermediaryBankSection formControl={control} />

    </Spacer>
  );
});

export default BeneficiaryDetails;
