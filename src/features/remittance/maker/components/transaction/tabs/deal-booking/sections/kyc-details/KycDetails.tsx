import { getController } from '@/components/form/utils/getController';
import FieldWrapper from '@/components/form/wrapper/FieldWrapper';
import { Control, FieldErrors, FieldValues,FormProvider } from 'react-hook-form';
import { FormContentWrapper } from '@/components/form/wrapper/FormContentWrapper';
import Spacer from '@/components/form/wrapper/Spacer';
import FormFieldRow from '@/components/form/wrapper/FormFieldRow';
import kycDetailsConfig from './kyc-detailsform-config';
import Button from '@mui/material/Button';

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
              <div className="my-1">
              <Button type="button" onClick={handleValidatePan} variant="contained" className="!capitalize w-64">
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
