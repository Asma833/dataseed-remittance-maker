import { useState } from 'react';
import KYCTable from './table/kyc-table';
import KYCForm from './form/kyc-form';
import RejectionTable from './table/rejection-table';

const KYCUpload = () => {
  const [showForm, setShowForm] = useState(false);
  const [isReupload, setIsReupload] = useState(false);
  const [transaction, setTransaction] = useState<any>(undefined);

  const handleUploadClick = (reupload: boolean, transaction: any) => {
    setIsReupload(reupload);
    setTransaction(transaction);
    setShowForm(true);
  };

  return (
    <>
      {showForm ? (
        <>
          <KYCForm
            transaction={transaction}
            onFormSubmit={() => setShowForm(false)}
            onCancel={() => setShowForm(false)}
          />
          {isReupload && transaction?.transaction_purpose_map_id && (
            <RejectionTable transactionId={transaction.id} />
          )}
        </>
      ) : (
        <KYCTable onUploadClick={handleUploadClick} />
      )}
    </>
  );
};

export default KYCUpload;
