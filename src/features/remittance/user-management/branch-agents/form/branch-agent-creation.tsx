import { useEffect } from 'react';
import { useForm, useWatch, SubmitHandler } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormProvider } from '@/components/form/providers/form-provider';
import { FormContentWrapper } from '@/components/form/wrapper/form-content-wrapper';
import FormFieldRow from '@/components/form/wrapper/form-field-row';
import FieldWrapper from '@/components/form/wrapper/field-wrapper';
import Spacer from '@/components/form/wrapper/spacer';
import { Button } from '@/components/ui/button';
import { NotificationBanner } from '@/components/ui/notification-banner';
import { FormTitle } from '@/features/auth/components/form-title';
import { TableTitle } from '@/features/auth/components/table-title';
import { getController } from '@/components/form/utils/get-controller';

import { branchAgentCreationConfig } from './branch-agent-creation.config';
import { BranchAgentForm, branchAgentSchema } from './branch-agent-creation.schema';
import { branchAgentDefaults } from './branch-agent-creation.defaults';
import { useCreateBranchAgent } from '../../hooks/useCreateBranchAgent';
import { useUpdateBranchAgent } from '../../hooks/useUpdateBranchAgent';
import { useGetAgents } from '../../hooks/useGetAgents';
import { useGetBranchAgents } from '../../hooks/useGetBranchAgents';
import { Agent } from '../../api/agents';
import { ROUTE_PREFIXES, ROUTES } from '@/core/constant/route-paths';

// Helper to normalize any vendor value to an agent object
const resolveAgentFromValue = (val: unknown, agents?: Array<Agent>) => {
  if (!agents || !val) return undefined;
  if (typeof val === 'string') {
    const found = agents.find((a) => a.agent_code === val) || agents.find((a) => a.agent_name === val);
    return found;
  }

  if (typeof val === 'object') {
    const anyVal = val as any;
    const byCode = anyVal?.agent_code ?? anyVal?.agent_entity_email ?? anyVal?.value ?? anyVal?.code ?? anyVal?.id;
    const byName = anyVal?.agent_name ?? anyVal?.label ?? anyVal?.name ?? anyVal?.text;
    const found = (byCode && agents.find((a) => a.agent_code === String(byCode) || a.agent_entity_email === String(byCode))) ||
      (byName && agents.find((a) => a.agent_name === String(byName)));
    return found;
  }
  return undefined;
};

