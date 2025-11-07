import { useState } from 'react';
import { FieldValues, FormProvider } from 'react-hook-form';
import { kycDetailsSchema } from './sections/kyc-details/kyc-details.schema';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateRateTablePdf } from '@/utils/pdfUtils';
import BookTransaction from './sections/book-transaction/book-transaction';
import KycDetails from './sections/kyc-details/kyc-details';
import SourceOfEducation from './sections/source-of-funds/source-of-education';
import RateTable from '@/features/maker/components/rate-table/rate-table';
import { GenericDialog } from '@/components/ui/generic-dialog';
import { Button } from '@/components/ui/button';
import Payments from '@/components/payments/Payments';
import { useDealBooking } from '@/features/maker/hooks/useDealBooking';
import { useCurrentUser } from '@/utils/getUserFromRedux';
import { toast } from 'sonner';
import useGetPurposes from '@/hooks/useGetPurposes';

const defaultValues = {
  purpose: '',
  fxCurrency: '',
  fxAmount: '',
  companySettlementRate: '',
  addMargins: '',
  customerRate: '',
  nostroCharges: '',
  applicantName: '',
  applicantPanNumber: '',
  applicantDob: '',
  applicantEmail: '',
  applicantMobileNumber: '',
  sourceOfFunds: '',
  paidBy: '',
  payeeNameAsPerPan: '',
  payeePanNumber: '',
  payeeDobAsPerPan: '',
  declaredEducationLoanAmount: '',
  niumPreviousTransactionAmount: '',
  declarePreviousAmountByOtherAd: '',
  totalTransactionAmountTcs: '',
  invoiceRateTable: {
    transactionValue: {
      niumRate: undefined,
      agentMarkUp: undefined,
      rate: undefined,
    },
    remittanceCharges: {
      niumRate: '',
      agentMarkUp: '',
      rate: '',
    },
    nostroCharges: {
      niumRate: '',
      agentMarkUp: '',
      rate: '',
    },
    otherCharges: {
      niumRate: '',
      agentMarkUp: '',
      rate: '',
    },
    transactionAmount: {
      rate: '',
    },
    gstAmount: {
      rate: '',
    },
    totalInrAmount: {
      rate: '',
    },
    tcs: {
      rate: '',
    },
  },
};



