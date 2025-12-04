
import Spacer from '@/components/form/wrapper/spacer';
import { currencyDetailsConfig } from './currency-details.config';
import RateTable from '../../../../../../../rate-table/rate-table';
import { CommonCreateTransactionProps } from '@/features/maker/types/create-transaction.types';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import FormFieldRow from '@/components/form/wrapper/form-field-row';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import { getController } from '@/components/form/utils/get-controller';
import { Button } from '@/components/ui/button';
import { FieldConfig } from '../../../types/createTransactionForm.types';
import { useGetCurrencyRates } from '@/hooks/useCurrencyRate';

const CurrencyDetails = ({ setAccordionState }: CommonCreateTransactionProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { control, formState: { errors }, trigger } = useFormContext();
  const { data: currencyRates, isLoading: currencyLoading } = useGetCurrencyRates();
  
  const currencyOptions = currencyRates?.reduce((acc: Record<string, { label: string }>, currency) => {
      acc[currency.currency_code] = { label: currency.currency_code };
      return acc;
    }, {}) || {};


  const handleSave = async () => {
    const isValid = await trigger();
    if (!isValid) {
      return;
    }
    setIsSaving(true);
    try {
      // TODO: Implement actual save functionality, e.g., using useCreateTransaction hook
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      setIsSaving(false);
    }
  };
   
  return (
    <Spacer>
      <FormFieldRow rowCols={2} wrapperClassName="flex-row md:!flex-nowrap items-start">
        <div className="flex flex-wrap w-1/2 gap-4">
          <FormFieldRow rowCols={2} className='w-full'>
            {( ['fx_currency','fx_amount'] as const ).map(name => {
              const field = currencyDetailsConfig.find(f => f.name === name ) as FieldConfig;
              let fieldWithOptions = field;
              if (name === 'fx_currency') {
                fieldWithOptions = { ...field, options: currencyOptions };
              }
              return <FieldWrapper key={name}>{getController({ ...fieldWithOptions, name: `currencyDetails.${name}`, control, errors })}</FieldWrapper>;
            })}
          </FormFieldRow>
          <FormFieldRow rowCols={2} className='w-full'>
            {( ['settlement_rate','add_margin'] as const ).map(name => {
              const field = currencyDetailsConfig.find(f => f.name === name ) as FieldConfig;
              return <FieldWrapper key={name}>{getController({ ...field, name: `currencyDetails.${name}`, control, errors })}</FieldWrapper>;
            })}
          </FormFieldRow>
          <FormFieldRow rowCols={2} className='w-full'>
            {( ['customer_rate','declared_education_loan_amount'] as const ).map(name => {
              const field = currencyDetailsConfig.find(f => f.name === name ) as FieldConfig;
              return <FieldWrapper key={name}>{getController({ ...field, name: `currencyDetails.${name}`, control, errors })}</FieldWrapper>;
            })}
          </FormFieldRow>
           <FormFieldRow rowCols={2} className='w-full'>
            {( ['previous_transaction_amount','declared_previous_amount'] as const ).map(name => {
              const field = currencyDetailsConfig.find(f => f.name === name ) as FieldConfig;
              return <FieldWrapper key={name}>{getController({ ...field, name: `currencyDetails.${name}`, control, errors })}</FieldWrapper>;
            })}
          </FormFieldRow>
           <FormFieldRow rowCols={2} className='w-full'>
            {( ['total_transaction_amount_tcs'] as const ).map(name => {
              const field = currencyDetailsConfig.find(f => f.name === name ) as FieldConfig;
              return <FieldWrapper key={name}>{getController({ ...field, name: `currencyDetails.${name}`, control, errors })}</FieldWrapper>;
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
          <Button variant="secondary"  onClick={handleSave} disabled={isSaving} className='mx-2 w-24'>
              {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </div>
    </Spacer>
  );
};

export default CurrencyDetails;
