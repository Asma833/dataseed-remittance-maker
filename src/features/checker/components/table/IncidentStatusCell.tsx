import { Order } from '../../types/updateIncident.types';

const IncidentStatusCell = ({ rowData }: { rowData: Order }) => {
  return (
    <span>
      {!rowData.incident_status ? (
        <span className="status-badge pending">Pending</span>
      ) : rowData.incident_status === 'pending' ? (
        <span className="status-badge pending">Pending</span>
      ) : rowData.incident_status === 'approved' ? (
        <span className="status-badge approved">Approved</span>
      ) : (
        <span className="status-badge rejected">Rejected</span>
      )}
    </span>
  );
};

export default IncidentStatusCell;
