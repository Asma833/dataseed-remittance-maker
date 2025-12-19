import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { RateTableColumn } from '../transaction/tabs/create-transactions-tab/create-transaction-form/types/rateTable.types';
import { GetRateTableColumns } from './rate-table-columns';
import { cn } from '@/utils/cn';
import { useFormContext } from 'react-hook-form';
import { useEffect, useRef } from 'react';

type ColumnKey = 'invoiceName' | 'niumRate' | 'agentMarkUp' | 'rate';

const columnKeys: Record<ColumnKey, { label: string; className?: string }> = {
  invoiceName: { label: 'Particulars', className: 'text-left' },
  niumRate: { label: 'Rate' },
  agentMarkUp: { label: 'Agent Mark Up' },
  rate: { label: 'Amount' },
};

export default function RateTable({
  id,
  mode = 'edit',
  editableFields = [] as string[],
  totalAmount,
  invoiceData,
}: {
  id: string;
  mode?: 'edit' | 'view';
  editableFields?: string[];
  totalAmount?: number;
  invoiceData?: any;
}) {
  const { setValue } = useFormContext();
  const prevInvoiceDataRef = useRef<any>(null);

  // Reset form values when invoiceData changes
  useEffect(() => {
    if (invoiceData && JSON.stringify(invoiceData) !== JSON.stringify(prevInvoiceDataRef.current)) {
      prevInvoiceDataRef.current = invoiceData;

      // Map the data structure to match the form field names
      const fieldMappings: Record<string, string> = {
        transaction_value: 'transactionValue',
        remittance_charges: 'remittanceCharges',
        nostro_charges: 'nostroCharges',
        other_charges: 'otherCharges',
        transaction_amount: 'transactionAmount',
        gst_amount: 'gstAmount',
        total_inr_amount: 'totalInrAmount',
        tcs: 'tcs',
      };

      const valueMappings: Record<string, string> = {
        company_rate: 'niumRate',
        agent_mark_up: 'agentMarkUp',
        rate: 'rate',
      };

      Object.keys(invoiceData).forEach((section) => {
        const sectionData = invoiceData[section];
        const mappedSection = fieldMappings[section] || section;
        if (typeof sectionData === 'object' && sectionData !== null) {
          Object.keys(sectionData).forEach((field) => {
            const value = sectionData[field];
            const mappedField = valueMappings[field] || field;
            setValue(`${id}.${mappedSection}.${mappedField}`, value, { shouldValidate: false, shouldDirty: false });
          });
        } else {
          setValue(`${id}.${mappedSection}`, sectionData, { shouldValidate: false, shouldDirty: false });
        }
      });
    }
  }, [invoiceData, id, setValue]);

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
