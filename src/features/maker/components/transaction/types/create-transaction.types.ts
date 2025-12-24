import { AccordionState } from '../tabs/create-transactions-tab/create-transaction-form/types/createTransactionForm.types';
import { PaymentData } from './payment.types';

export type CreateTransactionRequest = {
  partner_order_id: string;
  transaction_type_id: string;
  is_e_sign_required: boolean;
  is_v_kyc_required: boolean;
  purpose_type_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_pan: string;
};

export type TransactionCreatedDialogProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  createdTransactionId: string;
  EBIXForexOrderId: string;
  isSubmitting?: boolean;
};

export type CommonCreateTransactionProps = {
  setAccordionState: (state: Partial<AccordionState>) => void;
  viewMode?: boolean;
  paymentData?: PaymentData;
};

export interface InvoiceRateTable {
  transaction_value: {
    company_rate?: number | string;
    agent_mark_up?: number | string;
    rate?: number | string;
  };
  remittance_charges: {
    company_rate?: string;
    agent_mark_up?: string;
    rate?: string;
  };
  nostro_charges: {
    company_rate?: string;
    agent_mark_up?: string;
    rate?: string;
  };
  other_charges: {
    company_rate?: string;
    agent_mark_up?: string;
    rate?: string;
  };
  transaction_amount: {
    rate?: string;
  };
  gst_amount: {
    rate?: string;
  };
  total_inr_amount: {
    rate?: string;
  };
  tcs: {
    rate?: string;
  };
}
