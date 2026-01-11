import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { RateTableColumn } from '../transaction/tabs/create-transactions-tab/create-transaction-form/types/rateTable.types';
import { GetRateTableColumns } from './rate-table-columns';
import { cn } from '@/utils/cn';
import { formatINR } from '@/utils/form-helpers';

type ColumnKey = 'invoiceName' | 'companyRate' | 'agentMarkUp' | 'rate';

const columnKeys: Record<ColumnKey, { label: string; className?: string }> = {
  invoiceName: { label: 'Particulars', className: 'text-left' },
  companyRate: { label: 'Rate', className: 'text-center' },
  agentMarkUp: { label: 'Add Margin', className: 'text-center' },
  rate: { label: 'Amount', className: 'text-right' },
};

export default function RateTable({
  id,
  mode = 'edit',
  editableFields = [] as string[],
  totalAmount,
  beneficiaryAmount,
  invoiceData,
}: {
  id: string;
  mode?: 'edit' | 'view';
  editableFields?: string[];
  totalAmount?: number;
  beneficiaryAmount?: number;
  invoiceData?: any;
}) {



  // Update rate calculation when companySettlementRate or addMargin changes


  const invoices = GetRateTableColumns({ id, mode, editableFields, invoiceData });

  return (
    <Table>
      <TableHeader className="bg-[#9e9e9e]">
        <TableRow>
          {Object.entries(columnKeys).map(([key, value]) => (
            <TableHead key={key} className={cn('text-white text-right', value?.className)}>
              {value?.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice: Partial<RateTableColumn>) => (
          <TableRow key={invoice.id}>
            {Object.keys(columnKeys).map((key) => (
              <TableCell key={key} className={cn('text-right', columnKeys[key as ColumnKey]?.className)}>
                {invoice.cells?.[key as ColumnKey]?.()}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow className="bg-gray-50/50">
          <TableCell colSpan={3}>Total Payable Amount</TableCell>
          <TableCell className="text-right">{formatINR(totalAmount)}</TableCell>
        </TableRow>
        <TableRow className="bg-gray-50/50">
          <TableCell colSpan={3}>Beneficiary Amount (In Fx Value)</TableCell>
          <TableCell className="text-right">{Number(beneficiaryAmount || 0).toFixed(2)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
