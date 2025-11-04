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
      <p className="font-semibold  text-gray-600 my-2">Book Transaction</p>
      <hr className="border-slate-300"/>
      <FormContentWrapper className="py-6 rounded-lg w-full mr-auto bg-transparent">
        <Spacer>
          <FormFieldRow rowCols={4}>
            {Object.entries(bookTransactionConfig.fields)
              .slice(0, 4)
              .map(([name, field]) => (
                <FieldWrapper key={name}>{getController({ ...field, name, control, errors })}</FieldWrapper>
              ))}
          </FormFieldRow>
          <FormFieldRow rowCols={4}>
            {Object.entries(bookTransactionConfig.fields)
              .slice(4, 8)
              .map(([name, field]) => (
                <FieldWrapper key={name}>{getController({ ...field, name, control, errors })}</FieldWrapper>
              ))}
          </FormFieldRow>
        </Spacer>
      </FormContentWrapper>
    </>
  );
};

export default BookTransaction;
