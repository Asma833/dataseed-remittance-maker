import { Dispatch, SetStateAction } from 'react';

interface PaymentsProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  uploadScreen: boolean;
}

const Payments = ({ setIsOpen, uploadScreen }: PaymentsProps) => {
  return (
    <div>
      {uploadScreen ? 'Payment Screen' : 'Upload Payment Screenshot'}
      <button onClick={() => setIsOpen(false)}>Close</button>
    </div>
  );
};

export default Payments;