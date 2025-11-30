import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { KycFormSchema } from "./kyc-upload-form/kyc-form.schema";
import { kycDocumentsConfig } from "./kyc-upload-form/kyc-form.config";
import KYCPage from "./kyc-table/KYCTable";
import { FormContentWrapper } from "@/components/form/wrapper/form-content-wrapper";
import Spacer from "@/components/form/wrapper/spacer";
import FormFieldRow from "@/components/form/wrapper/form-field-row";
import FieldWrapper from "@/components/form/wrapper/field-wrapper";
import { getController } from "@/components/form/utils/get-controller";
import { Button } from "@/components/ui/button";

const KYCUpload = () => {
  const [isFormEnabled, setIsFormEnabled] = useState(true);

  const methods = useForm({
    resolver: zodResolver(KycFormSchema),
    defaultValues: {
      niumReferenceNumber: '',
      agentReferenceNumber: '',
      applicantName: '',
      applicantPan: '',
      otherDocument: null,
      Passport_Aadhar_DL_Voter_ID_Front: null,
      Passport_Aadhar_DL_Voter_ID_Back: null,
      payerPan: null,
      studentPassportFront: null,
      studentPassportBack: null,
      payerRelationshipProof: null,
      universityOfferLetter: null,
      educationLoanDoc: null,
      studentVisa: null,
      kycType: '',
      viewA2Form: null,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const handleKycSubmit = handleSubmit(async (formdata: FieldValues) => {
    setIsFormEnabled(false);
  });

  const handleCancel = () => {
    methods.reset();
  };

  return (
    <>
      {isFormEnabled ? (
        <>
          <FormProvider {...methods}>
            <FormContentWrapper className="py-6 rounded-lg w-full mr-auto bg-transparent">
              <Spacer>
                {/* top 3 fields (still using your FormFieldRow) */}
                <FormFieldRow rowCols={4}>
                  {Object.entries(kycDocumentsConfig.fields)
                    .slice(0, 3)
                    .map(([name, field]) => (
                      <FieldWrapper key={name}>
                        {getController({ ...field, name, control, errors })}
                      </FieldWrapper>
                    ))}
                </FormFieldRow>

                {/* next 2 fields (keeps existing usage) */}
                <FormFieldRow rowCols={2}>
                  {Object.entries(kycDocumentsConfig.fields)
                    .slice(3, 5)
                    .map(([name, field]) => (
                      <FieldWrapper key={name}>
                        {getController({ ...field, name, control, errors })}
                      </FieldWrapper>
                    ))}
                </FormFieldRow>

                {/* Use a consistent responsive grid. 
                    grid-cols-1 on mobile, md:grid-cols-2 (two main columns), lg:grid-cols-4 (4 across on wide screens)
                    gap-4 gives a clear horizontal and vertical gap between columns/rows */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-1">
                  {Object.entries(kycDocumentsConfig.fields)
                    .slice(5, 8)
                    .map(([name, field]) => (
                      /* add a small horizontal padding inside each grid cell so inputs don't touch */
                      <div key={name} className={`px-2 ${field.className ?? ""}`}>
                        <FieldWrapper>
                          {getController({ ...field, name, control, errors })}
                        </FieldWrapper>
                      </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-1">
                  {Object.entries(kycDocumentsConfig.fields)
                    .slice(8, 11)
                    .map(([name, field]) => (
                      <div key={name} className={`px-2 ${field.className ?? ""}`}>
                        <FieldWrapper>
                          {getController({ ...field, name, control, errors })}
                        </FieldWrapper>
                      </div>
                    ))}
                </div>

                {/* two-column rows */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-1">
                  {Object.entries(kycDocumentsConfig.fields)
                    .slice(11, 13)
                    .map(([name, field]) => (
                      <div key={name} className={`px-2 ${field.className ?? ""}`}>
                        <FieldWrapper>
                          {getController({ ...field, name, control, errors })}
                        </FieldWrapper>
                      </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-1">
                  {Object.entries(kycDocumentsConfig.fields)
                    .slice(13, 14)
                    .map(([name, field]) => (
                      <div key={name} className={`px-2 ${field.className ?? ""}`}>
                        <FieldWrapper>
                          {getController({ ...field, name, control, errors })}
                        </FieldWrapper>
                      </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-1">
                  {Object.entries(kycDocumentsConfig.fields)
                    .slice(14, 16)
                    .map(([name, field]) => (
                      <div key={name} className={`px-2 ${field.className ?? ""}`}>
                        <FieldWrapper>
                          {getController({ ...field, name, control, errors })}
                        </FieldWrapper>
                      </div>
                    ))}
                </div>
              </Spacer>
            </FormContentWrapper>
          </FormProvider>

          <div className="mt-16 flex flex-col items-center gap-10">
            <div className="flex justify-center gap-2 flex-wrap">
              <Button
                type="button"
                onClick={handleCancel}
                variant="light"
                className="px-10"
              >
                Cancel
              </Button>
             <Button
                type="button"
                onClick={handleKycSubmit}
                variant="secondary"
                className="px-10"
              >
                Submit
              </Button>
            </div>
          </div>
        </>
      ) : (
        <KYCPage />
      )}
    </>
  );
};

export default KYCUpload;
