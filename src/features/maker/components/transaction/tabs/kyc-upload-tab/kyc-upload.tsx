import { useState } from "react";
import KYCTable from "./table/kyc-table";
import KYCForm from "./form/kyc-form";

const KYCUpload = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {showForm ? (
        <KYCForm onFormSubmit={() => setShowForm(false)} />
      ) : (
        <KYCTable onUploadClick={() => setShowForm(true)} />
      )}
    </>
  );
};

export default KYCUpload;
