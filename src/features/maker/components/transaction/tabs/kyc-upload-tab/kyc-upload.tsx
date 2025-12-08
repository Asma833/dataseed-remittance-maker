import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { KycFormSchema } from "./form/kyc-form.schema";
import { kycDocumentsConfig } from "./form/kyc-form.config";
import KYCPage from "./table/kyc-table";


const KYCUpload = () => {
 
  return (
    <>
      {/* {isFormEnabled ? (
        <>
          <FormProvider {...methods}>
            <FormContentWrapper className="py-6 rounded-lg w-full mr-auto bg-transparent">
              <Spacer>
                <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-4 gap-4 px-1">
                  {Object.entries(kycDocumentsConfig.fields)
                    .slice(0, 3)
                    .map(([name, field]) => (
                      <div key={name} >
                        <FieldWrapper>
                          {getController({ ...field, name, control, errors})}
                        </FieldWrapper>
                      </div>
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-1">
                  {Object.entries(kycDocumentsConfig.fields)
                    .slice(3, 5)
                    .map(([name, field]) => (
                      <div key={name} >
                        <FieldWrapper>
                          {getController({ ...field, name, control, errors })}
                        </FieldWrapper>
                      </div>
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-1">
                  {Object.entries(kycDocumentsConfig.fields)
                    .slice(5, 7)
                    .map(([name, field]) => (
                      <div key={name} >
                        <FieldWrapper>
                          {getController({ ...field, name, control, errors })}
                        </FieldWrapper>
                      </div>
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-1">
                  {Object.entries(kycDocumentsConfig.fields)
                    .slice(7, 9)
                    .map(([name, field]) => (
                      <div key={name} >
                        <FieldWrapper>
                          {getController({ ...field, name, control, errors })}
                        </FieldWrapper>
                      </div>
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-1">
                  {Object.entries(kycDocumentsConfig.fields)
                    .slice(11, 13)
                    .map(([name, field]) => (
                      <div key={name} >
                        <FieldWrapper>
                          {getController({ ...field, name, control, errors })}
                        </FieldWrapper>
                      </div>
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-1">
                  {Object.entries(kycDocumentsConfig.fields)
                    .slice(13, 14)
                    .map(([name, field]) => (
                      <div key={name} >
                        <FieldWrapper>
                          {getController({ ...field, name, control, errors })}
                        </FieldWrapper>
                      </div>
                    ))}
                </div>
              </Spacer>
            </FormContentWrapper>
          </FormProvider>

          <div className="mt-16 flex flex-col items-center gap-6 px-4">
            <div className="w-full max-w-xl flex flex-col sm:flex-row sm:justify-center gap-3">
              <Button
                type="button"
                onClick={handleCancel}
                variant="light"
                className="w-full sm:w-auto px-10"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleKycSubmit}
                variant="secondary"
                className="w-full sm:w-auto px-10"
              >
                Submit
              </Button>
            </div>
          </div>
        </>
      ) : ( */}
        <KYCPage />
      {/* )} */}
    </>
  );
};

export default KYCUpload;
