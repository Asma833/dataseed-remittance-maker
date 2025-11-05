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

const Payments = ({ setIsOpen = () => {} ,uploadScreen}: { setIsOpen: (isOpen: boolean) => void ,uploadScreen : boolean }) => {
  const methods = useForm({
  resolver: zodResolver(paymentsFormSchema),
  defaultValues: {
     paymentMethod: 'true',
     fileUpload: null
  }
});
  const {
    control,
    formState: { errors },
  } = methods;
  const handleSubmit = methods.handleSubmit((data) => {
    console.log('Form Data:', data);
    //    setIsOpen(false)
  });
  return (
    <>
      <FormProvider {...methods}>
        <FormContentWrapper className="py-4 rounded-lg w-full mr-auto bg-transparent">
          <Spacer>
            {uploadScreen && (
              <FormFieldRow rowCols={1}>
              {Object.entries(paymentsFormConfig.fields)
                .slice(0, 1)
                .map(([name, field]) => (
                  <FieldWrapper key={name}>{getController({ ...field, name, control, errors})}</FieldWrapper>
                ))}
            </FormFieldRow>
            )}
           
            <FormFieldRow rowCols={1}>
              {Object.entries(paymentsFormConfig.fields)
                .slice(1, 2)
                .map(([name, field]) => (
                  <FieldWrapper key={name}>
                    <span className="text-sm text-gray-500 mb-1">For Bank Transfer Upload Screenshot</span>
                    {getController({ ...field, name, control, errors })}
                  </FieldWrapper>
                ))}
            </FormFieldRow>
            <div className="flex gap-4 m-auto">
                <Button type="button" onClick={handleSubmit} variant="light" className="mx-auto">
                Cancel
              </Button>
              <Button type="button" onClick={handleSubmit} variant="secondary" className="mx-auto">
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
