import { Control, FieldErrors } from 'react-hook-form';
import bookTransactionConfig from './book-transaction-form.config';
import { FormContentWrapper } from '@/components/form/wrapper/form-content-wrapper';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import { getController } from '@/components/form/utils/get-controller';
import Spacer from '@/components/form/wrapper/spacer'
interface BookTransactionProps {
  control: Control<any>;
  errors: FieldErrors<any>;
}

const BookTransaction = ({ control, errors }: BookTransactionProps) => {
  return (
    <>
      <p className="font-semibold  text-gray-600">Deal Details</p>
      <FormContentWrapper className="rounded-lg w-full mr-auto bg-transparent">
        <Spacer>
          <FormFieldRow rowCols={4}>
            {( ['purpose', 'fxCurrency', 'fxAmount'] as const ).map(name => {
              const field = bookTransactionConfig.fields[name];
              return <FieldWrapper key={name}>{getController({ ...field, name, control, errors })}</FieldWrapper>;
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
