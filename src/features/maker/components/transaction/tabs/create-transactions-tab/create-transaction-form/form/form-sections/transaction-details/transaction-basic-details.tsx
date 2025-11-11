
import Spacer from '@/components/form/wrapper/spacer';

import { useState } from 'react';
import { CommonCreateTransactionProps } from '@/features/maker/types/create-transaction.types';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import { getController } from '@/components/form/utils/get-controller';
import transactionBasicDetails from './transaction-basic-details.config';
import Actions from '../../../components/Actions';

const TransactionBasicDetails = ({ setAccordionState }: CommonCreateTransactionProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Implement save functionality
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    // console.log('Editing mode enabled');
  };

  const handleCancel = () => {
    // console.log('Cancelling operation');
    setIsEditing(false);
    // Reset form or navigate away
  };

  return (
    <Spacer>
      <FormFieldRow rowCols={4}>
        {transactionBasicDetails.map((item) => {
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
      </FormFieldRow>{' '}
      <Actions
        handleSave={handleSave}
        handleEdit={handleEdit}
        handleNext={() => setAccordionState({ currentActiveTab: 'panel2' })}
        // handlePrevious={() => setAccordionState({ currentActiveTab: 'panel1' })}
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

export default TransactionBasicDetails;
