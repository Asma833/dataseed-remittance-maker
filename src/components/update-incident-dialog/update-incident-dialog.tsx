import { DialogWrapper } from '@/components/common/dialog-wrapper';
import UpdateIncidentForm from '../update-incident/incident-form/update-incident-form';
import { UpdateIncidentDialogProps } from '@/types/common/updateIncident.types';
import { IncidentMode } from '@/types/enums';

const UpdateIncidentDialog = (props: UpdateIncidentDialogProps) => {
  const { pageId, mode, selectedRowData, isModalOpen, setIsModalOpen } = props;
  return (
    <DialogWrapper
      title={
        mode === IncidentMode.EDIT
          ? 'Update Incident'
          : mode === IncidentMode.EDIT_INVOICE
            ? 'Update Invoice Number'
            : 'View Incident'
      }
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      renderContent={
        <UpdateIncidentForm
          formActionRight="view"
          rowData={selectedRowData}
          pageId={pageId}
          mode={mode}
          setIsModalOpen={setIsModalOpen}
        />
      }
    />
  );
};

export default UpdateIncidentDialog;
