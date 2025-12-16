import { zodResolver } from '@hookform/resolvers/zod';
import paymentsFormConfig from './payments-form-config';
import { FormProvider, useForm } from 'react-hook-form';

import { paymentsFormSchema } from './payment-details.schema';
import { FormContentWrapper } from '../form/wrapper/form-content-wrapper';
import Spacer from '../form/wrapper/spacer';
import FormFieldRow from '../form/wrapper/form-field-row';
import FieldWrapper from '../form/wrapper/field-wrapper';
import { getController } from '../form/utils/get-controller';
import { Button } from '../ui/button';

const Payments = ({
  setIsOpen = () => {},
  uploadScreen,
}: {
  setIsOpen: (isOpen: boolean) => void;
  uploadScreen: boolean;
}) => {
  const methods = useForm({
    resolver: zodResolver(paymentsFormSchema),
    defaultValues: {
      paymentMethod: 'bank',
      fileUpload: '',
    },
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = methods;
  const submit = async (data: any) => {
    // Validate the form before submitting
    const isValid = await methods.trigger();
    if (isValid) {
      setIsOpen(false);
    }
  };
  return (
    <>
      <FormProvider {...methods}>
        <FormContentWrapper className="rounded-lg w-full mr-auto bg-transparent">
          <Spacer>
            {uploadScreen && (
              <FormFieldRow rowCols={1}>
                {(['paymentMethod'] as const).map((name) => {
                  const field = paymentsFormConfig.fields[name];
                  return <FieldWrapper key={name}>{getController({ ...field, name, control, errors })}</FieldWrapper>;
                })}
              </FormFieldRow>
            )}

            <FormFieldRow rowCols={1}>
              {(['fileUpload'] as const).map((name) => {
                const field = paymentsFormConfig.fields[name];
                return <FieldWrapper key={name}>{getController({ ...field, name, control, errors })}</FieldWrapper>;
              })}
            </FormFieldRow>
            <div className="flex gap-2 justify-center">
              <Button type="button" onClick={() => setIsOpen(false)} variant="light" className="px-5">
                Cancel
              </Button>
              <Button type="button" onClick={handleSubmit(submit)} variant="secondary" className="px-5">
                Submit
              </Button>
            </div>
          </Spacer>
        </FormContentWrapper>
      </FormProvider>
    </>
  );
};

export default Payments;
