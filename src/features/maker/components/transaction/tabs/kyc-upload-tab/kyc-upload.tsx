import { useMemo, useState } from 'react';
import KYCTable from './table/kyc-table';
import KYCForm from './form/kyc-form';
import RejectionTable from './table/rejection-table';
import { DealsResponseTransaction } from '../../types/transaction.types';
import { RejectedDocument, RejectionHistoryItem } from '../../api/rejectionSummaryApi';
import { FlattenedDocumentItem } from '../../types/rejection-doc-summary.types';

import { TransactionTypeEnum } from '@/types/enums';
import { useRejectionSummary } from '../../hooks/useRejectionSummary';

const KYCUpload = () => {
  const [showForm, setShowForm] = useState(false);
  const [transaction, setTransaction] = useState<DealsResponseTransaction>();
  const isRejected = transaction?.transaction_status === TransactionTypeEnum.REJECTED;
  const { data: rejectionSumData } = useRejectionSummary(transaction?.id);

  // Flattening function - memoized to prevent infinite loop
  const flattenedRejectionResData = useMemo(() => {
    return rejectionSumData?.documents?.flatMap((doc: RejectedDocument) => {
      return (doc.history ?? []).map((hist: RejectionHistoryItem) => {
        const flattened: FlattenedDocumentItem & { key: string; rejection_date?: string } = {
          key: `${doc.id}-${hist.created_at}`,
          document_id: doc.id,
          document_name: doc.document_name,
        };
        
        // Only add properties if they exist to satisfy exactOptionalPropertyTypes
        if (hist.rejected_by) flattened.rejected_by = hist.rejected_by;
        if (hist.rejection_reason) flattened.rejection_reason = hist.rejection_reason;
        if (hist.remarks) flattened.remarks = hist.remarks;
        if (hist.created_at) flattened.rejection_date = hist.created_at;
        
        return flattened;
      });
    });
  }, [rejectionSumData]);

  const handleUploadClick = (reupload: boolean, transaction: DealsResponseTransaction) => {
    setTransaction(transaction);
    setShowForm(true);
  };

  return (
    <>
      {showForm ? (
        <>
          <KYCForm
            transaction={transaction ?? ({} as DealsResponseTransaction)}
            onFormSubmit={() => setShowForm(false)}
            onCancel={() => setShowForm(false)}
            rejectedDocuments={flattenedRejectionResData ?? []}
            isRejected={isRejected}
          />
          {isRejected && transaction?.id && (
            <RejectionTable
              transactionId={transaction.id}
            />
          )}
        </>
      ) : (
        <KYCTable onUploadClick={handleUploadClick} />
      )}
    </>
  );
};

export default KYCUpload;
