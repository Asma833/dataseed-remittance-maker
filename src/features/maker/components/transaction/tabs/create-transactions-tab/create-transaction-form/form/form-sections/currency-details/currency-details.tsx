
import Spacer from '@/components/form/wrapper/spacer';
import { currencyDetailsConfig } from './currency-details.config';
import RateTable from '../../../../../../../rate-table/rate-table';
import { CommonCreateTransactionProps } from '@/features/maker/types/create-transaction.types';
import Actions from '../../../components/Actions';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import { getController } from '@/components/form/utils/get-controller';
import { Button } from '@/components/ui/button';
import { FieldConfig } from '../../../types/createTransactionForm.types';

const CurrencyDetails = ({ setAccordionState }: CommonCreateTransactionProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
 const { control, formState: { errors }, watch } = useFormContext();

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

  return (
    <Spacer>
      <FormFieldRow rowCols={2} wrapperClassName="flex-row md:!flex-nowrap items-start">
        <div className="flex flex-wrap w-1/2 gap-4">
          <FormFieldRow rowCols={2}>
            {( ['fx_currency','fx_amount'] as const ).map(name => {
              const field = currencyDetailsConfig.find(f => f.name === name ) as FieldConfig;
              return <FieldWrapper key={name}>{getController({ ...field, name, control, errors })}</FieldWrapper>;
            })}
          </FormFieldRow>
          <FormFieldRow rowCols={2}>
            {( ['settlement_rate','add_margin'] as const ).map(name => {
              const field = currencyDetailsConfig.find(f => f.name === name ) as FieldConfig;
              return <FieldWrapper key={name}>{getController({ ...field, name, control, errors })}</FieldWrapper>;
            })}
          </FormFieldRow>
          <FormFieldRow rowCols={2}>
            {( ['customer_rate','declared_education_loan_amount'] as const ).map(name => {
              const field = currencyDetailsConfig.find(f => f.name === name ) as FieldConfig;
              return <FieldWrapper key={name}>{getController({ ...field, name, control, errors })}</FieldWrapper>;
            })}
          </FormFieldRow>
           <FormFieldRow rowCols={2}>
            {( ['previous_transaction_amount','declared_previous_amount'] as const ).map(name => {
              const field = currencyDetailsConfig.find(f => f.name === name ) as FieldConfig;
              return <FieldWrapper key={name}>{getController({ ...field, name, control, errors })}</FieldWrapper>;
            })}
          </FormFieldRow>
           <FormFieldRow rowCols={2} className='w-full'>
            {( ['total_transaction_amount_tcs'] as const ).map(name => {
              const field = currencyDetailsConfig.find(f => f.name === name ) as FieldConfig;
              return <FieldWrapper key={name}>{getController({ ...field, name, control, errors })}</FieldWrapper>;
            })}
          </FormFieldRow>
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
         <div className='flex justify-center items-center'>
          <Button onClick={handleSave} className='mx-2 w-32'>
              Submit
          </Button>
        </div>
    </Spacer>
  );
};

export default CurrencyDetails;
