export type RateTableColumn = {
  id: string;
  invoiceName: string;
  companyRate: string;
  agentMarkUp: string;
  rate: string;
  cells?: {
    invoiceName?: () => React.ReactNode;
    companyRate?: () => React.ReactNode;
    agentMarkUp?: () => React.ReactNode;
    rate?: () => React.ReactNode;
  };
};
