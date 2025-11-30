import _ from 'lodash';

const PaymentStatusCell = ({ rowData }: { rowData: any }) => {
  return (
    <span>
         {
           rowData.payment_status ?(
             <span className={`status-badge esign-${rowData.payment_status.toLowerCase().replace(/\s+/g, '-')}`}>
               {rowData.payment_status === 'N/A'
                 ? 'N/A'
                 : rowData.payment_status === 'in_progress'
                   ? 'In Progress'
                   : _.capitalize(rowData.payment_status)}
             </span>
           )
         : (
           <span className="status-badge na text-nowrap">Not Required</span>
         )}
       </span>
  )
}

export default PaymentStatusCell