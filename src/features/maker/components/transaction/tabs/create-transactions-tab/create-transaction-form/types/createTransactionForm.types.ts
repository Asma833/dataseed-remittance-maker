export type AccordionItem = {
  id: string;
  title: string;
  content: string | ((props: any) => React.ReactNode);
};

export type AccordionStateProviderType = {
  accordionState: AccordionState;
  setAccordionState: (state: Partial<AccordionState>) => void;
};

export type AccordionState = {
  currentActiveTab: string;
  isTransactionBasicDetailsOpen: boolean;
  isCurrencyDetailsOpen: boolean;
  isBeneficiaryOpen: boolean;
  isEditMode: boolean;
};
