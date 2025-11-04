import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { FormContentWrapper } from "@/components/form/wrapper/FormContentWrapper";
import Spacer from "@/components/form/wrapper/Spacer";
import FormFieldRow from "@/components/form/wrapper/FormFieldRow";
import FieldWrapper from "@/components/form/wrapper/FieldWrapper";
import { getController } from "@/components/form/utils/getController";
import Button from "@mui/material/Button";
import { KycFormSchema } from "./kyc-upload-form/kyc-form.schema";
import { kycDocumentsConfig } from "./kyc-upload-form/kyc-form.config";
import KYCPage from "./kyc-table/KYCTable";

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

  const handleGenerateEkycLink = () => {
    // implementation
  };

  return (
    <>
      {isFormEnabled ? (
        <>
          <FormProvider {...methods}>
            <FormContentWrapper className="py-6 rounded-lg w-full mr-auto bg-transparent">
              <Spacer>
                <FormFieldRow rowCols={4}>
                  {Object.entries(kycDocumentsConfig.fields)
                    .slice(0, 3)
                    .map(([name, field]) => (
                      <FieldWrapper key={name}>
                        {getController({ ...field, name, control, errors })}
                      </FieldWrapper>
                    ))}
                </FormFieldRow>

                <FormFieldRow rowCols={2}>
                  {Object.entries(kycDocumentsConfig.fields)
                    .slice(3, 5)
                    .map(([name, field]) => (
                      <FieldWrapper key={name}>
                        {getController({ ...field, name, control, errors })}
                      </FieldWrapper>
                    ))}
                </FormFieldRow>

                <div className="grid grid-cols-4 gap-4 px-1">
                  {Object.entries(kycDocumentsConfig.fields)
                    .slice(5, 8)
                    .map(([name, field]) => (
                      <div key={name} className={field.className}>
                        <FieldWrapper>
                          {getController({ ...field, name, control, errors })}
                        </FieldWrapper>
                      </div>
                    ))}
                </div>

                <div className="grid grid-cols-4 gap-4 px-1">
                  {Object.entries(kycDocumentsConfig.fields)
                    .slice(8, 11)
                    .map(([name, field]) => (
                      <div key={name} className={field.className}>
                        <FieldWrapper>
                          {getController({ ...field, name, control, errors })}
                        </FieldWrapper>
                      </div>
                    ))}
                </div>

                <FormFieldRow rowCols={2}>
                  {Object.entries(kycDocumentsConfig.fields)
                    .slice(11, 13)
                    .map(([name, field]) => (
                      <FieldWrapper key={name}>
                        {getController({ ...field, name, control, errors })}
                      </FieldWrapper>
                    ))}
                </FormFieldRow>

                <FormFieldRow rowCols={2}>
                  {Object.entries(kycDocumentsConfig.fields)
                    .slice(13, 14)
                    .map(([name, field]) => (
                      <FieldWrapper key={name}>
                        {getController({ ...field, name, control, errors })}
                      </FieldWrapper>
                    ))}
                </FormFieldRow>

                <div className="grid grid-cols-4 gap-4 px-1">
                  {Object.entries(kycDocumentsConfig.fields)
                    .slice(14, 16)
                    .map(([name, field]) => (
                      <div key={name} className={field.className}>
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
            <div className="flex justify-center gap-6 flex-wrap">
              <Button
                type="button"
                onClick={handleKycSubmit}
                variant="contained"
                className="!capitalize w-64"
              >
                Submit
              </Button>
              <Button
                type="button"
                onClick={handleGenerateEkycLink}
                variant="contained"
                className="!capitalize w-64"
              >
                Generate EKYC Link
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
