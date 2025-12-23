// Types for TCS Calculation
export type TCSCalculationPayload = {
  purpose: string;
  panNumber: string;
  sourceofFund: string;
  declarationAmt: string;
  txnAmount: string;
};

export type TCSCalculationResponse = {
  statuscode: string;
  responsecode: string;
  responsemessage: string;
  TCS: string;
};
// Types for GST Calculation
export type GSTCalculationPayload = {
  txnAmount: string;
};

export type GSTCalculationResponse = {
  statuscode: string;
  responsecode: string;
  responsemessage: string;
  GST: string;
};
