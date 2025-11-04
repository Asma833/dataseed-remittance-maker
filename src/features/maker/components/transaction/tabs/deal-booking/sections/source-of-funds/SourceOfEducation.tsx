


import Spacer from '@/components/form/wrapper/Spacer';
import { FieldValues, Control, FieldErrors } from 'react-hook-form';
import sourceOfEducationConfig from './source-of-education-config';

import ChargesTable from '../charges-table/ChargesTable';
import type { kycDetailsSchema } from '../kyc-details/kyc-details.schema'; // <-- Add this import or adjust the path/type as needed
import RateTable from '@/features/maker/components/rate-table/RateTable';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import { getController } from '@/components/form/utils/get-controller';

interface SourceOfEducationProps {
  control: Control<any>;
  errors: FieldErrors<any>;
}
const SourceOfEducation = ({ control, errors }: SourceOfEducationProps) => {
  
  return (
  <Spacer>
      <FormFieldRow rowCols={2} wrapperClassName="flex-row md:!flex-nowrap">
        <div className="flex flex-wrap w-1/2 gap-4">
            <FormFieldRow rowCols={2}>
              {Object.entries(sourceOfEducationConfig.fields)
                .slice(0, 2)
                .map(([name, field]) => (
                  <FieldWrapper key={name}>
                    {getController({ field, name, control, errors })}
                  </FieldWrapper>
                ))}
            </FormFieldRow>
            <FormFieldRow rowCols={2}>
              {Object.entries(sourceOfEducationConfig.fields)
                .slice(2, 4)
                .map(([name, field]) => (
                  <FieldWrapper key={name}>
                    {getController({...field, name, control, errors })}
                  </FieldWrapper>
                ))}
            </FormFieldRow>
          
        </div>
        <div className="flex flex-wrap w-1/2">
            <RateTable
              id={'invoiceRateTable'}
              mode={'edit'}
              totalAmount={123}
              editableFields={['remittanceCharges.agentMarkUp', 'nostroCharges.agentMarkUp', 'otherCharges.agentMarkUp']}
            />
        </div>
     </FormFieldRow>
     </Spacer>
     
  );
};

export default SourceOfEducation;
