import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import type { z } from "zod";
import { FormContentWrapper } from "@/components/form/wrapper/form-content-wrapper";
import FormFieldRow from "@/components/form/wrapper/form-field-row";
import Spacer from "@/components/form/wrapper/spacer";
import { useNavigate, useLocation } from "react-router-dom";
import { branchAgentCreationConfig } from "./branch-agent-creation.config";
import FieldWrapper from "@/components/form/wrapper/field-wrapper";
import { FormProvider } from "@/components/form/providers/form-provider";
import { getController } from "@/components/form/utils/get-controller";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { branchAgentSchema } from "./branch-agent-creation.schema";

export const CreateBranchAgent = () => {
  type BranchAgentFormType = z.infer<typeof branchAgentSchema>;
  const methods = useForm<BranchAgentFormType>({
    resolver: zodResolver(branchAgentSchema),
    defaultValues: {
      agentDetails: {
        vendorName: "",
        vendorCode: "",
        fullName: "",
        emailId: "",
        mobileNo: "",
        state: "",
        city: "",
        branch: "",
        role: "checker"
      }
    }
  });

  const {
    control,
    getValues,
    reset,
    setValue,
    trigger,
    formState: { errors },
    handleSubmit,
  } = methods;

  const navigate = useNavigate();
  const location = useLocation();
  const branchAgent = location.state?.branchAgent;

  const handleBack = () => {
    navigate('/admin/user-management/branch-agents');
  };

  const onSubmit = async (data: any) => {
    console.log('Form submitted with data:', data);
    // Add actual submission logic here
  };

  const handleFormSubmit = handleSubmit(onSubmit);

  const mapBranchAgentData = (data: any) => {
    // Map incoming data fields to form field names
    const mappedData = {
      agentDetails: {
        vendorName: data.vendorName || '',
        vendorCode: data.vendorCode || '',
        fullName: data.fullName || '',
        emailId: data.emailId || '',
        mobileNo: data.mobileNo || '',
        state: data.state || '',
        city: data.city || '',
        branch: data.branch || '',
        role: data.role?.toLowerCase() === 'maker' ? 'maker' : 'checker',
        // checkerList: data.checkerList || ''
      }
    };
    return mappedData;
  };

  useEffect(() => {
    const branchAgent = location.state?.branchAgent;
    if (branchAgent) {
      const mappedData = mapBranchAgentData(branchAgent);
      // Patch values one by one to handle different field names
      setValue('agentDetails.vendorName', mappedData.agentDetails.vendorName);
      setValue('agentDetails.vendorCode', mappedData.agentDetails.vendorCode);
      setValue('agentDetails.fullName', mappedData.agentDetails.fullName);
      setValue('agentDetails.emailId', mappedData.agentDetails.emailId);
      setValue('agentDetails.mobileNo', mappedData.agentDetails.mobileNo);
      setValue('agentDetails.state', mappedData.agentDetails.state);
      setValue('agentDetails.city', mappedData.agentDetails.city);
      setValue('agentDetails.branch', mappedData.agentDetails.branch);
      setValue('agentDetails.role', mappedData.agentDetails.role as 'maker' | 'checker');
      // setValue('agentDetails.checkerList', mappedData.agentDetails.checkerList);

      // Trigger form validation and re-rendering
      setTimeout(() => {
        trigger();
        console.log('Form values after patching:', getValues());
      }, 100);
    }
  }, [setValue, location.state, getValues]);

  return (
    <div className="space-y-1 w-full">
      <div className="flex items-center space-x-2 pl-3">
        <ArrowLeft className="cursor-pointer h-5 w-5" onClick={handleBack} />
        <h2 className="text-xl font-semibold tracking-tight">
            {branchAgent ? 'Update Branch Agent' : 'Create Branch Agent'}
          </h2>
      </div>

      <FormProvider methods={methods}>
        <FormContentWrapper className="p-3 mr-auto w-full mt-0">
          <Spacer>
            <div className="form-bg p-4 rounded-sm">
            <FormFieldRow rowCols={4} className="mt-2 mb-4 mx-2">
              {(['vendorName', 'vendorCode', 'fullName', 'emailId'] as const).map((fieldName) => {
                const field = branchAgentCreationConfig().fields.agentDetails[fieldName];
                return (
                  <FieldWrapper key={fieldName}>
                    {getController({
                      ...(typeof field === 'object' && field !== null ? field : {}),
                      name: `agentDetails.${fieldName}`,
                      control,
                      errors,
                    })}
                  </FieldWrapper>
                );
              })}
            </FormFieldRow>
            <FormFieldRow rowCols={4} className="mt-4 mb-2 mx-2">
              {(['mobileNo', 'state', 'city', 'branch'] as const).map((fieldName) => {
                const field = branchAgentCreationConfig().fields.agentDetails[fieldName];
                return (
                  <FieldWrapper key={fieldName}>
                    {getController({
                      ...(typeof field === 'object' && field !== null ? field : {}),
                      name: `agentDetails.${fieldName}`,
                      control,
                      errors,
                    })}
                  </FieldWrapper>
                );
              })}
            </FormFieldRow>
           </div>
           <div className="form-bg p-4 rounded-sm">
            <FormFieldRow className="mt-2 mb-4 mx-2">
              {(['role'] as const).map((fieldName) => {
                const field = branchAgentCreationConfig().fields.agentDetails[fieldName];
                return (
                  <FieldWrapper key={fieldName}>
                    {getController({
                      ...(typeof field === 'object' && field !== null ? field : {}),
                      name: `agentDetails.${fieldName}`,
                      control,
                      errors,
                    })}
                  </FieldWrapper>
                );
              })}
            </FormFieldRow>
            <FormFieldRow rowCols={4} className="mt-4 mb-2 mx-2">
              {(['checkerList'] as const).map((fieldName) => {
                const field = branchAgentCreationConfig().fields.agentDetails[fieldName];
                return (
                  <FieldWrapper key={fieldName}>
                    {getController({
                      ...(typeof field === 'object' && field !== null ? field : {}),
                      name: `agentDetails.${fieldName}`,
                      control,
                      errors,
                    })}
                  </FieldWrapper>
                );
              })}
            </FormFieldRow>
            </div>
        
            <div className="flex justify-start space-x-2 form-bg p-4 rounded-sm">
              <Button variant="outline" className="rounded-2xl w-28" onClick={handleBack}>
                Back
              </Button>
              <Button type="submit" className="rounded-2xl w-28" onClick={handleFormSubmit}>
                {branchAgent ? 'Update' : 'Create'}
              </Button>
            </div>
          </Spacer>
        </FormContentWrapper>
      </FormProvider>
    </div>
  );
};