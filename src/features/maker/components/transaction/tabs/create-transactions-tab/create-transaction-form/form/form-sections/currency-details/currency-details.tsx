
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
import { useGetCurrencyRates } from '@/hooks/useCurrencyRate';
import { CreateTransactionFormData } from '../../create-transaction-form';

const CurrencyDetails = ({ setAccordionState }: CommonCreateTransactionProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
    const { control, formState: { errors }, trigger } = useFormContext();
  const { data: currencyRates, isLoading: currencyLoading } = useGetCurrencyRates();
  
  const currencyOptions = currencyRates?.reduce((acc: Record<string, { label: string }>, currency) => {
      acc[currency.currency_code] = { label: currency.currency_code };
      return acc;
    }, {}) || {};
  // useEffect(() => {
  //   const currentValues = watch();
  //   console.log('currentValues:', currentValues);
  // }, [watch]);

  const handleSave = async () => {
   
   // const isValid = await trigger('currencyDetails'); // Validate currency section
     const isValid = await trigger();
    if (isValid) {
      // const values = getValues('currencyDetails');
     // console.log('Valid currency details:', values);
      // Implement save logic here, e.g., API call
      // setIsSaving(true);
      // try {
      //   await saveCurrencyDetails(values);
      // } finally {
      //   setIsSaving(false);
      // }
    } else {
      console.log('Validation errors in currency details');
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
              return <FieldWrapper key={name}>{getController({ ...fieldWithOptions, name, control, errors })}</FieldWrapper>;
            })}
          </FormFieldRow>
          <FormFieldRow rowCols={2} className='w-full'>
            {( ['settlement_rate','add_margin'] as const ).map(name => {
              const field = currencyDetailsConfig.find(f => f.name === name ) as FieldConfig;
              return <FieldWrapper key={name}>{getController({ ...field, name, control, errors })}</FieldWrapper>;
            })}
          </FormFieldRow>
          <FormFieldRow rowCols={2} className='w-full'>
            {( ['customer_rate','declared_education_loan_amount'] as const ).map(name => {
              const field = currencyDetailsConfig.find(f => f.name === name ) as FieldConfig;
              return <FieldWrapper key={name}>{getController({ ...field, name, control, errors })}</FieldWrapper>;
            })}
          </FormFieldRow>
           <FormFieldRow rowCols={2} className='w-full'>
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
          <Button type="button" onClick={handleSave} className='mx-2 w-32'>
              Save 
          </Button>
        </div>
    </Spacer>
  );
};

export default CurrencyDetails;
