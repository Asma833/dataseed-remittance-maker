import { Control, FieldErrors } from 'react-hook-form';
import { FormContentWrapper } from '@/components/form/wrapper/form-content-wrapper';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import { getController } from '@/components/form/utils/get-controller';
import Spacer from '@/components/form/wrapper/spacer'
import bookTransactionConfig from './book-transaction-form.config';
import useGetPurposes from '@/hooks/useGetPurposes';

interface BookTransactionProps {
  control: Control<any>;
  errors: FieldErrors<any>;
}
const BookTransaction = ({ control, errors }: BookTransactionProps) => {
  const { purposeTypes, loading } = useGetPurposes();

  const purposeOptions = purposeTypes.reduce((acc: Record<string, { label: string }>, { id, text }) => {
    acc[id] = { label: text };
    return acc;
  }, {});

  return (
    <>
      <p className="font-semibold  text-gray-600">Deal Details</p>
      <FormContentWrapper className="rounded-lg w-full mr-auto bg-transparent">
        <Spacer>
          <FormFieldRow rowCols={4}>
            {( ['purpose', 'fxCurrency', 'fxAmount'] as const ).map(name => {
              const field = bookTransactionConfig.fields[name];
              const fieldWithOptions = name === 'purpose' ? { ...field, options: purposeOptions } : field;
              return <FieldWrapper key={name}>{getController({ ...fieldWithOptions, name, control, errors })}</FieldWrapper>;
            })}
          </FormFieldRow>
          <FormFieldRow rowCols={4}>
            {( ['companySettlementRate', 'addMargins', 'customerRate', 'nostroCharges'] as const ).map(name => {
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