const DealBooking = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getUserId } = useCurrentUser();
  const dealBookingMutation = useDealBooking();

  const methods = useForm({
    resolver: zodResolver(kycDetailsSchema),
    mode: 'onChange',
    defaultValues: defaultValues,
  });
  const {
    control,
    reset,
    watch,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = methods;
  const purpose = watch('purpose');
  const { purposeTypes } = useGetPurposes();
  const purposeLabel = purposeTypes?.find(p => p.id === purpose)?.text || '';
  console.log(purposeLabel, "purposeLabel=====================")
  const totalInr = watch('invoiceRateTable.totalInrAmount.rate');
  const tcsRate = watch('invoiceRateTable.tcs.rate');
  const totalPayable = parseFloat(totalInr || '0') + parseFloat(tcsRate || '0');

  const onSubmit = async (formData: FieldValues) => {
    const createdBy = getUserId() || ''; 
    const dealCode = `DEAL-${Date.now()}`;

    const payload = {
      customer_name: formData.applicantName || '',
      currency_code: formData.fxCurrency || '',
      deal_amount: formData.fxAmount || '0',
      margin_amount: formData.addMargins || '0',
      deal_code: dealCode,
      created_by: createdBy,
      transaction_type: 'REMITTANCE',
      payment_status: 'PENDING',
      kyc_status: 'PENDING',
      status: 'DRAFT',
      fx_currency: 'INR',
      settlement_rate: formData.companySettlementRate || '0',
      customer_rate: formData.customerRate || '0',
      applicant_email: formData.applicantEmail || '',
      applicant_mobile: formData.applicantMobileNumber || '',
      applicant_pan: formData.applicantPanNumber || '',
      applicant_dob: formData.applicantDob || '',
      purpose: formData.purpose || '',
      payee_name: formData.payeeNameAsPerPan || '',
      payee_pan: formData.payeePanNumber || '',
      payee_dob: formData.payeeDobAsPerPan || '',
    };

    try {
      await dealBookingMutation.mutateAsync(payload);
      toast.success('Deal booked successfully!');
      // Optionally reset form or navigate
    } catch (error) {
      toast.error('Error booking deal. Please try again.');
    }
  };

  const handleValidateAll = handleSubmit(onSubmit);
  const handleCancel = () => {};
  const handleShareTransactionDetails = () => {
    const formData = getValues();
    const { invoiceRateTable } = formData;
    const pdfTable = {
      transactionValue: {
        niumRate: invoiceRateTable.transactionValue.niumRate ?? '',
        agentMarkUp: invoiceRateTable.transactionValue.agentMarkUp ?? '',
        rate: invoiceRateTable.transactionValue.rate ?? '',
      },
      remittanceCharges: {
        niumRate: invoiceRateTable.remittanceCharges.niumRate ?? '',
        agentMarkUp: invoiceRateTable.remittanceCharges.agentMarkUp ?? '',
        rate: invoiceRateTable.remittanceCharges.rate ?? '',
      },
      nostroCharges: {
        niumRate: invoiceRateTable.nostroCharges.niumRate ?? '',
        agentMarkUp: invoiceRateTable.nostroCharges.agentMarkUp ?? '',
        rate: invoiceRateTable.nostroCharges.rate ?? '',
      },
      otherCharges: {
        niumRate: invoiceRateTable.otherCharges.niumRate ?? '',
        agentMarkUp: invoiceRateTable.otherCharges.agentMarkUp ?? '',
        rate: invoiceRateTable.otherCharges.rate ?? '',
      },
      transactionAmount: {
        rate: invoiceRateTable.transactionAmount.rate ?? '',
      },
      gstAmount: {
        rate: invoiceRateTable.gstAmount.rate ?? '',
      },
      totalInrAmount: {
        rate: invoiceRateTable.totalInrAmount.rate ?? '',
      },
      tcs: {
        rate: invoiceRateTable.tcs.rate ?? '',
      },
    };
    generateRateTablePdf(pdfTable, totalPayable, 'transaction-details');
  };
  const handlePayment = () => {
    setIsModalOpen(true);
  };
  const handlePaymentSuccess = () => {};

  return (
    <div className="w-full px-2">
      <FormProvider {...methods}>
        <BookTransaction control={control} errors={errors} />
        <KycDetails control={control} errors={errors} />
      
        {purposeLabel === 'Education' && (
          <>
            <SourceOfEducation control={control} errors={errors}/>
          </>
        )}
       
       <div className="mt-16 flex flex-col items-center gap-10"> 
          <div className="flex justify-center gap-1 flex-wrap">
              <Button type="button" onClick={handleCancel} variant="light"> 
              Cancel 
            </Button>
            <Button type="button" onClick={handleValidateAll} variant="secondary" disabled={dealBookingMutation.isPending || isSubmitting}>
              {dealBookingMutation.isPending ? 'Booking...' : 'Confirm Booking'}
            </Button>
              <Button type="button" onClick={handleShareTransactionDetails} variant="secondary"> 
              Share Transaction Details PDF 
            </Button> 
              <Button type="button" onClick={handlePayment} variant="secondary"> 
              Payment 
            </Button>
          </div>
        </div>
      </FormProvider>
      <GenericDialog open={isModalOpen} onOpenChange={setIsModalOpen} title="Payment" contentClassName='md:w-[40vw]'>
        <Payments setIsOpen={setIsModalOpen} uploadScreen={true}/>
      </GenericDialog>
    </div>
  );
};

export default DealBooking;
