export interface AgentAdminData {
  id: string;
  agentVendorCode: string;
  systemCode: string;
  agentEntityName: string;
  rm: string;
  agentExpiryDate: string;
  rbiLicenseExpiryDate: string;
  status: 'Active' | 'Inactive';
  reasonForInactive?: string;
}
