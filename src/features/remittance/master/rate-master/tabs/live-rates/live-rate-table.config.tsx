
import { TableColumn } from '@/components/table';
import type { LiveRateData } from './types';

export const LiveRateTableColumnConfig = (): TableColumn<LiveRateData>[] => {
  return [
    {
      id: 'currency',
      header: 'Currency',
      accessorKey: 'currency',
      sortable: true,
      filterable: true,
      meta: { headerAlign: 'left', cellAlign: 'left' },
    },
    {
      id: 'remittanceRate',
      header: 'Remittance Rate',
      accessorKey: 'remittanceRate',
      sortable: true,
      filterable: true,
      meta: { headerAlign: 'right', cellAlign: 'right' },
    },
    {
      id: 'currencyRate',
      header: 'Currency Rate',
      accessorKey: 'currencyRate',
      sortable: true,
      filterable: true,
      meta: { headerAlign: 'right', cellAlign: 'right' },
    },
    {
      id: 'cardBuyRate',
      header: 'Card Buy Rate',
      accessorKey: 'cardBuyRate',
      sortable: true,
      filterable: true,
      meta: { headerAlign: 'right', cellAlign: 'right' },
    },
    {
      id: 'cardSellRate',
      header: 'Card Sell Rate',
      accessorKey: 'cardSellRate',
      sortable: true,
      filterable: true,
      meta: { headerAlign: 'right', cellAlign: 'right' },
    },
  ];
};
