import { StepConfig } from '../../../features/admin-portal/pages/user-management/agent-profile-creation/types/form.types';

export interface FormState {
  currentStep: number;
  isSubmitting: boolean;
  isValid: boolean;
  errors: Record<string, string>;
  data: Record<string, any>;
}

export interface StepperContextType {
  state: FormState;
  goToNextStep: () => Promise<void>;
  goToPrevStep: () => void;
  setStepValid: (stepId: string, isValid: boolean) => void;
}

export interface StepperProviderProps {
  children: React.ReactNode;
  steps: StepConfig[];
  onComplete: (data: Record<string, any>) => Promise<void>;
}
