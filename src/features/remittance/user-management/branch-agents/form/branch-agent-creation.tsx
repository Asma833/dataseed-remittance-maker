import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
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
import { CreateBranchAgentRequest } from "../../branch-agents/table/types";
import { NotificationBanner } from "@/components/ui/notification-banner";
import { useGetAgents } from "../../hooks/useGetAgents";


export const CreateBranchAgent = () => {
  const methods = useForm<BranchAgentForm>({
    resolver: zodResolver(branchAgentSchema),
    mode: "onChange",
    defaultValues: {
      basicInformation: {
        agent_code: "",
        agent_name: "",
        emailId: "",
        phoneNo: "",
        agentType: "type1",
        agentBranchCity: "",
        agentHOBranchState: "",
        ebixRMName: "",
        ebixRMBranchName: "",
        systemCode: "",
        status: "ACTIVE",
        monthlyCreditLimit: 0,
        totalCreditDays: 30,
        password: "",
      },
      companyDetails: {
        gstClassification: "regular",
        gstNumber: "",
        gstPhoneNo: "",
        flatDoorNumber: "",
        roadStreet: "",
        areaLocality: "",
        gstCity: "",
        gstState: "",
        pinCode: "",
        gstBranch: "",
      },
      financeDetails: {
        financeSpocName: "",
        financeSpocEmail: "",
        financeSpocPhoneNo: "",
      },
      documents: {
        agreementValid: "",
        rbiLicenseCategory: "",
        rbiLicenseValidity: "",
        noOfBranches: 1,
        extensionMonth: "",
      },
      productPurpose: {
        addOnMargin: false,
        esignDocumentDownload: false,
        vkycDocumentDownload: false,
        chooseProductType: [],
        creditType: [],
        purposeTypesForCard: [],
      },
      rateMargin: {
        currency: {},
        card: {
          markupFlat: 0,
          markupPercent: 0,
        },
        remittance: {
          slabs: [],
        },
      },
      commission: {
        commission_product_type: "Remittance",
        commission_type: "HYBRID",
        product_margin: {
          agent_fixed_margin: "PERCENTAGE",
          all_currency: "ALL_CURRENCY",
          all_currency_margin: 0,
          currency_list: [],
        },
        nostro_charges: {
          type: "FX",
          all_currency: "ALL_CURRENCY",
          all_currency_margin: 0,
          currency_list: [],
        },
        tt_charges: {
          rate: 0,
        },
        other_charges: {
          rate: 0,
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
  const { agents } = useGetAgents();


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
    const payload: CreateBranchAgentRequest = {
      full_name: data.basicInformation.agent_name,
      email: data.basicInformation.emailId,
      password: data.basicInformation.password,
      address_city: data.basicInformation.agentBranchCity,
      address_state: data.basicInformation.agentHOBranchState,
      address_branch: data.companyDetails.gstBranch,
      phone_number: data.basicInformation.phoneNo,
      role: data.basicInformation.agentType,
      agent_ids: [], // TODO: determine how to populate agent_ids
    };

    createBranchAgent(payload);
  };

  const handleFormSubmit = handleSubmit(onSubmit);

  /** Optional: map backend -> frontend values */
  useEffect(() => {
    if (branchAgent) {
      // For admin agents, map the data accordingly
      // This would need to be updated based on the actual backend response structure
      setValue("basicInformation.agent_code", branchAgent.agent_code || "");
      setValue("basicInformation.agent_name", branchAgent.agent_name || "");
      setValue("basicInformation.emailId", branchAgent.email || "");
      setValue("basicInformation.phoneNo", branchAgent.phone_number || "");
      // Add other mappings as needed
    }
  }, [branchAgent, setValue]);

  const config = branchAgentCreationConfig(agents);

  return (
    <div className="space-y-1 w-full">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <FormTitle tableName="Admin Agent List Table"
         actionName={branchAgent ? "Update Admin Agent" : "Create New Admin Agent"}
         />
      </div>

      {/* Form */}
      <FormProvider methods={methods}>
        <FormContentWrapper className="p-4 rounded-lg mr-auto w-full shadow-top">
          <TableTitle title={branchAgent ? "Update Admin Agent" : "Create New Admin Agent"} titleClassName="text-black"/>
          <Spacer>
            {/* Basic Information */}
            <div className="relative p-1">
              <label className="text-sm font-medium absolute">Basic Information</label>
            </div>
            <FormFieldRow rowCols={4}>
              {(["agent_code", "agent_name", "emailId", "phoneNo"] as const).map((fieldName) => {
                const field = config.fields[fieldName];
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
              {(["agentType", "agentBranchCity", "agentHOBranchState", "ebixRMName"] as const).map((fieldName) => {
                const field = config.fields[fieldName];
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
              {(["ebixRMBranchName", "systemCode", "monthlyCreditLimit", "totalCreditDays"] as const).map((fieldName) => {
                const field = config.fields[fieldName];
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
              {(["status"] as const).map((fieldName) => {
                const field = config.fields[fieldName];
                return (
                  <FieldWrapper key={fieldName}>
                    {getController({
                      ...(field ?? {}),
                      name: field.name,
                      control,
                      errors,
                      className: "justify-start"
                    })}
                  </FieldWrapper>
                );
              })}
            </FormFieldRow>
            <FormFieldRow rowCols={4}>
              {(["password"] as const).map((fieldName) => {
                const field = config.fields[fieldName];
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

            {/* Company Details */}
            <div className="relative p-1">
              <label className="text-sm font-medium absolute">Company Details</label>
            </div>
            <FormFieldRow rowCols={4}>
              {(["gstClassification", "gstNumber", "gstPhoneNo", "flatDoorNumber"] as const).map((fieldName) => {
                const field = config.fields[fieldName];
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
              {(["roadStreet", "areaLocality", "gstCity", "gstState"] as const).map((fieldName) => {
                const field = config.fields[fieldName];
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
              {(["pinCode", "gstBranch"] as const).map((fieldName) => {
                const field = config.fields[fieldName];
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

            {/* Finance Details */}
            <div className="relative p-1">
              <label className="text-sm font-medium absolute">Finance Details</label>
            </div>
            <FormFieldRow rowCols={4}>
              {(["financeSpocName", "financeSpocEmail", "financeSpocPhoneNo"] as const).map((fieldName) => {
                const field = config.fields[fieldName];
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

            {/* Documents */}
            <div className="relative p-1">
              <label className="text-sm font-medium absolute">Documents</label>
            </div>
            <FormFieldRow rowCols={4}>
              {(["agreementValid", "rbiLicenseCategory", "rbiLicenseValidity", "noOfBranches"] as const).map((fieldName) => {
                const field = config.fields[fieldName];
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
              {(["extensionMonth"] as const).map((fieldName) => {
                const field = config.fields[fieldName];
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

            {/* Product Purpose */}
            <div className="relative p-1">
              <label className="text-sm font-medium absolute">Product Purpose</label>
            </div>
            <FormFieldRow rowCols={4}>
              {(["addOnMargin", "esignDocumentDownload", "vkycDocumentDownload"] as const).map((fieldName) => {
                const field = config.fields[fieldName];
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
              {(["chooseProductType", "creditType", "purposeTypesForCard"] as const).map((fieldName) => {
                const field = config.fields[fieldName];
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

