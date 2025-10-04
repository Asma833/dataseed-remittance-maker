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
import { FormTitle } from "@/features/auth/components/form-title";
import { TableTitle } from "@/features/auth/components/table-title";
import { useCreateBranchAgent } from "../../hooks/useCreateBranchAgent";
import { useUpdateBranchAgent } from "../../hooks/useUpdateBranchAgent";
import { NotificationBanner } from "@/components/ui/notification-banner";


export const CreateBranchAgent = () => {
  const methods = useForm<BranchAgentForm>({
    resolver: zodResolver(branchAgentSchema),
    mode: "onChange",
    defaultValues: {
      agentDetails: {
        vendorDetails: {
          vendorName: "",
          vendorCode: ""
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
          role: "branch_agent_checker",
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
    clearErrors,
    formState: { errors },
    handleSubmit,
  } = methods;

  const navigate = useNavigate();
  const location = useLocation();
  const branchAgent = location.state?.branchAgent;

  const handleBack = () => {
    navigate("/admin/user-management/branch-agents");
  };

  const { mutate: createBranchAgent, isLoading: isCreating } = useCreateBranchAgent({
    onBranchAgentCreateSuccess: () => {
      navigate("/admin/user-management/branch-agents");
    },
  });

  const { mutate: updateBranchAgent, isLoading: isUpdating } = useUpdateBranchAgent({
    onBranchAgentUpdateSuccess: () => {
      navigate("/admin/user-management/branch-agents");
    },
  });

  const onSubmit = async (data: BranchAgentForm) => {
    if (branchAgent) {
      // Update mode - exclude email from payload
      const updatePayload = {
        id: branchAgent.id,
        full_name: data.agentDetails.basicDetails.fullName,
        password: data.agentDetails.security.password || undefined,
        address_city: data.agentDetails.address.city,
        address_state: data.agentDetails.address.state,
        address_branch: data.agentDetails.address.branch,
        phone_number: data.agentDetails.basicDetails.mobileNo,
        role: data.agentDetails.roleStatus.role,
        agent_ids: [
          "691ee70a-1a34-4012-83e8-e67883c2b772"
        ]
      };
      updateBranchAgent(updatePayload);
    } else {
      // Create mode - include email in payload
      const createPayload = {
        full_name: data.agentDetails.basicDetails.fullName,
        email: data.agentDetails.basicDetails.emailId,
        password: data.agentDetails.security.password,
        address_city: data.agentDetails.address.city,
        address_state: data.agentDetails.address.state,
        address_branch: data.agentDetails.address.branch,
        phone_number: data.agentDetails.basicDetails.mobileNo,
        role: data.agentDetails.roleStatus.role,
        agent_ids: [
          "691ee70a-1a34-4012-83e8-e67883c2b772"
        ]
      };
      createBranchAgent(createPayload);
    }
  };

  const handleFormSubmit = handleSubmit(onSubmit);

  /** Optional: map backend -> frontend values */
  useEffect(() => {
    if (branchAgent) {
      setValue("agentDetails.vendorDetails.vendorName", branchAgent.agent_entity_name || "");
      setValue("agentDetails.vendorDetails.vendorCode", branchAgent.agent_vendor_code || "");
      setValue("agentDetails.basicDetails.fullName", branchAgent.full_name || "");
      setValue("agentDetails.basicDetails.emailId", branchAgent.email || "");
      setValue("agentDetails.basicDetails.mobileNo", "");
      setValue("agentDetails.address.state", "");
      setValue("agentDetails.address.city", "");
      setValue("agentDetails.address.branch", "");
      setValue("agentDetails.roleStatus.role", branchAgent.role || "maker");
      setValue("agentDetails.roleStatus.checkerList", "");
      setValue("agentDetails.roleStatus.status", "active");
      setValue("agentDetails.security.password", "");
      setValue("agentDetails.security.confirmPassword", "");
      
      // Clear email error since it's disabled in update mode
      setTimeout(() => {
        clearErrors("agentDetails.basicDetails.emailId");
        trigger();
      }, 100);
    }
  }, [branchAgent, setValue, trigger, clearErrors]);

  const config = branchAgentCreationConfig();

  return (
    <div className="space-y-1 w-full">
      {/* Header */}
      <div className="flex items-center space-x-2">
       <FormTitle tableName="Super Checker List Table"
        actionName={branchAgent ? "Update Branch Agent" : "Create New Branch Agent"}
        />
      </div>

      {/* Form */}
      <FormProvider methods={methods}>
        <FormContentWrapper className="p-4 rounded-lg mr-auto w-full shadow-top">
          <TableTitle title={branchAgent ? "Update Branch Agent" : "Create New Branch Agent"} titleClassName="text-black"/>
          <Spacer>
            {/* Vendor Details */}
            <div className="relative p-1">
              <label className="text-sm font-medium absolute">Vendor Details</label>
            </div>
              <FormFieldRow rowCols={4}>
                {(["vendorName", "vendorCode"] as const).map((fieldName) => {
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
              <label className="text-sm font-medium absolute">Basic Details</label>
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
                        disabled: branchAgent && fieldName === "emailId",
                      })}
                    </FieldWrapper>
                  );
                })}
              </FormFieldRow>

            {/* Address */}
            <div className="relative p-1">
              <label className="text-sm font-medium absolute">Address</label>
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
              <FormFieldRow rowCols={5}>
                {(["status"] as const).map((fieldName) => {
                  const field = config.fields.agentDetails[fieldName];
                  return (
                    <FieldWrapper key={fieldName}>
                      {getController({
                        ...(field ?? {}),
                        name: field.name,
                        control,
                        errors,
                        className:"justify-start"
                      })}
                    </FieldWrapper>
                  );
                })}
              </FormFieldRow>
 {
              !branchAgent && (
                <NotificationBanner
                  message="Newly created branch agents active by default"
                  variant="warning"
                  size="sm"
                />
              )
            }
            {/* Security */}
              <div className="relative p-1">
              <label className="text-sm font-medium absolute">Create Password</label>
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
              <Button
                variant="secondary"
                type="submit"
                className="w-28"
                onClick={handleFormSubmit}
                disabled={isCreating || isUpdating}
              >
                {isCreating || isUpdating ? "Processing..." : branchAgent ? "Update" : "Create"}
              </Button>
            </div>
          </Spacer>
        </FormContentWrapper>
      </FormProvider>
    </div>
  );
};
