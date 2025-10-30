import { FieldType } from '@/types/enums';
import { Agent } from '../../api/agents';
import { BranchAgentData } from '../table/types';

export const branchAgentCreationConfig = (agents: Agent[] = [], branchAgents: BranchAgentData[] = []) => {
  const agentOptions = agents.map((agent) => ({
    id: agent.id,
    agent_code: agent.agent_code,
    value: agent.agent_code,
    label: agent.agent_name,
  }));
  const branchAgentList = branchAgents
    ?.filter((agent) => agent.role === 'branch_agent_checker')
    .map((agent) => ({
      id: agent.id,
      value: agent.full_name,
      label: agent.full_name,
    }));
  return {
    sectionTitle: 'Branch Agent Creation',
    fields: {
      agentDetails: {
        // Vendor
        vendorName: {
          name: 'agentDetails.vendorDetails.vendorName',
          label: 'Primary Agent Name',
          type: FieldType.Select,
          required: true,
          placeholder: 'Select Primary Agent Name',
          options: agentOptions,
        },
        agentEonCode: {
          name: 'agentDetails.vendorDetails.agentEonCode',
          label: 'Vendor Code',
          type: FieldType.Text,
          disabled: true,
          placeholder: 'Enter Vendor Code',
        },
        systemCode: {
          name: 'agentDetails.vendorDetails.systemCode',
          label: 'System Code',
          type: FieldType.Text,
          disabled: true,
          placeholder: 'Enter System Code',
        },
        primaryAgentEmail: {
          name: 'agentDetails.vendorDetails.primaryAgentEmail',
          label: 'Primary Agent Email',
          type: FieldType.Email,
          disabled: true,
          placeholder: 'Enter Primary Agent Email',
        },

        // Basic
        fullName: {
          name: 'agentDetails.basicDetails.fullName',
          label: 'Full Name',
          type: FieldType.Text,
          required: true,
          placeholder: 'Enter Full Name',
        },
        emailId: {
          name: 'agentDetails.basicDetails.emailId',
          label: 'Email Id',
          type: FieldType.Email,
          required: true,
          placeholder: 'Enter Email Id',
        },
        mobileNo: {
          name: 'agentDetails.basicDetails.mobileNo',
          label: 'Phone No',
          type: FieldType.Phone,
          placeholder: 'Enter Phone Number',
        },
        // Address
        state: {
          name: 'agentDetails.address.state',
          label: 'Branch State',
          type: FieldType.Text,
          required: true,
          placeholder: 'Enter Branch State',
        },
        city: {
          name: 'agentDetails.address.city',
          label: 'Branch City',
          type: FieldType.Text,
          required: true,
          placeholder: 'Enter Branch City',
        },
        branch: {
          name: 'agentDetails.address.branch',
          label: 'Branch Name',
          type: FieldType.Text,
          required: true,
          placeholder: 'Enter Branch Name',
        },
        rmName: {
          name: 'agentDetails.address.rmName',
          label: 'RM Name',
          type: FieldType.Text,
          disabled: true,
          placeholder: 'Enter Branch Name',
        },
        rmBranch: {
          name: 'agentDetails.address.rmBranch',
          label: 'RM Branch Name',
          type: FieldType.Text,
          disabled: true,
          placeholder: 'Enter RM Branch Name',
        },
        // Role / Checker / Status
        role: {
          name: 'agentDetails.roleStatus.role',
          label: 'Choose Role',
          type: FieldType.Radio,
          required: true,
          isMulti: false,
          variant: 'circle_check_filled',
          options: {
            branch_agent_maker: { label: 'Maker' },
            branch_agent_checker: { label: 'Checker', checked: true },
            branch_agent_both: { label: 'Maker & Checker' },
            branch_agent_co_admin: { label: 'Co Admin' },
          },
        },
        checkerList: {
          name: 'agentDetails.basicDetails.checkerList',
          label: 'Checker List',
          type: FieldType.Select,
          isMulti: false,
          placeholder: 'Select Checker List',
          options: branchAgentList,
        },
        status: {
          name: 'agentDetails.roleStatus.status',
          label: 'Status',
          type: FieldType.Radio,
          required: true,
          options: {
            active: { label: 'Active', checked: true },
            inactive: { label: 'Inactive' },
            blocked: { label: 'Blocked' },
          },
        },

        // Security
        password: {
          name: 'agentDetails.security.password',
          label: 'Password',
          type: FieldType.Password,
          required: true,
          placeholder: 'Enter Password',
        },
        confirmPassword: {
          name: 'agentDetails.security.confirmPassword',
          label: 'Confirm Password',
          type: FieldType.Password,
          required: true,
          placeholder: 'Enter Password',
        },
      },
    },
  };
};
