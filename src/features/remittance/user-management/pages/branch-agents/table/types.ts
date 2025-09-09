export interface BranchAgentData {
  id: string;
  agentVendorCode: string;
  agentEntityName: string;
  fullName: string;
  emailId: string;
  role: string;
  phoneNo: string;
  checker: string;
  branch: string;
  status: 'Active' | 'Inactive';
}