export const CreateBranchAgent = () => {
  const methods = useForm<BranchAgentForm>({
    resolver: zodResolver(branchAgentSchema),
    mode: 'onChange',
    defaultValues: branchAgentDefaults as BranchAgentForm,
  });

  const {
    control,
    setValue,
    reset,
    trigger,
    clearErrors,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = methods;

  const navigate = useNavigate();
  const location = useLocation();
  const branchAgent = location.state?.branchAgent;
  const { agents } = useGetAgents();
  const { data: branchAgents } = useGetBranchAgents();

  const config = branchAgentCreationConfig(agents, branchAgents || []);

  // Watch the vendor select field (holds agent_code)
  const selectedVendorValue = useWatch({
    control,
    name: 'agentDetails.vendorDetails.vendorName',
  });
  // Watch the role field to conditionally show checker list
  const selectedRole = useWatch({
    control,
    name: 'agentDetails.roleStatus.role',
  });

  /** --- EDIT MODE PREFILL --- */
  useEffect(() => {
    if (!branchAgent) return;

   
    const checkerName = branchAgent.checker_list !== null ? branchAgents?.find(agent => agent.id === branchAgent.checker_list)?.full_name || '' : '';

    reset({
      agentDetails: {
        vendorDetails: {
          vendorName: branchAgent.agent_vendor_code,
          agentEonCode: branchAgent.agent_vendor_code,
          systemCode: branchAgent.system_code || '-',
          primaryAgentEmail: branchAgent.agent_entity_email || '-',
        },
        basicDetails: {
          fullName: branchAgent.full_name || '',
          emailId: branchAgent.email || '',
          mobileNo: branchAgent.phone_number || '',
          checkerList: checkerName,
        },
        address: {
          state: branchAgent.address_state || '',
          city: branchAgent.address_city || '',
          branch: branchAgent.address_branch || '',
          rmName:  branchAgent.rm_name,
          rmBranch: branchAgent.rm_branch_name,
        },
        roleStatus: {
          role: branchAgent.role || 'branch_agent_checker',
          status: branchAgent.is_blocked ? 'blocked' : branchAgent.is_active ? 'active' : 'inactive',
        },
        security: { password: '', confirmPassword: '' },
      },
    });

    // Clear disabled email error
    setTimeout(() => {
      clearErrors('agentDetails.basicDetails.emailId');
      trigger();
    }, 0);
  }, [branchAgent, branchAgents, reset, trigger, clearErrors]);

  /** --- WHEN SELECT CHANGES: update vendorCode and primaryAgentEmail --- */
  useEffect(() => {
    if (!agents || !selectedVendorValue) return;
    const found = resolveAgentFromValue(selectedVendorValue, agents);
    if (found) {
      setValue('agentDetails.vendorDetails.agentEonCode', found.agent_code || '-', {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue('agentDetails.vendorDetails.primaryAgentEmail', found.agent_entity_email || '-', {
        shouldDirty: true,
        shouldValidate: true,
      });
       setValue('agentDetails.address.rmName', found.rm_name || '-', {
        shouldDirty: true,
        shouldValidate: true,
      });
        setValue('agentDetails.address.rmBranch', found.rm_branch_name || '-', {
        shouldDirty: true,
        shouldValidate: true,
      });
    } 
  }, [selectedVendorValue, agents, setValue]);


  const handleBack = () => navigate('/admin/user-management/branch-agents',);

  const { mutate: createBranchAgent, isLoading: isCreating } = useCreateBranchAgent({
    onBranchAgentCreateSuccess: () => navigate('/admin/user-management/branch-agents'),
  });

  const { mutate: updateBranchAgent, isLoading: isUpdating } = useUpdateBranchAgent({
    onBranchAgentUpdateSuccess: () => navigate('/admin/user-management/branch-agents'),
  });

  const onSubmit: SubmitHandler<BranchAgentForm> = (data) => {
    const resolved = resolveAgentFromValue(data.agentDetails.vendorDetails.vendorName, agents);
    const agentCode = resolved?.id ?? String(data.agentDetails.vendorDetails.vendorName ?? '');

    // Convert checker name back to ID for API
    const checkerId = data.agentDetails.basicDetails.checkerList
      ? branchAgents?.find(agent => agent.full_name === data.agentDetails.basicDetails.checkerList)?.id
      : null;

    if (branchAgent) {
      // UPDATE
      const payload = {
        id: branchAgent.id,
        full_name: data.agentDetails.basicDetails.fullName,
        address_city: data.agentDetails.address.city,
        address_state: data.agentDetails.address.state,
        address_branch: data.agentDetails.address.branch,
        phone_number: data.agentDetails.basicDetails.mobileNo || '',
        role: data.agentDetails.roleStatus.role,
        is_active: data.agentDetails.roleStatus.status === 'active',
        is_blocked: data.agentDetails.roleStatus.status === 'blocked',
        agent_ids: [agentCode],
        checker_list: checkerId ? [checkerId] : [],
        password: data.agentDetails.security.password,
      };
      updateBranchAgent(payload);
    } else {
      // CREATE
      const payload = {
        full_name: data.agentDetails.basicDetails.fullName,
        email: data.agentDetails.basicDetails.emailId,
        password: data.agentDetails.security.password,
        address_city: data.agentDetails.address.city,
        address_state: data.agentDetails.address.state,
        address_branch: data.agentDetails.address.branch,
        phone_number: data.agentDetails.basicDetails.mobileNo || '',
        role: data.agentDetails.roleStatus.role,
        is_active: data.agentDetails.roleStatus.status === 'active',
        is_blocked: data.agentDetails.roleStatus.status === 'blocked',
        agent_ids: [agentCode],
        checker_list: checkerId ? [checkerId] : [],
      };
      createBranchAgent(payload);
    }
  };

  return (
    <div className="space-y-1 w-full">
      {/* HEADER */}
      <div className="flex items-center space-x-2">
        <FormTitle
          tableName="Super Checker List Table"
          actionName={branchAgent ? 'Update Branch Agent' : 'Create New Branch Agent'}
        />
      </div>

      {/* FORM */}
      <FormProvider methods={methods}>
        <FormContentWrapper className="p-4 rounded-lg mr-auto w-full shadow-top">
          <TableTitle
            title={branchAgent ? 'Update Branch Agent' : 'Create New Branch Agent'}
            titleClassName="text-black"
          />
          <Spacer>
            {/* --- Vendor Details --- */}
            <div className="relative p-1">
              <label className="text-sm font-medium absolute">Vendor Details</label>
            </div>
            <FormFieldRow rowCols={4}>
              {(['vendorName', 'agentEonCode','systemCode','primaryAgentEmail'] as const).map((fieldName) => {
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

            {/* --- Basic Details --- */}
            <div className="relative p-1">
              <label className="text-sm font-medium absolute">Basic Details</label>
            </div>
            <FormFieldRow rowCols={4}>
              {(['fullName', 'emailId', 'mobileNo'] as const).map((fieldName) => {
                const field = config.fields.agentDetails[fieldName];
                return (
                  <FieldWrapper key={fieldName}>
                    {getController({
                      ...(field ?? {}),
                      name: field.name,
                      control,
                      errors,
                      disabled: !!branchAgent && fieldName === 'emailId',
                    })}
                  </FieldWrapper>
                );
              })}
            </FormFieldRow>

            {/* --- Address --- */}
            <div className="relative p-1">
              <label className="text-sm font-medium absolute">Address</label>
            </div>
            <FormFieldRow rowCols={4}>
              {(['state', 'city', 'branch'] as const).map((fieldName) => {
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
              {(['rmName', 'rmBranch'] as const).map((fieldName) => {
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
            {/* --- Role & Status --- */}
            <FormFieldRow rowCols={2}>
              {(['role'] as const).map((fieldName) => {
                const field = config.fields.agentDetails[fieldName];
                return (
                  <FieldWrapper key={fieldName}>
                    {getController({
                      ...(field ?? {}),
                      name: field.name,
                      control,
                      className: 'justify-start',
                      errors,
                    })}
                  </FieldWrapper>
                );
              })}
            </FormFieldRow>
              {/* --- Checker List --- */}
              {selectedRole === 'branch_agent_maker' && (
                <FormFieldRow rowCols={4}>
                {(['checkerList'] as const).map((fieldName) => {
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
              )}
            <FormFieldRow rowCols={5}>
              {(['status'] as const).map((fieldName) => {
                const field = config.fields.agentDetails[fieldName];
                return (
                  <FieldWrapper key={fieldName}>
                    {getController({
                      ...(field ?? {}),
                      name: field.name,
                      control,
                      disabled: !branchAgent,
                      errors,
                      className: 'justify-start',
                    })}
                  </FieldWrapper>
                );
              })}
            </FormFieldRow>

            {!branchAgent && (
              <NotificationBanner message="Newly created branch agents active by default" variant="warning" size="sm" />
            )}

            {/* --- Security --- */}
            <div className="relative p-1">
              <label className="text-sm font-medium absolute">Create Password</label>
            </div>
            <FormFieldRow rowCols={4}>
              {(['password', 'confirmPassword'] as const).map((fieldName) => {
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

            {/* --- Actions --- */}
            <div className="flex justify-start space-x-2 px-1">
              <Button variant="outline" className="w-28" onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="secondary"
                type="submit"
                className="w-28"
                onClick={handleSubmit(onSubmit)}
                disabled={isCreating || isUpdating}
              >
                {isCreating || isUpdating ? 'Processing...' : branchAgent ? 'Update' : 'Create'}
              </Button>
            </div>
          </Spacer>
        </FormContentWrapper>
      </FormProvider>
    </div>
  );
};
