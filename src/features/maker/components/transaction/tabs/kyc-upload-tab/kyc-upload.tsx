import { useState } from 'react';
import KYCTable from './table/kyc-table';
import KYCForm from './form/kyc-form';
import RejectionTable from './table/rejection-table';

const KYCUpload = () => {
  const [showForm, setShowForm] = useState(false);
  const [isReupload, setIsReupload] = useState(false);
  const [transaction, setTransaction] = useState<any>(null);

  const handleUploadClick = (reupload: boolean, transaction: any) => {
    setIsReupload(reupload);
    setTransaction(transaction);
    setShowForm(true);
  };

  return (
    <>
      {showForm ? (
        <>
          <KYCForm onFormSubmit={() => setShowForm(false)} onCancel={() => setShowForm(false)} transaction={transaction} />
          {isReupload && <RejectionTable />}
        </>
      ) : (
        <KYCTable onUploadClick={handleUploadClick} />
      )}
    </>
  );
};

export default KYCUpload;
