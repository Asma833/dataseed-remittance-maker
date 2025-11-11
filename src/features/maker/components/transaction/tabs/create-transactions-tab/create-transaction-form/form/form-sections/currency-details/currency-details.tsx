
import Spacer from '@/components/form/wrapper/spacer';
import { currecnyDetailsMeta } from './currency-details.config';
import RateTable from '../../../../../../../rate-table/rate-table';
import { CommonCreateTransactionProps } from '@/features/maker/types/create-transaction.types';
import Actions from '../../../components/Actions';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import { getController } from '@/components/form/utils/get-controller';

const CurrencyDetails = ({ setAccordionState }: CommonCreateTransactionProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { watch } = useFormContext();
  // useEffect(() => {
  //   const currentValues = watch();
  //   console.log('currentValues:', currentValues);
  // }, [watch]);

  const handleSave = async () => {
    const currentValues = watch();
    console.log('currentValues:', currentValues);
    // setIsSaving(true);
    // try {
    //   // Implement save functionality
    //   console.log('Saving transaction basic details...');
    //   // Simulate API call
    //   await new Promise((resolve) => setTimeout(resolve, 1000));
    // } finally {
    //   setIsSaving(false);
    // }
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
      <FormFieldRow rowCols={2} wrapperClassName="flex-row md:!flex-nowrap">
        <div className="flex flex-wrap w-1/2 gap-4">
          {Object.entries(currecnyDetailsMeta).map(([key, item]) => {
            return (
              <FieldWrapper key={key}>
                {getController({
                  name: key,
                  label: item.label,
                  type: item.type,
                  placeholder: item.placeholder,
                  required: item.required,
                  options: 'options' in item ? (item as any).options : undefined,
                })}
              </FieldWrapper>
            );
          })}
        </div>
        <div className="flex flex-wrap w-1/2">
          <RateTable
            id={'invoiceRateTable'}
            mode={'edit'}
            totalAmount={123}
            editableFields={['remittanceCharges.agentMarkUp', 'nostroCharges.agentMarkUp', 'otherCharges.agentMarkUp']}
          />
        </div>
      </FormFieldRow>
      <Actions
        handleSave={handleSave}
        handleEdit={handleEdit}
        // handleNext={() => setAccordionState({ currentActiveTab: 'panel2' })}
        handlePrevious={() => setAccordionState({ currentActiveTab: 'panel2' })}
        handleCancel={handleCancel}
        isSaving={isSaving}
        isEditing={isEditing}
        showSave={true}
        handleValidatePanAndSave={() => {
          console.log('Validating PAN and saving...');
          // Implement validation and save logic
        }}
      />
    </Spacer>
  );
};

export default CurrencyDetails;
