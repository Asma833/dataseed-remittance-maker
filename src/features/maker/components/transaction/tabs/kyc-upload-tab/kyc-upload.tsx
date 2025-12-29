import { useMemo, useState } from 'react';
import KYCTable from './table/kyc-table';
import KYCForm from './form/kyc-form';
import RejectionTable from './table/rejection-table';
import { DealsResponseTransaction } from '../../types/transaction.types';
import { DocumentItem, HistoryItem } from '../../types/rejection-doc-summary.types';
import { useRejectionSummary } from '@/features/maker/hooks/useRejectionSummary';
import { TransactionStatusEnum } from '@/types/enums';

const KYCUpload = () => {
  const [showForm, setShowForm] = useState(false);
  const [isReupload, setIsReupload] = useState(false);
  const [transaction, setTransaction] = useState<DealsResponseTransaction>();

  // const dummyTransaction = {
  //   ...transaction,
  //   transaction_status: 'REJECTED',
  // };

  const isRejected = transaction?.transaction_status === TransactionStatusEnum.REJECTED;
  const { data: rejectionSumData, isLoading, isError, error } = useRejectionSummary(transaction?.id);

  // Flattening function - memoized to prevent infinite loop
  const flattenedRejectionResData = useMemo(() => {
    return rejectionSumData?.documents?.flatMap((doc: DocumentItem) => {
      return (doc.history ?? []).map((hist: HistoryItem) => ({
        key: `${doc.document_id}-${hist.created_at}`,
        document_id: doc.document_id,
        document_name: doc.document_name,
        rejected_by: hist.rejected_by,
        rejection_reason: hist.rejection_reason,
        remarks: hist.remarks,
        rejection_date: hist.created_at,
      }));
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
            rejectedDocuments={flattenedRejectionResData ?? []}
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
