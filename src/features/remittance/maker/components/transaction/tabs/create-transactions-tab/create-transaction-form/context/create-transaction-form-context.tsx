import { createContext, useContext, useState, ReactNode } from 'react';

type CreateTransactionContextType = {
  // Add your state and actions here
  transactionData: any;
  setTransactionData: (data: any) => void;
};

const CreateTransactionContext = createContext<CreateTransactionContextType | undefined>(undefined);

export const CreateTransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactionData, setTransactionData] = useState<any>(null);

  return (
    <CreateTransactionContext.Provider value={{ transactionData, setTransactionData }}>
      {children}
    </CreateTransactionContext.Provider>
  );
};

export const useCreateTransactionContext = () => {
  const context = useContext(CreateTransactionContext);
  if (!context) {
    throw new Error('useCreateTransactionContext must be used within a CreateTransactionProvider');
  }
  return context;
};
