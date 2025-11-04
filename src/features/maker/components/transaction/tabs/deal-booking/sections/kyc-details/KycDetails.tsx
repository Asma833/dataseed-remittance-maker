
import { Control, FieldErrors, FieldValues,FormProvider } from 'react-hook-form';
import Spacer from '@/components/form/wrapper/spacer';
import kycDetailsConfig from './kyc-detailsform-config';
import { FormContentWrapper } from '@/components/form/wrapper/form-content-wrapper';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import { getController } from '@/components/form/utils/get-controller';
import { Button } from '@/components/ui/button';

interface KycDetailsProps {
  control: Control<any>;
  errors: FieldErrors<any>;
}
const KycDetails = ({ control, errors }: KycDetailsProps) => {

 const handleValidatePan = () => {
   // Implement your validation logic here
 };
  return (
    <>
      <p className="font-semibold text-gray-600 my-2">KYC Details</p>
       <hr className="border-slate-300"/>
      <FormContentWrapper className="py-6 rounded-lg w-full mr-auto bg-transparent">
        <Spacer>
          <FormFieldRow rowCols={4}>
            {Object.entries(kycDetailsConfig.fields)
              .slice(0, 4)
              .map(([name, field]) => (
                <FieldWrapper key={name}>
                  {getController({ ...field, name, control, errors })}
                </FieldWrapper>
              ))}
          </FormFieldRow>
          <FormFieldRow rowCols={4}>
            {Object.entries(kycDetailsConfig.fields)
              .slice(4, 8)
              .map(([name, field]) => (
                <FieldWrapper key={name}>
                  {getController({ ...field, name, control, errors })}
                </FieldWrapper>
              ))}
          </FormFieldRow>
          <FormFieldRow rowCols={4}>
            {Object.entries(kycDetailsConfig.fields)
              .slice(8, 12)
              .map(([name, field]) => (
                <FieldWrapper key={name}>
                  {getController({ ...field, name, control, errors })}
                </FieldWrapper>
              ))}
              <div className="flex items-center md:pt-5">
              <Button type="button" onClick={handleValidatePan} variant="secondary" className="!capitalize">
                          Validate PAN Details
              </Button>
              </div>
          </FormFieldRow>
          
        </Spacer>
      </FormContentWrapper>
    </>
  );
};

export default KycDetails;
