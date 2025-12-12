import { useState } from "react";
import KYCTable from "./table/kyc-table";
import KYCForm from "./form/kyc-form";
import RejectionTable from "./table/rejection-table";

const KYCUpload = () => {
  const [showForm, setShowForm] = useState(false);
  const [isReupload, setIsReupload] = useState(false);

  const handleUploadClick = (reupload: boolean) => {
    setIsReupload(reupload);
    setShowForm(true);
  };

  return (
    <>
      {showForm ? (
        <>
          <KYCForm onFormSubmit={() => setShowForm(false)} />
          {isReupload && <RejectionTable />}
        </>
      ) : (
        <KYCTable onUploadClick={handleUploadClick} />
      )}
    </>
  );
};

export default KYCUpload;
