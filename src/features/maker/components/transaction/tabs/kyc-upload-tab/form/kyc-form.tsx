import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import { FormContentWrapper } from '@/components/form/wrapper/form-content-wrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import Spacer from '@/components/form/wrapper/spacer';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import { getController } from '@/components/form/utils/get-controller';
import { Button } from '@/components/ui/button';
import { kycDocumentsConfig } from './kyc-form.config';
import { KycFormSchema } from './kyc-form.schema';

const KYCForm = ({ onFormSubmit }: { onFormSubmit: () => void }) => {
  const methods = useForm({
    resolver: zodResolver(KycFormSchema),
    defaultValues: {
      company_reference_number: '',
      agent_reference_number: '',
      applicant_name: '',
      applicant_pan: null,
      other_document: null,
      passport_aadhar_dl_voter_id_front: null,
      passport_aadhar_dl_voter_id_back: null,
      payer_pan: null,
      student_passport_front: null,
      student_passport_back: null,
      payer_relationship_proof: null,
      university_offer_letter: null,
      education_loan_doc: null,
      student_visa: null,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const handleKycSubmit = handleSubmit(async (formdata: FieldValues) => {
    // Handle form submission logic here
    onFormSubmit();
  });

  const handleCancel = () => {
    methods.reset();
  };

  return (
    <>
      <FormProvider {...methods}>
        <FormContentWrapper className="py-6 rounded-lg w-full mr-auto bg-transparent">
          <Spacer>
            <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-4 gap-4 px-1">
              {Object.entries(kycDocumentsConfig.fields)
                .slice(0, 3)
                .map(([name, field]) => (
                  <div key={name}>
                    <FieldWrapper>{getController({ ...field, name, control, errors })}</FieldWrapper>
                  </div>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-1">
              {Object.entries(kycDocumentsConfig.fields)
                .slice(3, 5)
                .map(([name, field]) => (
                  <div key={name}>
                    <FieldWrapper>{getController({ ...field, name, control, errors })}</FieldWrapper>
                  </div>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-1">
              {Object.entries(kycDocumentsConfig.fields)
                .slice(5, 7)
                .map(([name, field]) => (
                  <div key={name}>
                    <FieldWrapper>{getController({ ...field, name, control, errors })}</FieldWrapper>
                  </div>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-1">
              {Object.entries(kycDocumentsConfig.fields)
                .slice(7, 9)
                .map(([name, field]) => (
                  <div key={name}>
                    <FieldWrapper>{getController({ ...field, name, control, errors })}</FieldWrapper>
                  </div>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-1">
              {Object.entries(kycDocumentsConfig.fields)
                .slice(11, 13)
                .map(([name, field]) => (
                  <div key={name}>
                    <FieldWrapper>{getController({ ...field, name, control, errors })}</FieldWrapper>
                  </div>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-1">
              {Object.entries(kycDocumentsConfig.fields)
                .slice(13, 14)
                .map(([name, field]) => (
                  <div key={name}>
                    <FieldWrapper>{getController({ ...field, name, control, errors })}</FieldWrapper>
                  </div>
                ))}
            </div>
          </Spacer>
        </FormContentWrapper>
      </FormProvider>

      <div className="mt-16 flex flex-col items-center gap-6 px-4">
        <div className="w-full max-w-xl flex flex-col sm:flex-row sm:justify-center gap-3">
          <Button type="button" onClick={handleCancel} variant="light" className="w-full sm:w-auto px-10">
            Cancel
          </Button>
          <Button type="button" onClick={handleKycSubmit} variant="secondary" className="w-full sm:w-auto px-10">
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default KYCForm;
