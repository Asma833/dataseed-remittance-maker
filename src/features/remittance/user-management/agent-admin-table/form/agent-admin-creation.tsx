import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { agentAdminCreationSchema } from './agent-admin-creation.schema';
import { agentAdminCreationConfig } from './agent-admin-creation.config';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { CorporateOnboardingStep } from './steps/CorporateOnboardingStep';
import { BasicInformationStep } from './steps/BasicInformationStep';
import { CommissionStep } from './steps/CommissionStep';
import { CompanyDetailsStep } from './steps/CompanyDetailsStep';
import { DocumentsStep } from './steps/DocumentsStep';
import { FinanceDetailsStep } from './steps/FinanceDetailsStep';
import { ProductPurposeStep } from './steps/ProductPurposeStep';
import { RateMarginStep } from './steps/RateMarginStep';

import { Stepper } from './stepper';
import { TableTitle } from '@/features/auth/components/table-title';
import { FormTitle } from '@/features/auth/components/form-title';

const AgentAdminCreation: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const config = agentAdminCreationConfig();
  const steps = config.steps;

  // Example: you likely get this from API/route state
  const agentCode = 'VPC0345';

  const methods = useForm({
    resolver: zodResolver(agentAdminCreationSchema),
    defaultValues: {
      vendorCode: '',
      fullName: '',
      emailId: '',
      phoneNo: '',
      agentType: '',
      agentBranchCity: '',
      agentHOBranchState: '',
      ebixRMName: '',
      ebixRMBranchName: '',
      systemCode: '',
      status: 'Active',
      monthlyCreditLimit: '',
      totalCreditDays: '',
      gstClassification: '',
      gstNumber: '',
      gstPhoneNo: '',
      flatDoorNumber: '',
      roadStreet: '',
      areaLocality: '',
      gstCity: '',
      gstState: '',
      pinCode: '',
      gstBranch: '',
      financeSpocName: '',
      financeSpocEmail: '',
      financeSpocPhoneNo: '',
      bankAccounts: [],
      productPurpose: {
        addOnMargin: undefined,
        esignDocumentDownload: undefined,
        vkycDocumentDownload: undefined,
        chooseProductType: [],
        creditType: [],
        purposeTypesForCard: [],
      },
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    trigger,
    formState: { isSubmitting },
  } = methods;

  const clampStep = (n: number) => Math.max(0, Math.min(steps.length - 1, n));
  const goToStep = (n: number) => setCurrentStep(clampStep(n));

  const getStepFields = (step: number): string[] => {
    switch (step) {
      case 0: // Basic Information
        return ['vendorCode', 'fullName', 'emailId', 'phoneNo', 'agentType', 'agentBranchCity', 'agentHOBranchState', 'ebixRMName', 'ebixRMBranchName', 'systemCode', 'status', 'monthlyCreditLimit', 'totalCreditDays'];
      case 1: // Company Details
        return ['gstClassification', 'gstNumber', 'gstPhoneNo', 'flatDoorNumber', 'roadStreet', 'areaLocality', 'gstCity', 'gstState', 'pinCode', 'gstBranch'];
      case 2: // Finance Details
        return ['financeSpocName', 'financeSpocEmail', 'financeSpocPhoneNo'];
      case 4: // Product Purpose
        return ['productPurpose.addOnMargin', 'productPurpose.esignDocumentDownload', 'productPurpose.vkycDocumentDownload', 'productPurpose.chooseProductType', 'productPurpose.creditType', 'productPurpose.purposeTypesForCard'];
      default:
        return [];
    }
  };

  const handleNext = async () => {
    const stepFields = getStepFields(currentStep) as (keyof typeof agentAdminCreationSchema.shape)[];
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
    console.log('Form data:', data);
    navigate('/admin/users/agent-admin');
  });

  const renderStepContent = () => {
    const isStepCompleted = completedSteps.has(currentStep);
    switch (currentStep) {
      case 0:
        return <BasicInformationStep isCompleted={isStepCompleted} />;
      case 1:
        return <CompanyDetailsStep />;
      case 2:
        return <FinanceDetailsStep />;
      case 3:
        return <DocumentsStep />;
      case 4:
        return <ProductPurposeStep />;
      case 5:
        return <RateMarginStep />;
      case 6:
        return <CommissionStep />;
      case 7:
        return <CorporateOnboardingStep />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <FormTitle tableName="Agent Admin List Table" actionName={config.sectionTitle} className="pb-3 px-2"/>
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
                    if (i <= currentStep) goToStep(i); // allow jumping back only
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
                <Button type="button" variant="outline" disabled={currentStep === 0} onClick={handlePrevious} 
                 className="w-24">
                Back
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button variant="secondary" type="button" onClick={handleNext}  className="w-24">
                  Next
                </Button>
              ) : (
                <Button type="submit" form="agent-admin-create-form" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating...' : 'Create'}
                </Button>
              )}
            </div>
          </div>
          <hr className="border-gray-300"/>
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
