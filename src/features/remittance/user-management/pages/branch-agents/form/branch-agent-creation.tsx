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
import { BranchAgentForm, branchAgentSchema } from "./branch-agent-creation.schema";


export const CreateBranchAgent = () => {
  const methods = useForm<BranchAgentForm>({
    resolver: zodResolver(branchAgentSchema),
    defaultValues: {
      agentDetails: {
        vendorDetails: {
          vendorName: "",
          vendorCode: "",
          systemCode: "",
        },
        basicDetails: {
          fullName: "",
          emailId: "",
          mobileNo: "",
        },
        address: {
          state: "",
          city: "",
          branch: "",
        },
        roleStatus: {
          role: "maker",
          checkerList: "",
          status: "active",
        },
        security: {
          password: "",
          confirmPassword: "",
        },
      },
    },
  });

  const {
    control,
    setValue,
    trigger,
    formState: { errors },
    handleSubmit,
  } = methods;

  const navigate = useNavigate();
  const location = useLocation();
  const branchAgent = location.state?.branchAgent;

  const handleBack = () => {
    navigate("/admin/user-management/branch-agents");
  };

  const onSubmit = async (data: BranchAgentForm) => {
    console.log("Form submitted with data:", data);
    // TODO: Add actual submission logic
  };

  const handleFormSubmit = handleSubmit(onSubmit);

  /** Optional: map backend -> frontend values */
  useEffect(() => {
    if (branchAgent) {
      setValue("agentDetails.vendorDetails.vendorName", branchAgent.vendorName || "");
      setValue("agentDetails.vendorDetails.vendorCode", branchAgent.vendorCode || "");
      setValue("agentDetails.vendorDetails.systemCode", branchAgent.systemCode || "");
      setValue("agentDetails.basicDetails.fullName", branchAgent.fullName || "");
      setValue("agentDetails.basicDetails.emailId", branchAgent.emailId || "");
      setValue("agentDetails.basicDetails.mobileNo", branchAgent.mobileNo || "");
      setValue("agentDetails.address.state", branchAgent.state || "");
      setValue("agentDetails.address.city", branchAgent.city || "");
      setValue("agentDetails.address.branch", branchAgent.branch || "");
      setValue("agentDetails.roleStatus.role", branchAgent.role || "maker");
      setValue("agentDetails.roleStatus.checkerList", branchAgent.checkerList || "");
      setValue("agentDetails.roleStatus.status", branchAgent.status || "active");
      setValue("agentDetails.security.password", "");
      setValue("agentDetails.security.confirmPassword", "");
      setTimeout(() => trigger(), 100);
    }
  }, [branchAgent, setValue, trigger]);

  const config = branchAgentCreationConfig();

  return (
    <div className="space-y-1 w-full">
      {/* Header */}
      <div className="flex items-center space-x-2 pl-3">
        <ArrowLeft className="cursor-pointer h-5 w-5" onClick={handleBack} />
        <h2 className="text-xl font-semibold tracking-tight">
          {branchAgent ? "Update Branch Agent" : "Create Branch Agent"}
        </h2>
      </div>

      {/* Form */}
      <FormProvider methods={methods}>
        <FormContentWrapper className="p-3 mr-auto w-full mt-0">
          <Spacer>
            {/* Vendor Details */}
            <div className="relative p-1">
              <label className="text-sm text-[--color-black] font-medium absolute">Vendor Details</label>
            </div>
              <FormFieldRow rowCols={4}>
                {(["vendorName", "vendorCode", "systemCode"] as const).map((fieldName) => {
                  const field = config.fields.agentDetails[fieldName];
                  return (
                    <FieldWrapper key={fieldName}>
                      {getController({
                        ...(field ?? {}),
                        name: field.name,
                        control,
                        errors,
                      })}
                    </FieldWrapper>
                  );
                })}
              </FormFieldRow>

            {/* Basic Details */}
            <div className="relative p-1">
              <label className="text-sm text-[--color-black] font-medium absolute">Basic Details</label>
            </div>
              <FormFieldRow rowCols={4}>
                {(["fullName", "emailId", "mobileNo"] as const).map((fieldName) => {
                  const field = config.fields.agentDetails[fieldName];
                  return (
                    <FieldWrapper key={fieldName}>
                      {getController({
                        ...(field ?? {}),
                        name: field.name,
                        control,
                        errors,
                      })}
                    </FieldWrapper>
                  );
                })}
              </FormFieldRow>

            {/* Address */}
            <div className="relative p-1">
              <label className="text-sm text-[--color-black] font-medium absolute">Address</label>
            </div>
              <FormFieldRow rowCols={4}>
                {(["state", "city", "branch"] as const).map((fieldName) => {
                  const field = config.fields.agentDetails[fieldName];
                  return (
                    <FieldWrapper key={fieldName}>
                      {getController({
                        ...(field ?? {}),
                        name: field.name,
                        control,
                        errors,
                      })}
                    </FieldWrapper>
                  );
                })}
              </FormFieldRow>

            {/* Role / Checker / Status */}
              <FormFieldRow rowCols={3}>
                {(["role"] as const).map((fieldName) => {
                  const field = config.fields.agentDetails[fieldName];
                  return (
                    <FieldWrapper key={fieldName}>
                      {getController({
                        ...(field ?? {}),
                        name: field.name,
                        control,
                        errors,
                      })}
                    </FieldWrapper>
                  );
                })}
              </FormFieldRow>
              <FormFieldRow rowCols={4}>
                {(["checkerList"] as const).map((fieldName) => {
                  const field = config.fields.agentDetails[fieldName];
                  return (
                    <FieldWrapper key={fieldName}>
                      {getController({
                        ...(field ?? {}),
                        name: field.name,
                        control,
                        errors,
                      })}
                    </FieldWrapper>
                  );
                })}
              </FormFieldRow>
              <FormFieldRow rowCols={1}>
                {(["status"] as const).map((fieldName) => {
                  const field = config.fields.agentDetails[fieldName];
                  return (
                    <FieldWrapper key={fieldName}>
                      {getController({
                        ...(field ?? {}),
                        name: field.name,
                        control,
                        errors,
                      })}
                    </FieldWrapper>
                  );
                })}
              </FormFieldRow>

            {/* Security */}
              <div className="relative p-1">
              <label className="text-sm text-[--color-black] font-medium absolute">Create Password</label>
            </div>
              <FormFieldRow rowCols={4}>
                {(["password", "confirmPassword"] as const).map((fieldName) => {
                  const field = config.fields.agentDetails[fieldName];
                  return (
                    <FieldWrapper key={fieldName}>
                      {getController({
                        ...(field ?? {}),
                        name: field.name,
                        control,
                        errors,
                      })}
                    </FieldWrapper>
                  );
                })}
              </FormFieldRow>

            {/* Actions */}
            <div className="flex justify-start space-x-2 px-1">
              <Button variant="outline" className="w-28" onClick={handleBack}>
                Back
              </Button>
              <Button variant="secondary" type="submit" className="w-28" onClick={handleFormSubmit}>
                {branchAgent ? "Update" : "Create"}
              </Button>
            </div>
          </Spacer>
        </FormContentWrapper>
      </FormProvider>
    </div>
  );
};
