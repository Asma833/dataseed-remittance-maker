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
  isViewOnly?: boolean;
  paymentData?: PaymentData;
  dealBookingId?: string;
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
    type?: string;
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

export interface DealDetailsApiResponse {
  currencyDetails: {
    fx_currency: string;
    fx_amount: number;
    settlement_rate: number;
    add_margin: number;
    customer_rate: number;
    declared_education_loan_amount?: string;
    previous_transaction_amount?: string;
    declared_previous_amount?: string;
    total_transaction_amount_tcs?: string;
    invoiceRateTable: {
      transaction_value: {
        company_rate: string;
        agent_mark_up: string;
        rate: string;
      };
      remittance_charges: {
        company_rate: string;
        agent_mark_up: string;
        rate: number;
      };
      nostro_charges: {
        company_rate: string;
        agent_mark_up: string;
        rate: number;
        type?: string;
      };
      other_charges: {
        company_rate: string;
        agent_mark_up: string;
        rate: number;
      };
      transaction_amount: string;
      gst_amount: string;
      total_inr_amount: string;
      tcs: string;
    };
  };
  beneficiaryDetails: {
    beneficiary_name: string;
    beneficiary_address: string;
    beneficiary_city: string;
    beneficiary_country: string;
    beneficiary_account_number_iban_number: string;
    beneficiary_swift_code: string;
    beneficiary_bank_name: string;
    beneficiary_bank_address: string;
    sort_bsb_aba_transit_code: string;
    message_to_beneficiary_additional_information: string;
    student_name?: string;
    student_passport_number?: string;
    university_name?: string;
    intermediaryBankDetails?: string;
    intermediary_bank_account_number?: string | null;
    intermediary_bank_swift_code?: string | null;
    intermediary_bank_name?: string | null;
    intermediary_bank_address?: string | null;
  };
  transactionDetails: {
    company_reference_number: string;
    agent_reference_number: string;
    order_date: string;
    order_expiry: string;
    transaction_type: string;
    purpose: string;
    transaction_purpose_map_id: string;
    fx_currency: string;
    fx_amount: number;
    company_settlement_rate: number;
    add_margin: number;
    customer_rate: number;
    nostro_charges?: string;
    applicant_name: string;
    applicant_pan_number: string;
    applicant_email: string;
    applicant_mobile_number: string;
    source_of_funds: string;
    paid_by: string;
    payee_name: string;
    payee_pan_number: string;
    applicant_id_document: string;
    passport_number: string;
    passport_issue_date?: string;
    passport_expiry_date?: string;
    place_of_issue: string;
    applicant_address: string;
    applicant_city: string;
    applicant_state: string;
    applicant_country: string;
    postal_code: string;
  };
  paymentDetails: {
    payment_method: string;
  };
  transaction?: {
    transaction_id: string;
  };
}
