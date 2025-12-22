import { EBIXOrderIDProps } from '@/types/common/updateIncident.types';
import { cn } from '@/utils/cn';

const EBIXOrderID = ({ rowData, openModal, className = '' }: EBIXOrderIDProps) => {
  const handleOpenModal = () => {
    if (openModal) {
      openModal(rowData);
    }
  };
  return (
    <button
      className={cn(
        'w-full text-primary cursor-pointer flex items-center justify-center gap-1 disabled:opacity-50',
        openModal ? 'underline' : '',
        className
      )}
      onClick={handleOpenModal}
    >
      {rowData.EBIX_order_id}
    </button>
  );
};

export default EBIXOrderID;
