import { Order } from '../../types/updateIncident.type';

const DocVerificationStatusCell = ({ rowData }: { rowData: Order }) => {
  return (
    <span>
      {rowData.is_esign_required ? (
        rowData.v_kyc_status && (
          <span
            className={`status-badge esign-${rowData.v_kyc_status.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {rowData.v_kyc_status}
          </span>
        )
      ) : (
        <span>NA</span>
      )}
    </span>
  );
};

export default DocVerificationStatusCell;
