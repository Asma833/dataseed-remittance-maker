import { useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import KYCTable from './table/kyc-table';
import KYCForm from './form/kyc-form';
import RejectionTable from './table/rejection-table';
import { DealsResponseTransaction } from '../../types/transaction.types';
import { FlattenedDocumentItem } from '../../types/rejection-doc-summary.types';
import { useRejectionSummary } from '../../hooks/useRejectionSummary';
import { TransactionStatusEnum, KYCStatusEnum } from '@/types/enums';
import { RejectedDocument, RejectionHistoryItem } from '../../api/rejectionSummaryApi';

const KYCUpload = () => {
  const [showForm, setShowForm] = useState(false);
  const [isReupload, setIsReupload] = useState(false);
  const [transaction, setTransaction] = useState<DealsResponseTransaction>();
  const isRejected =
    isReupload ||
    transaction?.transaction_status === TransactionStatusEnum.REJECTED ||
    transaction?.kyc_status === KYCStatusEnum.REJECTED;
  const { data: rejectionSumData, isLoading, isError, error } = useRejectionSummary(transaction?.id);

  // Flattening function - memoized to prevent infinite loop
  const flattenedRejectionResData = useMemo((): FlattenedDocumentItem[] => {
    if (!rejectionSumData?.documents) return [];

    return rejectionSumData.documents.flatMap((doc: RejectedDocument) => {
      return (doc.history ?? []).map((hist: RejectionHistoryItem): FlattenedDocumentItem => {
        const item: FlattenedDocumentItem = {
          document_id: doc.document_id,
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


  const location = useLocation();

  const handleUploadClick = (reupload: boolean, transaction: DealsResponseTransaction) => {
    setIsReupload(reupload);
    setTransaction(transaction);
    setShowForm(true);
  };

  useEffect(() => {
    if (location.state?.transaction) {
      setTransaction(location.state.transaction);
      setShowForm(true);
      // Clear state to prevent reopening on generic re-renders (optional, but good practice if using replace)
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);


  return (
    <>
      {showForm ? (
        <>
          <KYCForm
            transaction={transaction ?? ({} as DealsResponseTransaction)}
            onCancel={() => setShowForm(false)}
            onSuccess={() => setTransaction((prev) => (prev ? { ...prev, kyc_status: KYCStatusEnum.UPLOADED } : prev))}
            rejectedDocuments={flattenedRejectionResData}
            isRejected={isRejected}
          />
          {transaction?.id && (
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
