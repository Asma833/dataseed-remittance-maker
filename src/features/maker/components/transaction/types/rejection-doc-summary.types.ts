export type VerificationStatus = 'REJECTED' | 'APPROVED' | 'PENDING' | (string & {});

export interface VerificationHistory {
  rejected_by: string;
  rejection_reason: string;
  remarks: string | null;
  created_at: string;
}

export interface VerificationDocument {
  id: string;
  document_id: string;
  document_name: string;
  verification_status: VerificationStatus;
  history: VerificationHistory[];
}

export interface RejectionSummaryResponse {
  transaction_id: string;
  documents: VerificationDocument[];
}

export interface RejectionTableProps {
  transactionId?: string;
  flattenedRejectionResData: FlattenedDocumentItem[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
}
// Local types to satisfy diagnostics
export interface HistoryItem {
  rejected_by?: string;
  rejection_reason?: string;
  remarks?: string;
  created_at?: string;
}

export interface DocumentItem {
  document_id: string;
  document_name: string;
  history?: HistoryItem[];
}
export interface FlattenedDocumentItem extends HistoryItem {
  document_id: string;
  document_name: string;
}
