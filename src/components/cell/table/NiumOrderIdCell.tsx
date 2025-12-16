import { NiumOrderIDProps } from '@/types/common/updateIncident.types';
import { cn } from '@/utils/cn';

const NiumOrderID = ({ rowData, openModal, className = '' }: NiumOrderIDProps) => {
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
      {rowData.nium_order_id}
    </button>
  );
};

export default NiumOrderID;
