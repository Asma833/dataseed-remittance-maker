import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetHolidayTableColumns from './holiday-table-columns';
import { HolidayData } from './types';
import { Button } from '@/components/ui/button';
import { DataTable, TableData, staticConfig } from '@/components/table';
import { PlusCircle } from 'lucide-react';
import { HolidayEditDialog } from '../form/HolidayEditDialog';

const sampleHolidays: HolidayData[] = [
  {
    id: '1',
    sno: 1,
    created_at: '2025-01-01',
    holiday_name: "New Year's Day",
  },
  {
    id: '2',
    sno: 2,
    created_at: '2025-01-26',
    holiday_name: 'Republic Day',
  },
  {
    id: '3',
    sno: 3,
    created_at: '2025-03-29',
    holiday_name: 'Holi',
  },
  {
    id: '4',
    sno: 4,
    created_at: '2025-08-15',
    holiday_name: 'Independence Day',
  },
  {
    id: '5',
    sno: 5,
    created_at: '2025-10-02',
    holiday_name: 'Gandhi Jayanti',
  },
  {
    id: '6',
    sno: 6,
    created_at: '2025-12-25',
    holiday_name: 'Christmas Day',
  },
];

const HolidayTable = () => {
  const navigate = useNavigate();
  const [holidays, setHolidays] = useState<HolidayData[]>(sampleHolidays);
  const [loading, setLoading] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState<HolidayData | null>(null);

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
  const tableData: TableData<HolidayData> = {
    data: holidays,
    totalCount: holidays.length,
    pageCount: Math.ceil(holidays.length / (config.pagination?.pageSize || 10)),
    currentPage: 1,
  };

  const handleEdit = (holiday: HolidayData) => {
    setSelectedHoliday(holiday);
    setEditDialogOpen(true);
  };

  const handleEditSubmit = (updatedHoliday: HolidayData) => {
    setHolidays(prevHolidays =>
      prevHolidays.map(holiday =>
        holiday.id === updatedHoliday.id ? updatedHoliday : holiday
      )
    );
    setEditDialogOpen(false);
    setSelectedHoliday(null);
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

  // Navigate to holiday creation page
  const handleAddHoliday = () => {
    navigate('/admin/master/holiday-creation');
  };

  // Define columns
  const columns = GetHolidayTableColumns({
    handleEdit,
  });

  return (
    <div className="space-y-4 w-full">
      {/* Header with controls */}
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-2">
          <Button onClick={handleAddHoliday} size="sm">
            <PlusCircle className="h-4 w-4" />
            Add Holiday
          </Button>
        </div>
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

      <HolidayEditDialog
        isOpen={editDialogOpen}
        onClose={() => {
          setEditDialogOpen(false);
          setSelectedHoliday(null);
        }}
        editData={selectedHoliday}
        onEdit={handleEditSubmit}
      />
    </div>
  );
};

export default HolidayTable;
