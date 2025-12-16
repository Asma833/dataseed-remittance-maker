import _ from 'lodash';
import { Order } from '../types/updateIncident.types';

const KycStatusCell = ({ rowData }: { rowData: Order }) => {
  return (
    <span>
      {rowData.kyc_status ? (
        <span className={`status-badge esign-${rowData.kyc_status.toLowerCase().replace(/\s+/g, '-')}`}>
          {rowData.kyc_status === 'N/A'
            ? 'N/A'
            : rowData.kyc_status === 'in_progress'
              ? 'In Progress'
              : _.capitalize(rowData.kyc_status)}
        </span>
      ) : (
        <span className="status-badge na text-nowrap">Not Required</span>
      )}
    </span>
  );
};

export default KycStatusCell;
