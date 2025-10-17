import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetCardTableColumns from './card-table-columns';
import { CardData } from '../type/types';
import { Button } from '@/components/ui/button';
import { DataTable, TableData, staticConfig } from '@/components/table';
import { PlusCircle } from 'lucide-react';
import React from 'react';
import SegmentedToggle from '@/components/segment/segment-toggle';
import { CardEditDialog } from '../form/CardEditDialog';

const sampleCards: CardData[] = [
  {
    id: '1',
    sno: 1,
    currency: 'USD',
    working_10_12: '1.5%',
    working_12_02: '2.0%',
    working_02_3_30: '1.8%',
    workingEnd: '3.0%',
    ttHolidayMargin: '0.5%',
    ttweekendMargin: '1.0%',
    upperCircuit: '5.0%',
  },
  {
    id: '2',
    sno: 2,
    currency: 'EUR',
    working_10_12: '1.2%',
    working_12_02: '1.8%',
    working_02_3_30: '1.5%',
    workingEnd: '2.5%',
    ttHolidayMargin: '0.3%',
    ttweekendMargin: '0.8%',
    upperCircuit: '4.0%',
  },
  {
    id: '3',
    sno: 3,
    currency: 'GBP',
    working_10_12: '1.8%',
    working_12_02: '2.2%',
    working_02_3_30: '2.0%',
    workingEnd: '3.5%',
    ttHolidayMargin: '0.7%',
    ttweekendMargin: '1.2%',
    upperCircuit: '6.0%',
  },
];

const CardTable = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<CardData[]>(sampleCards);
  const [loading, setLoading] = useState(false);
  const [txn, setTxn] = React.useState<"buy" | "sell">("buy");
  const [unit, setUnit] = React.useState<"inr" | "percentage">("inr");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
 
  // Table configuration
  const config = {
    ...staticConfig,
    search: {
      ...staticConfig.search,
      placeholder: 'Search...',
      enabled: true,
      searchMode: 'static' as const,
    },
    filters: {
      ...staticConfig.filters,
      enabled: true,
      filterMode: 'static' as const,
      columnFilters: true,
      globalFilter: true,
    },
    loading,
  };

  // Table data
  const tableData: TableData<CardData> = {
    data: cards,
    totalCount: cards.length,
    pageCount: Math.ceil(cards.length / (config.pagination?.pageSize || 10)),
    currentPage: 1,
  };

  const handleEdit = (card: CardData) => {
    setSelectedCard(card);
    setEditDialogOpen(true);
  };

  const handleEditSubmit = (updatedCard: CardData) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === updatedCard.id ? updatedCard : card
      )
    );
    setEditDialogOpen(false);
    setSelectedCard(null);
  };

  // Table actions
  const tableActions = {
    onPaginationChange: (pagination: { pageIndex: number; pageSize: number }) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    },
    onSortingChange: (sorting: { id: string; desc: boolean }[]) => {
      // Handle sorting
    },
    onGlobalFilterChange: (filter: string) => {
      // Handle global filter
    },
    onColumnFiltersChange: (filters: { id: string; value: any }[]) => {
      // Handle column filters
    },
  };

  // Define columns
  const columns = GetCardTableColumns({
    handleEdit,
  });

  return (
    <div className="space-y-4 w-full">
       <div className="flex gap-6 justify-center">
        <SegmentedToggle
          value={txn}
          onChange={(v) => setTxn(v as "buy" | "sell")}
          options={[{label:'Buy', value:'buy'}, {label:'Sell', value:'sell'}]}
          size="md"
          segmentWidthPx={120} // make each pill wider
        />
         <SegmentedToggle
          value={unit}
          onChange={(v) => setUnit(v as "inr" | "percentage")}
          options={[{label:'INR', value:'inr'}, {label:'Percentage', value:'percentage'}]}
          size="md"
          segmentWidthPx={120} // make each pill wider
        />
        </div>
      {/* Data Table */}
      <DataTable
        columns={columns}
        data={tableData}
        config={{
          ...config,
        }}
        actions={tableActions}
        className="rounded-lg"
      />

      <CardEditDialog
        isOpen={editDialogOpen}
        onClose={() => {
          setEditDialogOpen(false);
          setSelectedCard(null);
        }}
        editData={selectedCard}
        onEdit={handleEditSubmit}
      />
    </div>
  );
};

export default CardTable;
