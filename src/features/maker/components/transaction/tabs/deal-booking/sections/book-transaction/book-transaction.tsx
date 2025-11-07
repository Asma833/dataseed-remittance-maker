import { Control, FieldErrors } from 'react-hook-form';
import { FormContentWrapper } from '@/components/form/wrapper/form-content-wrapper';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import { getController } from '@/components/form/utils/get-controller';
import Spacer from '@/components/form/wrapper/spacer'
import bookTransactionConfig from './book-transaction-form.config';
import useGetPurposes from '@/hooks/useGetPurposes';
import { useGetCurrencyRates } from '@/features/maker/hooks/useCurrencyRate';

interface BookTransactionProps {
  control: Control<any>;
  errors: FieldErrors<any>;
}
const BookTransaction = ({ control, errors }: BookTransactionProps) => {
  const { purposeTypes, loading: purposeLoading } = useGetPurposes();
  const { data: currencyRates, isLoading: currencyLoading } = useGetCurrencyRates();

  const purposeOptions = purposeTypes.reduce((acc: Record<string, { label: string }>, { id, text }) => {
    acc[id] = { label: text };
    return acc;
  }, {});

  const currencyOptions = currencyRates?.reduce((acc: Record<string, { label: string }>, currency) => {
    acc[currency.currency_code] = { label: currency.currency_code };
    return acc;
  }, {}) || {};

  return (
    <>
      <p className="font-semibold  text-gray-600">Deal Details</p>
      <FormContentWrapper className="rounded-lg w-full mr-auto bg-transparent">
        <Spacer>
          <FormFieldRow rowCols={4}>
            {( ['purpose', 'fx_currency', 'fx_amount'] as const ).map(name => {
              const field = bookTransactionConfig.fields[name];
              let fieldWithOptions = field;
              if (name === 'purpose') {
                fieldWithOptions = { ...field, options: purposeOptions };
              } else if (name === 'fx_currency') {
                fieldWithOptions = { ...field, options: currencyOptions };
              }
              return <FieldWrapper key={name}>{getController({ ...fieldWithOptions, name, control, errors })}</FieldWrapper>;
            })}
          </FormFieldRow>
          <FormFieldRow rowCols={4}>
            {( ['company_settlement_rate', 'add_margins', 'customer_rate', 'nostro_charges'] as const ).map(name => {
              const field = bookTransactionConfig.fields[name];
              return <FieldWrapper key={name}>{getController({ ...field, name, control, errors })}</FieldWrapper>;
            })}
          </FormFieldRow>
        </Spacer>
      </FormContentWrapper>
    </>
  );
};

export default BookTransaction;
