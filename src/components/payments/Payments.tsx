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
import { PaymentData } from '@/features/maker/components/transaction/types/payment.types';

const Payments = ({
  setIsOpen = () => {},
  uploadScreen,
  data,
  onSubmit,
}: {
  setIsOpen: (isOpen: boolean) => void;
  uploadScreen: boolean;
  data: PaymentData;
  onSubmit?: (file: File) => Promise<void>;
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
    watch,
  } = methods;

  const fileUpload = watch('fileUpload');

  const submit = async (formData: any) => {
    // Validate the form before submitting
    const isValid = await methods.trigger();
    if (isValid) {
      if (onSubmit && fileUpload && fileUpload[0] && fileUpload[0].file) {
        await onSubmit(fileUpload[0].file);
      }
      setIsOpen(false);
    }
  };
  return (
    <div className="space-y-0">
      {data && <div className="font-medium text-sm text-gray-600 pb-2">Transaction Id: {data.transaction_id}</div>}
      <div className="text-md font-semibold">Offline bank transfer</div>
      <p className="text-sm my-0 text-gray-400">Please upload screen shot for offline bank transfer</p>
      <hr className="text-gray-400" />
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

            <FormFieldRow rowCols={1} className="w-full">
              {(['fileUpload'] as const).map((name) => {
                const field = paymentsFormConfig.fields[name];
                return (
                  <FieldWrapper key={name} className="w-full">
                    {getController({ ...field, name, control, errors })}
                  </FieldWrapper>
                );
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
    </div>
  );
};

export default Payments;
