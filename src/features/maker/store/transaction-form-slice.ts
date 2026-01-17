import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TransactionFormState {
  fx_currency: string;
  fx_amount: number;
  company_settlement_rate: number;
  add_margin: number;
  customer_rate: number;
  applicant_pan_number: string;
  source_of_funds: string;
  purpose: string;
  nostro_charges: string;
}

const initialState: TransactionFormState = {
  fx_currency: '',
  fx_amount: 0,
  company_settlement_rate: 0,
  add_margin: 0,
  customer_rate: 0,
  applicant_pan_number: '',
  source_of_funds: '',
  purpose: '',
  nostro_charges: '',
};

const transactionFormSlice = createSlice({
  name: 'transactionForm',
  initialState,
  reducers: {
    updateTransactionField: (state, action: PayloadAction<Partial<TransactionFormState>>) => {
      return { ...state, ...action.payload };
    },
    resetTransactionForm: () => initialState,
  },
});

export const { updateTransactionField, resetTransactionForm } = transactionFormSlice.actions;
export default transactionFormSlice.reducer;
