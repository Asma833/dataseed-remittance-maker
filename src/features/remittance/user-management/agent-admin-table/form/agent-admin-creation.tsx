import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, FieldPath } from 'react-hook-form';
import { z } from 'zod';
import { agentAdminCreationSchema } from './agent-admin-creation.schema';
import { agentAdminCreationConfig } from './agent-admin-creation.config';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { BasicInformationStep } from './steps/BasicInformationStep';
import { CommissionStep } from './steps/CommissionStep';
import { CompanyDetailsStep } from './steps/CompanyDetailsStep';
import { DocumentsStep } from './steps/DocumentsStep';
import { FinanceDetailsStep } from './steps/FinanceDetailsStep';
import { ProductPurposeStep } from './steps/ProductPurposeStep';
import { RateMarginStep } from './steps/RateMarginStep';
import { CorporateOnboardingStep } from './steps/CorporateOnboardingStep';

import { Stepper } from './stepper';
import { FormTitle } from '@/features/auth/components/form-title';

type AgentAdminFormType = z.infer<typeof agentAdminCreationSchema>;

const AgentAdminCreation: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const config = agentAdminCreationConfig();
  const steps = config.steps;

  // Example: you likely get this from API/route state
  const agentCode = 'VPC0345';
  console.log(currentStep,"currentStep")
  const methods = useForm({
    resolver: zodResolver(agentAdminCreationSchema),
    defaultValues: {
      vendorCode: 'V001',
      fullName: 'John Doe',
      emailId: 'john.doe@example.com',
      phoneNo: '1234567890',
      agentType: 'Type A',
      agentBranchCity: 'Mumbai',
      agentHOBranchState: 'Maharashtra',
      ebixRMName: 'RM Name',
      ebixRMBranchName: 'Branch Name',
      systemCode: 'SYS001',
      status: 'Active',
      monthlyCreditLimit: '10000',
      totalCreditDays: '30',
      gstClassification: 'Regular',
      gstNumber: '22AAAAA0000A1Z5',
      gstPhoneNo: '9876543210',
      flatDoorNumber: '123',
      roadStreet: 'Main Street',
      areaLocality: 'Locality',
      gstCity: 'Mumbai',
      gstState: 'Maharashtra',
      pinCode: '400001',
      gstBranch: 'Main Branch',
      financeSpocName: 'Finance SPOC',
      financeSpocEmail: 'finance@example.com',
      financeSpocPhoneNo: '1234567890',
      bankAccounts: [
        {
          bankName: 'Bank of Example',
          branchName: 'Main Branch',
          accountHolder: 'John Doe',
          accountNumber: '123456789012',
          ifscCode: 'EXAM0001234',
        },
      ],
      productPurpose: {
        addOnMargin: 'No',
        esignDocumentDownload: 'No',
        vkycDocumentDownload: 'No',
        chooseProductType: { card: false, currency: false, remittance: true, referral: false },
        creditType: { CNC: true, linecredit: false },
        purposeTypesForCard: { personaltravel: true, businesstravel: false, education: false, immigration: false, employment: false, medical: false },
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

  const getStepFields = (step: number): FieldPath<AgentAdminFormType>[] => {
    // Temporarily disable validation for all steps to allow progression to Corporate Onboarding
    return [];
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
    console.log('Form data:', data);
    // navigate('/admin/agent-admin');
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
                    console.log('onStepClick called with i:', i, 'currentStep:', currentStep);
                    // allow jumping back or staying on current step
                    if (i <= currentStep) {
                      console.log('Setting currentStep to:', i,currentStep);
                      setCurrentStep(i);
                    } else {
                      console.log('Not allowing jump forward to:', i);
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
                <Button type="button" variant="outline" disabled={currentStep === 0} onClick={handlePrevious}
                 className="w-24">
                Back
              </Button>
              {currentStep === 6 &&(
                <>
                  <Button type="submit" form="agent-admin-create-form" disabled={isSubmitting} className="w-24">
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </Button>
                </>
              )}
               {currentStep !== 7 &&(
                <Button variant="secondary" type="button" onClick={handleNext} className="w-24">
                  Next
                </Button>
               )}
              
            </div> 
          </div>
          <hr className="border-gray-300 mb-2"/>
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

