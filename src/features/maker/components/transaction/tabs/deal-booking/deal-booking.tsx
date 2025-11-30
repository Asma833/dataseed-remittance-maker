import { useState } from 'react';
import { FieldValues, FormProvider } from 'react-hook-form';

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

import { kycDetailsSchema } from './sections/kyc-details/kyc-details.schema';

const defaultValues = {
  company_reference_number:'',
  purpose: 'personal',
  fx_currency: 'USD',
  fx_amount: '',
  company_settlement_rate: '',
  add_margins: '',
  customer_rate: '',
  nostro_charges: '',
  applicant_name: 'John Doe',
  applicant_pan_number: 'ABCDE1234F',
  applicant_dob: '1990-01-01',
  applicant_email: '',
  applicant_mobile_number: '',
  source_of_funds: '',
  paid_by: '',
  payee_name_as_per_pan: '',
  payee_pan_number: '',
  payee_dob_as_per_pan: '',
  declared_education_loan_amount: '',
  previous_transaction_amount: '',
  declare_previous_amount_by_other_ad: '',
  total_transaction_amount_tcs: '',
  invoice_rate_table: {
    transaction_value: {
      company_rate: undefined,
      agent_mark_up: undefined,
      rate: undefined,
    },
    remittance_charges: {
      company_rate: '',
      agent_mark_up: '',
      rate: '',
    },
    nostro_charges: {
      company_rate: '',
      agent_mark_up: '',
      rate: '',
    },
    other_charges: {
      company_rate: '',
      agent_mark_up: '',
      rate: '',
    },
    transaction_amount: {
      rate: '',
    },
    gst_amount: {
      rate: '',
    },
    total_inr_amount: {
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
    mode: 'onSubmit',
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
  const totalInr = watch('invoice_rate_table.total_inr_amount.rate');
  const tcsRate = watch('invoice_rate_table.tcs.rate');
  const totalPayable = parseFloat(totalInr || '0') + parseFloat(tcsRate || '0');

  const onSubmit = async (formData: FieldValues) => {
    const createdBy = getUserId() || ''; 
    const dealCode = `DEAL-${Date.now()}`;

    const payload = {
      company_reference_number:formData.company_reference_number,
      customer_name: formData.applicant_name || '',
      currency_code: formData.fx_currency || '',
      deal_amount: formData.fx_amount || '0',
      margin_amount: formData.add_margins || '0',
      deal_code: dealCode,
      created_by: createdBy,
      transaction_type: 'REMITTANCE',
      payment_status: 'PENDING',
      kyc_status: 'PENDING',
      status: 'DRAFT',
      fx_currency: formData.fx_currency,
      settlement_rate: formData.company_settlement_rate || '0',
      customer_rate: formData.customer_rate || '0',
      applicant_email: formData.applicant_email || '',
      applicant_mobile: formData.applicant_mobile_number || '',
      applicant_pan: formData.applicant_pan_number || '',
      applicant_dob: formData.applicant_dob || '',
      purpose: formData.purpose || '',
      payee_name: formData.payee_name_as_per_pan || '',
      payee_pan: formData.payee_pan_number || '',
      payee_dob: formData.payee_dob_as_per_pan || '',
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
    const { invoice_rate_table } = formData;
    const pdfTable = {
      transactionValue: {
        niumRate: invoice_rate_table.transaction_value.company_rate ?? '',
        agentMarkUp: invoice_rate_table.transaction_value.agent_mark_up ?? '',
        rate: invoice_rate_table.transaction_value.rate ?? '',
      },
      remittanceCharges: {
        niumRate: invoice_rate_table.remittance_charges.company_rate ?? '',
        agentMarkUp: invoice_rate_table.remittance_charges.agent_mark_up ?? '',
        rate: invoice_rate_table.remittance_charges.rate ?? '',
      },
      nostroCharges: {
        niumRate: invoice_rate_table.nostro_charges.company_rate ?? '',
        agentMarkUp: invoice_rate_table.nostro_charges.agent_mark_up ?? '',
        rate: invoice_rate_table.nostro_charges.rate ?? '',
      },
      otherCharges: {
        niumRate: invoice_rate_table.other_charges.company_rate ?? '',
        agentMarkUp: invoice_rate_table.other_charges.agent_mark_up ?? '',
        rate: invoice_rate_table.other_charges.rate ?? '',
      },
      transactionAmount: {
        rate: invoice_rate_table.transaction_amount.rate ?? '',
      },
      gstAmount: {
        rate: invoice_rate_table.gst_amount.rate ?? '',
      },
      totalInrAmount: {
        rate: invoice_rate_table.total_inr_amount.rate ?? '',
      },
      tcs: {
        rate: invoice_rate_table.tcs.rate ?? '',
      },
    };
    //generateRateTablePdf(pdfTable, totalPayable, 'transaction-details');
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
