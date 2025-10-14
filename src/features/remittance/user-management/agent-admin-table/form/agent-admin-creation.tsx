import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, FieldPath } from 'react-hook-form';
import { z } from 'zod';
import { agentAdminCreationSchema } from './agent-admin-creation.schema';
import { agentAdminCreationConfig } from './agent-admin-creation.config';
import { agentAdminCreationDefaults } from './agent-admin-creation.defaults';
import { resetAgentAdminForm } from './components/agent-admin-form-utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { BasicInformationStep } from './steps/BasicInformationStep';
import { CommissionStep } from './steps/CommissionStep';
import { CompanyDetailsStep } from './steps/CompanyDetailsStep';
import { DocumentsStep } from './steps/DocumentsStep';
import { FinanceDetailsStep } from './steps/FinanceDetailsStep';
import { ProductPurposeStep } from './steps/ProductPurposeStep';
import { CorporateOnboardingStep } from './steps/CorporateOnboardingStep';

import { Stepper } from './stepper';
import { FormTitle } from '@/features/auth/components/form-title';
import { useCreateAgent } from '../../hooks/useCreateAgent';
import { useUpdateAgentAdmin } from '../../hooks/useUpdateAgentAdmin';

type AgentAdminFormType = z.input<typeof agentAdminCreationSchema>;

const AgentAdminCreation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [submittedData, setSubmittedData] = useState<AgentAdminFormType | null>(null);

  const config = agentAdminCreationConfig();
  const steps = config.steps;

  const editData = location.state?.editData;
  const isEditMode = !!editData;

  // Example: you likely get this from API/route state
  const agentCode = editData?.agent_code || '[ ]';

  const { mutate: createAgent, isLoading: isCreating } = useCreateAgent({
    onAgentCreateSuccess: () => {
      navigate('/admin/agent-admin');
    },
  });
  const { mutate: updateAgent, isLoading: isUpdating } = useUpdateAgentAdmin({
    onAgentAdminUpdateSuccess: () => {
      navigate('/admin/agent-admin');
    },
  });

  const methods = useForm({
    resolver: zodResolver(agentAdminCreationSchema),
    defaultValues: agentAdminCreationDefaults,
    mode: 'onChange',
  });

  useEffect(() => {
    if (isEditMode && editData) {
      resetAgentAdminForm(methods, editData);
    }
  }, [isEditMode, editData, methods]);

  const {
    handleSubmit,
    trigger,
    formState: { isSubmitting },
  } = methods;

  const clampStep = (n: number) => Math.max(0, Math.min(steps.length - 1, n));
  const goToStep = (n: number) => setCurrentStep(clampStep(n));

  const getStepFields = (step: number): FieldPath<AgentAdminFormType>[] => {
    const stepFieldGroups = [
      'basicInformation',
      'companyDetails',
      'financeDetails',
      'documents',
      'productPurpose',
      'commission',
      'corporateOnboarding',
    ];
    const group = stepFieldGroups[step];
    if (!group) return [];
    const fields = (config.fields as Record<string, any>)[group];
    if (!fields) return [];
    const fieldNames: FieldPath<AgentAdminFormType>[] = [];
    const collectNames = (obj: any): void => {
      if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
        if (obj.name && typeof obj.name === 'string') {
          fieldNames.push(obj.name as FieldPath<AgentAdminFormType>);
        } else {
          for (const key in obj) {
            collectNames(obj[key]);
          }
        }
      }
    };
    collectNames(fields);
    return fieldNames;
  };

  const handleNext = async () => {
    const stepFields = getStepFields(currentStep);
    const isValid = await trigger(stepFields);
    if (isValid && currentStep < steps.length - 1) {
      setCompletedSteps((prev) => new Set([...prev, currentStep]));
      goToStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      // Mark current step as incomplete when going back
      setCompletedSteps((prev) => {
        const newSet = new Set(prev);
        newSet.delete(currentStep);
        return newSet;
      });
      goToStep(currentStep - 1);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    setSubmittedData(data);
    if (isEditMode) {
      updateAgent({ id: editData.id, formData: data });
    } else {
      createAgent(data);
    }
  });

  const renderStepContent = () => {
    const isStepCompleted = completedSteps.has(currentStep);
    switch (currentStep) {
      case 0:
        return <BasicInformationStep isCompleted={isStepCompleted} />;
      case 1:
        return <CompanyDetailsStep />;
      case 2:
        return <FinanceDetailsStep agentId={isEditMode ? editData?.id : ''} />;
      case 3:
        return <DocumentsStep />;
      case 4:
        return <ProductPurposeStep />;
      case 5:
        return <CommissionStep />;
      case 6:
        return <CorporateOnboardingStep agentId={isEditMode ? editData?.id : ''} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <FormTitle
        tableName="Agent Admin List Table"
        actionName={isEditMode ? 'Edit Agent Admin' : config.sectionTitle}
        className="pb-3 px-2"
      />
      <Card className="border-none space-y-0 p-2">
        <CardContent>
          {/* TOP BAR: Stepper + Agent Code + Nav */}
          <div className="w-full rounded-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Stepper (takes full width) */}
              <div className="flex-1">
                <Stepper
                  steps={steps}
                  currentStep={currentStep}
                  completedSteps={completedSteps}
                  onStepClick={(i) => {
                    // allow jumping back or staying on current step
                    if (i <= currentStep) {
                      setCurrentStep(i);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border-none space-y-0 px-4 mt-2">
        <CardContent>
          {/* Agent Code + Buttons (aligned center with stepper row) */}
          <div className="w-full flex items-center justify-between gap-6 py-2">
            <div className="text-sm whitespace-nowrap ">
              <span className="text-muted-foreground font-semibold">Agent Code:&nbsp;</span>
              <span className="font-semibold text-destructive">{agentCode}</span>
            </div>

            <div className="flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                disabled={currentStep === 0}
                onClick={handlePrevious}
                className="w-24"
              >
                Back
              </Button>
              {currentStep === 6 && (
                <>
                  <Button
                    type="submit"
                    form="agent-admin-create-form"
                    disabled={isCreating || isUpdating}
                    className="w-24"
                  >
                    {isCreating || isUpdating ? 'Submitting...' : isEditMode ? 'Update' : 'Submit'}
                  </Button>
                </>
              )}
              {currentStep !== 6 && (
                <Button variant="secondary" type="button" onClick={handleNext} className="w-24">
                  Next
                </Button>
              )}
            </div>
          </div>
          <hr className="border-gray-300 mb-2" />
          <FormProvider {...methods}>
            <form id="agent-admin-create-form" onSubmit={onSubmit}>
              {renderStepContent()}
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentAdminCreation;
