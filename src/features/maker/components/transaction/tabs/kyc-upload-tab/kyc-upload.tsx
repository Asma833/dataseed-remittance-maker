import { useState } from 'react';
import KYCTable from './table/kyc-table';
import KYCForm from './form/kyc-form';
import RejectionTable from './table/rejection-table';
import { DealsResponse } from '../../types/transaction.types';

const KYCUpload = () => {
  const [showForm, setShowForm] = useState(false);
  const [isReupload, setIsReupload] = useState(false);
  const [transaction, setTransaction] = useState<any>();

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
          {isReupload && transaction?.id && <RejectionTable transactionId={transaction.id} />}
        </>
      ) : (
        <KYCTable onUploadClick={handleUploadClick} />
      )}
    </>
  );
};

export default KYCUpload;
