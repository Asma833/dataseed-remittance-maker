import { FormProvider as RHFFormProvider } from "react-hook-form";

export const FormProvider: React.FC<{ methods: any; children: React.ReactNode }> = ({ 
  methods, 
  children 
}) => (
  <RHFFormProvider {...methods}>
    {children}
  </RHFFormProvider>
);
