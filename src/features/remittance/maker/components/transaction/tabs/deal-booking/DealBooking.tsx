import { useState } from 'react';
import { FieldValues, FormProvider } from 'react-hook-form';
import FormFieldRow from '@/components/form/wrapper/FormFieldRow';
import { kycDetailsSchema } from './sections/kyc-details/kyc-details.schema';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import BookTransaction from './sections/book-transaction/BookTransaction';
import KycDetails from './sections/kyc-details/KycDetails';
import SourceOfEducation from './sections/source-of-funds/SourceOfEducation';
import { DialogWrapper } from '@/components/common/DialogWrapper';
import Payments from '@/features/admin/components/transaction/tabs/deal-booking/sections/payments/Payments';


const defaultValues = {
  transactionType: '',
  purpose: '',
  fxCurrency: '',
  fxAmount: '',
  niumSettlementRate: '',
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
};



const DealBooking = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const methods = useForm({
    resolver: zodResolver(kycDetailsSchema),
    defaultValues: defaultValues,
  });
  const {
    control,
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;
  const sourceOfFunds = watch('sourceOfFunds');
  const handleValidateAll = handleSubmit(async (formdata: FieldValues) => {});
  const handleCancel = () => {};
  const handleShareTransactionDetails = () => {};
  const handlePayment = () => {
    setIsModalOpen(true);
  };
  const handlePaymentSuccess = () => {};

  return (
    <div className="w-full px-2">
      <FormProvider {...methods}>
        <BookTransaction control={control} errors={errors} />
        <KycDetails control={control} errors={errors} />
      
        {sourceOfFunds === 'education' && (
          <>
            <SourceOfEducation control={control} errors={errors}/>
          </>
        )}
       
       <div className="mt-16 flex flex-col items-center gap-10"> 
          <div className="flex justify-center gap-6 flex-wrap">
            <Button type="button" onClick={handleValidateAll} variant="contained" className="!capitalize w-64"> 
              Next 
            </Button> 
            <Button type="button" onClick={handlePaymentSuccess} variant="contained" className="!capitalize w-64"> 
              Confirm Booking 
            </Button> 
            <Button type="button" onClick={handleCancel} variant="contained" className="!capitalize w-64"> 
              Cancel 
            </Button> 
          </div>
          <div className="flex justify-center gap-6">
            <Button type="button" onClick={handleShareTransactionDetails} variant="contained" className="!capitalize w-64"> 
              Share Transaction Details PDF 
            </Button> 
            <Button type="button" onClick={handlePayment} variant="contained" className="!capitalize w-64"> 
              Payment 
            </Button> 
          </div>
        </div>
      </FormProvider>
      {isModalOpen && (
        <DialogWrapper title="Payment" isOpen={isModalOpen} setIsOpen={setIsModalOpen} renderContent={<Payments setIsOpen={setIsModalOpen} uploadScreen={true}/>} />
      )}
    </div>
  );
};

export default DealBooking;
