import { useMemo, useState } from 'react';
import KYCTable from './table/kyc-table';
import KYCForm from './form/kyc-form';
import RejectionTable from './table/rejection-table';
import { DealsResponseTransaction } from '../../types/transaction.types';
import { FlattenedDocumentItem } from '../../types/rejection-doc-summary.types';
import { useRejectionSummary } from '../../hooks/useRejectionSummary';
import { TransactionStatusEnum } from '@/types/enums';
import { RejectedDocument, RejectionHistoryItem } from '../../api/rejectionSummaryApi';

const KYCUpload = () => {
  const [showForm, setShowForm] = useState(false);
  const [isReupload, setIsReupload] = useState(false);
  const [transaction, setTransaction] = useState<DealsResponseTransaction>();
  const isRejected = transaction?.transaction_status === TransactionStatusEnum.REJECTED;
  const { data: rejectionSumData, isLoading, isError, error } = useRejectionSummary(transaction?.id);

  // Flattening function - memoized to prevent infinite loop
  const flattenedRejectionResData = useMemo((): FlattenedDocumentItem[] => {
    if (!rejectionSumData?.documents) return [];
    
    return rejectionSumData.documents.flatMap((doc: RejectedDocument) => {
      return (doc.history ?? []).map((hist: RejectionHistoryItem): FlattenedDocumentItem => {
        const item: FlattenedDocumentItem = {
          document_id: doc.id,
          document_name: doc.document_name,
          rejected_by: hist.rejected_by,
          rejection_reason: hist.rejection_reason,
          created_at: hist.created_at,
        };
        
        // Only add remarks if it exists to avoid undefined assignment
        if (hist.remarks !== undefined) {
          item.remarks = hist.remarks;
        }
        
        return item;
      });
    });
  }, [rejectionSumData]);

  const handleUploadClick = (reupload: boolean, transaction: DealsResponseTransaction) => {
    setIsReupload(reupload);
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
            rejectedDocuments={flattenedRejectionResData}
            isRejected={isRejected}
          />
          {isRejected && transaction?.id && (
            <RejectionTable
              transactionId={transaction.id}
              isLoading={isLoading}
              isError={isError}
              error={error}
              flattenedRejectionResData={flattenedRejectionResData}
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
