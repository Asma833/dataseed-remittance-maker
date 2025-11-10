
import { Control, FieldErrors, FieldValues,FormProvider, useWatch } from 'react-hook-form';
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
  const sourceOfFunds = useWatch({ control, name: 'source_of_funds' });

  const handleValidatePan = () => {
    // Implement your validation logic here
  };
  return (
    <>
      <p className="font-semibold text-gray-600 pt-6">KYC Details</p>
      <FormContentWrapper className="rounded-lg w-full mr-auto bg-transparent">
        <Spacer>
          <FormFieldRow rowCols={4}>
            {( ['applicant_name', 'applicant_pan_number', 'applicant_email'] as const ).map(name => {
              const field = kycDetailsConfig.fields[name];
              return <FieldWrapper key={name}>{getController({ ...field, name, control, errors })}</FieldWrapper>;
            })}
           
           </FormFieldRow>
          <FormFieldRow rowCols={4}>
            {( ['applicant_mobile_number', 'source_of_funds'] as const ).map(name => {
              const field = kycDetailsConfig.fields[name];
              return <FieldWrapper key={name}>{getController({ ...field, name, control, errors })}</FieldWrapper>;
            })}
            {sourceOfFunds === 'others' && (
              <>
                {( ['paid_by', 'payee_name_as_per_pan'] as const ).map(name => {
                  const field = kycDetailsConfig.fields[name];
                  return <FieldWrapper key={name}>{getController({ ...field, name, control, errors })}</FieldWrapper>;
                })}
              </>
            )}
          </FormFieldRow>
        
            <FormFieldRow rowCols={4}>
              {sourceOfFunds === 'others' && (
                <FieldWrapper>
                  {( ['payee_pan_number'] as const ).map(name => {
                    const field = kycDetailsConfig.fields[name];
                    return getController({ ...field, name, control, errors });
                  })}
                </FieldWrapper>
               )}
                <div className="flex items-center justify-end md:pt-5 col-span-3">
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
