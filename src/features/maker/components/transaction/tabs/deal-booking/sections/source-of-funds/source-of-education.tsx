


import Spacer from '@/components/form/wrapper/spacer';
import { FieldValues, Control, FieldErrors } from 'react-hook-form';
import sourceOfEducationConfig from './source-of-education-config';

import ChargesTable from '../charges-table/charges-table';
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
      <FormFieldRow rowCols={1} wrapperClassName="flex-row md:!flex-nowrap items-start mt-10">
        <div className="flex flex-wrap w-1/2 gap-4 items-start">
            <FormFieldRow rowCols={1}>
              <FieldWrapper key="declaredEducationLoanAmount">
                {getController({ ...sourceOfEducationConfig.fields.declaredEducationLoanAmount, name: 'declaredEducationLoanAmount', control, errors })}
              </FieldWrapper>
              <FieldWrapper key="niumPreviousTransactionAmount">
                {getController({ ...sourceOfEducationConfig.fields.niumPreviousTransactionAmount, name: 'niumPreviousTransactionAmount', control, errors })}
              </FieldWrapper>
            </FormFieldRow>
            <FormFieldRow rowCols={1}>
              <FieldWrapper key="declarePreviousAmountByOtherAd">
                {getController({ ...sourceOfEducationConfig.fields.declarePreviousAmountByOtherAd, name: 'declarePreviousAmountByOtherAd', control, errors })}
              </FieldWrapper>
              <FieldWrapper key="totalTransactionAmountTcs">
                {getController({ ...sourceOfEducationConfig.fields.totalTransactionAmountTcs, name: 'totalTransactionAmountTcs', control, errors })}
              </FieldWrapper>
            </FormFieldRow>
          
        </div>
        <div className="flex flex-wrap w-1/1">
            <RateTable
              id={'invoiceRateTable'}
              mode={'edit'}
              totalAmount={123}
              editableFields={['remittanceCharges.agentMarkUp', 'nostroCharges.agentMarkUp', 'otherCharges.agentMarkUp']}
            />
        </div>
     </FormFieldRow>
  );
};

export default SourceOfEducation;
