import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';
import { BankAccount } from '../steps/FinanceDetailsStep';

interface Column {
  key: string;
  label: string;
}

interface GenericTableProps<T> {
  data: T[];
  columns: Column[];
  renderActions?: (item: T) => React.ReactNode;
  emptyMessage?: string;
}

interface BankTableProps {
  bankAccounts: BankAccount[];
  onEdit: (bank: BankAccount) => void;
  onDelete: (id: string) => void;
}

export const GenericTable = <T extends Record<string, any>>({
  data,
  columns,
  renderActions,
  emptyMessage = 'No data available.'
}: GenericTableProps<T>) => {
  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key}>{col.label}</TableHead>
            ))}
            {renderActions && <TableHead className="w-20">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              {columns.map((col) => (
                <TableCell key={col.key}>{item[col.key]}</TableCell>
              ))}
              {renderActions && (
                <TableCell>
                  {renderActions(item)}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export const BankTable: React.FC<BankTableProps> = ({ bankAccounts, onEdit, onDelete }) => {
  const columns: Column[] = [
    { key: 'bankName', label: 'Bank Name' },
    { key: 'branchName', label: 'Branch Name' },
    { key: 'accountHolder', label: 'Account Holder' },
    { key: 'accountNumber', label: 'Account Number' },
    { key: 'ifscCode', label: 'IFSC Code' },
  ];

  const renderActions = (bank: BankAccount) => (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onEdit(bank)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(bank.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <GenericTable
      data={bankAccounts}
      columns={columns}
      renderActions={renderActions}
      emptyMessage="No bank accounts added yet. Click 'Add Bank' to add your first account."
    />
  );
};