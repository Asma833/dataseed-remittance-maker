import { FieldType } from '@/types/enums';

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
export type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  placeholder: string;
  required: boolean;
  options?: Record<string, { label: string }>;
  disabled?: boolean;
};
