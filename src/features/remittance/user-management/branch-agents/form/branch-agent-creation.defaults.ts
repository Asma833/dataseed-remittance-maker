export const branchAgentDefaults = {
  agentDetails: {
    vendorDetails: {
      vendorName: '',
      vendorCode: '',
      agentEonCode: '',
      systemCode: '',
      primaryAgentEmail: '',
    },
    basicDetails: {
      fullName: '',
      emailId: '',
      mobileNo: '',
      checkerList: '',
    },
    address: {
      state: '',
      city: '',
      branch: '',
      rmName: '',
      rmBranch: '',
    },
    roleStatus: {
      role: 'branch_agent_checker',
      status: 'active' as const,
    },
    security: {
      password: '',
      confirmPassword: '',
    },
  },
};