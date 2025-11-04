import { createContext, useContext, useState, ReactNode } from 'react';
import { AccordionState, AccordionStateProviderType } from '../types/createTransactionForm.types';

const AccordionStateContext = createContext<AccordionStateProviderType | undefined>(undefined);

export const AccordionStateProvider = ({ children }: { children: ReactNode }) => {
  const [accordionState, setAccordionState] = useState<AccordionState>({
    currentActiveTab: 'panel1',
    isTransactionBasicDetailsOpen: true,
    isCurrencyDetailsOpen: false,
    isBeneficiaryOpen: false,
    isEditMode: false,
  });

  const setPartialAccordionState = (partialState: Partial<AccordionState>) => {
    setAccordionState((prev) => ({ ...prev, ...partialState }));
  };

  return (
    <AccordionStateContext.Provider value={{ accordionState, setAccordionState: setPartialAccordionState }}>
      {children}
    </AccordionStateContext.Provider>
  );
};

export const useAccordionStateProvider = () => {
  const context = useContext(AccordionStateContext);
  if (!context) {
    throw new Error('useAccordionStateProvider must be used within an AccordionStateProvider');
  }
  return context;
};
