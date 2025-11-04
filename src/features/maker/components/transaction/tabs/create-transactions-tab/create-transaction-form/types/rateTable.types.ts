export type RateTableColumn = {
  id: string;
  invoiceName: string;
  niumRate: string;
  agentMarkUp: string;
  rate: string;
  cells?: {
    invoiceName?: () => React.ReactNode;
    niumRate?: () => React.ReactNode;
    agentMarkUp?: () => React.ReactNode;
    rate?: () => React.ReactNode;
  };
};
