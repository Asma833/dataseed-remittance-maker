import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import GetRateTableColumns, { columnKeys, ColumnKey } from './rate-table-columns';
import { cn } from '@/utils/cn';
import { useFormContext } from 'react-hook-form';

export default function RateTable({
  id,
  mode = 'edit',
  editableFields = [] as string[],
  totalAmount,
}: {
  id: string;
  mode?: 'edit' | 'view';
  editableFields?: string[];
  totalAmount?: number;
}) {
  const { setValue } = useFormContext();
  const invoices = GetRateTableColumns({ id, mode, editableFields, setValue });

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
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            {Object.keys(columnKeys).map((key) => (
              <TableCell key={key} className={cn('text-right pb-5', columnKeys[key as ColumnKey]?.className)}>
                {invoice.cells?.[key as ColumnKey]?.()}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow className="bg-gray-50/50">
          <TableCell colSpan={3}>Total Payable Amount</TableCell>
          <TableCell className="text-right">{totalAmount}</TableCell>
        </TableRow>
        <TableRow className="bg-gray-50/50">
          <TableCell colSpan={3}>Beneficiary Amount (In Fx Value)</TableCell>
          <TableCell className="text-right">{totalAmount}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
