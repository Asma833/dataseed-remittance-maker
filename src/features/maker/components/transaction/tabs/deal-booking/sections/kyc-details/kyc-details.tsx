
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
      <p className="font-semibold text-gray-600 pt-6">KYC Details</p>
      <FormContentWrapper className="rounded-lg w-full mr-auto bg-transparent">
        <Spacer>
          <FormFieldRow rowCols={4}>
            {( ['applicantName', 'applicantPanNumber', 'applicantDob', 'applicantEmail'] as const ).map(name => {
              const field = kycDetailsConfig.fields[name];
              return <FieldWrapper key={name}>{getController({ ...field, name, control, errors })}</FieldWrapper>;
            })}
          </FormFieldRow>
          <FormFieldRow rowCols={4}>
            {( ['applicantMobileNumber', 'sourceOfFunds', 'paidBy', 'payeeNameAsPerPan'] as const ).map(name => {
              const field = kycDetailsConfig.fields[name];
              return <FieldWrapper key={name}>{getController({ ...field, name, control, errors })}</FieldWrapper>;
            })}
          </FormFieldRow>
          <FormFieldRow rowCols={4}>
            {( ['payeePanNumber', 'payeeDobAsPerPan'] as const ).map(name => {
              const field = kycDetailsConfig.fields[name];
              return <FieldWrapper key={name}>{getController({ ...field, name, control, errors })}</FieldWrapper>;
            })}
              <div className="flex items-center md:pt-5">
              <Button type="button" onClick={handleValidatePan} variant="secondary" >
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
