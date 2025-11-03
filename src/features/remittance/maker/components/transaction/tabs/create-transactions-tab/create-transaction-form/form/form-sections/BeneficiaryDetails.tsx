import { getController } from '@/components/form/utils/getController';
import FieldWrapper from '@/components/form/wrapper/FieldWrapper';
import FormFieldRow from '@/components/form/wrapper/FormFieldRow';
import Spacer from '@/components/form/wrapper/Spacer';
import { beneficiaryBank, beneficiaryDetailsMeta } from '../form-meta/beneficairyDetailsMeta';
import { MaterialRadioGroup } from '@/components/form/controller/MaterialRadioGroup';
import { CommonCreateTransactionProps } from '@/features/maker/types/create-transaction.types';
import { cn } from '@/utils/cn';
import Actions from '../../components/Actions';
import { useState } from 'react';

const BeneficiaryDetails = ({ setAccordionState }: CommonCreateTransactionProps) => {
  console.log('BeneficiaryDetails: RENDERING');
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Implement save functionality
      console.log('Saving transaction basic details...');
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    console.log('Editing mode enabled');
  };

  const handleCancel = () => {
    console.log('Cancelling operation');
    setIsEditing(false);
    // Reset form or navigate away
  };
  return (
    <Spacer>
      <FormFieldRow rowCols={4}>
        {beneficiaryDetailsMeta.map((item) => {
          return (
            <FieldWrapper
              key={item.name}
              className={cn({
                'md:!w-[calc(50%-15px)]': item.name === 'messageToBeneficaryAdditionalInformation',
              })}
            >
              {getController({
                name: item.name,
                label: item.label,
                type: item.type,
                placeholder: item.placeholder,
                required: item.required,
              })}
            </FieldWrapper>
          );
        })}
      </FormFieldRow>
      <div className="flex w-full items-start">
        <FieldWrapper className="w-1/4">
          <MaterialRadioGroup
            name="intermediaryBankDetails"
            label="Intermediary Bank Details"
            options={{
              yes: { label: 'Yes' },
              no: { label: 'No' },
            }}
            onChange={(e) => {
              alert('Intermediary Bank Details changed:');
            }}
          />
        </FieldWrapper>
        <FormFieldRow rowCols={3}>
          {beneficiaryBank.map((item) => {
            return (
              <FieldWrapper key={item.name}>
                {getController({
                  name: item.name,
                  label: item.label,
                  type: item.type,
                  placeholder: item.placeholder,
                  required: item.required,
                })}
              </FieldWrapper>
            );
          })}
        </FormFieldRow>
      </div>
      <Actions
        handleSave={handleSave}
        handleEdit={handleEdit}
        handleNext={() => setAccordionState({ currentActiveTab: 'panel3' })}
        handlePrevious={() => setAccordionState({ currentActiveTab: 'panel1' })}
        handleCancel={handleCancel}
        isSaving={isSaving}
        isEditing={isEditing}
        showSave={false}
        handleValidatePanAndSave={() => {
          console.log('Validating PAN and saving...');
          // Implement validation and save logic
        }}
      />
    </Spacer>
  );
};

export default BeneficiaryDetails;
