import React, { useState } from 'react';
import { DataTable, TableData, TableColumn, staticConfig, ActionButtons } from '@/components/table';
import { TableTitle } from '@/features/auth/components/table-title';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

interface MarginData {
  currency: string;
  cardBuy: string;
  cardSell: string;
  currencyBuy: string;
  currencySell: string;
  ttMargin: string;
}

const sampleData: MarginData[] = [
  {
    currency: 'USD',
    cardBuy: '83.50',
    cardSell: '84.50',
    currencyBuy: '83.00',
    currencySell: '85.00',
    ttMargin: '0.50',
  },
  {
    currency: 'EUR',
    cardBuy: '90.00',
    cardSell: '91.00',
    currencyBuy: '89.50',
    currencySell: '91.50',
    ttMargin: '0.50',
  },
];

export const RateMarginStep: React.FC = () => {
  const [data, setData] = useState<MarginData[]>(sampleData);

  const handleEdit = (row: MarginData) => {
    // Placeholder for edit functionality
    console.log('Edit margin for', row.currency);
    // TODO: Implement edit dialog or inline editing
  };

  const columns: TableColumn<MarginData>[] = [
    {
      id: 'currency',
      accessorKey: 'currency',
      header: 'Currency',
    },
    {
      id: 'cardBuy',
      accessorKey: 'cardBuy',
      header: 'Card Buy',
    },
    {
      id: 'cardSell',
      accessorKey: 'cardSell',
      header: 'Card Sell',
    },
    {
      id: 'currencyBuy',
      accessorKey: 'currencyBuy',
      header: 'Currency Buy',
    },
    {
      id: 'currencySell',
      accessorKey: 'currencySell',
      header: 'Currency Sell',
    },
    {
      id: 'ttMargin',
      accessorKey: 'ttMargin',
      header: 'TT Margin',
    },
    {
        id: 'action',
        header: 'Action',
        cell: ({ row }) => <ActionButtons row={row}  onEdit={handleEdit} />,
        sortable: false,
        filterable: false,
        meta: {
          headerAlign: 'center',
          cellAlign: 'center',
        },
    },
  ];

  const tableData: TableData<MarginData> = {
    data,
    totalCount: data.length,
    currentPage: 1,
  };

  return (
    <div className="space-y-6">
      <TableTitle title="Margin Details" />
      <DataTable
        columns={columns}
        data={tableData}
        {...staticConfig}
      />
    </div>
  );
};