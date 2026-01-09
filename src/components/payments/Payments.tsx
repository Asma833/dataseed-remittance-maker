import { zodResolver } from '@hookform/resolvers/zod';
import paymentsFormConfig from './payments-form-config';
import { Eye } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect } from 'react';
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
  onViewScreenshot,
}: {
  setIsOpen: (isOpen: boolean) => void;
  uploadScreen: boolean;
  data: PaymentData;
  onSubmit?: (file: File) => Promise<void>;
  onViewScreenshot?: (s3Key: string, refNo: string) => void;
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
    setValue,
  } = methods;

  const fileUpload = watch('fileUpload');

  // Pre-populate file upload field if payment_challan_url exists
  useEffect(() => {
    if (data?.payment_challan_url && !fileUpload) {
      // Patch the URL directly to the file upload field
      setValue('fileUpload', [{ file: null, url: data.payment_challan_url, name: data.payment_challan_url.split('/').pop() || 'payment-screenshot' }]);
    }
  }, [data?.payment_challan_url, fileUpload, setValue]);

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
    <div className="space-y-0 overflow-hidden">
      {data && <div className="font-medium text-sm text-gray-600 pb-2 truncate">Transaction Id: {data.transaction_id}</div>}
      <div className="text-md font-semibold truncate">Offline bank transfer</div>
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

            <div className="flex w-full items-center gap-2">
              <div className="flex-1 min-w-0">
                <FormFieldRow rowCols={1} className="w-full">
                  {(['fileUpload'] as const).map((name) => {
                    const field = paymentsFormConfig.fields[name];
                    return (
                      <FieldWrapper key={name} className="w-full !w-full">
                        {getController({ ...field, name, control, errors })}
                      </FieldWrapper>
                    );
                  })}
                </FormFieldRow>
              </div>
              {data?.payment_challan_url && (
                <div className="flex items-center">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => onViewScreenshot?.(data.payment_challan_url!, data.ref_no)}
                    title="View Payment Screenshot"
                  >
                    <Eye className="h-5 w-5 text-gray-500 hover:text-primary" />
                  </Button>
                </div>
              )}
            </div>
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
