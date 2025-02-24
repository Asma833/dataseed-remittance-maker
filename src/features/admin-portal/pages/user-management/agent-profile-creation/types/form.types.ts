import { z } from 'zod';

export type StepValidationSchema = z.ZodObject<any>;

export interface StepConfig {
  id: string;
  label: string;
  validationSchema?: StepValidationSchema;
  isOptional?: boolean;
}

export interface FormStep extends StepConfig {
  content: React.ReactNode;
}

export interface FormState {
  currentStep: number;
  isSubmitting: boolean;
  isValid: boolean;
  errors: Record<string, string>;
  data: Record<string, any>;
}
