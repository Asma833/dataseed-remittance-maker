import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HolidayData } from './types';
import { Button } from '@/components/ui/button';
import { DataTable, TableData, staticConfig } from '@/components/table';
import { PlusCircle } from 'lucide-react';
import { HolidayCreationDialog } from '../form/HolidayCreationDialog';
import { HolidayListTableColumnConfig } from './holiday-list-table-column.config';
import { useGetHolidays } from '../hooks/useHolidays';

// const sampleHolidays: HolidayData[] = [
//   {
//     id: '1',
//     sno: 1,
//     created_at: '2025-01-01',
//     holiday_name: "New Year's Day",
//   },
//   {
//     id: '2',
//     sno: 2,
//     created_at: '2025-01-26',
//     holiday_name: 'Republic Day',
//   },
//   {
//     id: '3',
//     sno: 3,
//     created_at: '2025-03-29',
//     holiday_name: 'Holi',
//   },
//   {
//     id: '4',
//     sno: 4,
//     created_at: '2025-08-15',
//     holiday_name: 'Independence Day',
//   },
//   {
//     id: '5',
//     sno: 5,
//     created_at: '2025-10-02',
//     holiday_name: 'Gandhi Jayanti',
//   },
//   {
//     id: '6',
//     sno: 6,
//     created_at: '2025-12-25',
//     holiday_name: 'Christmas Day',
//   },
// ];

const HolidayTable = () => {
  const navigate = useNavigate();
  const { data: apiHolidays, isLoading, error } = useGetHolidays();
  const [holidays, setHolidays] = useState<HolidayData[]>([]);
  const [loading, setLoading] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState<HolidayData | null>(null);

  // Update holidays state when apiHolidays changes
  useEffect(() => {
    if (apiHolidays) {
      const transformed = apiHolidays.map((holiday, index) => ({
        id: holiday.id,
        sno: index + 1,
        holiday_name: holiday.holiday_name,
        date: holiday.date,
        year: holiday.year,
        is_active: holiday.is_active,
      }));
      setHolidays(transformed);
    }
  }, [apiHolidays]);

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

  // Use holidays state directly, as it's now updated via useEffect
  const transformedHolidays: HolidayData[] = holidays;

  // Table data
  const tableData: TableData<HolidayData> = {
    data: transformedHolidays,
    totalCount: transformedHolidays.length,
    pageCount: Math.ceil(transformedHolidays.length / (config.pagination?.pageSize || 10)),
    currentPage: 1,
  };

  const handleEdit = (holiday: HolidayData) => {
    setSelectedHoliday(holiday);
    setEditDialogOpen(true);
  };

  const handleEditSubmit = (updatedHoliday: HolidayData) => {
    if (selectedHoliday) {
      // Edit mode
      setHolidays(prevHolidays =>
        prevHolidays.map(holiday =>
          holiday.id === updatedHoliday.id ? updatedHoliday : holiday
        )
      );
    } else {
      // Add mode
      const newId = Date.now().toString();
      const maxSno = Math.max(...holidays.map(h => h.sno || 0), 0);
      const newHoliday: HolidayData = {
        ...updatedHoliday,
        id: newId,
        sno: maxSno + 1,
      };
      setHolidays(prevHolidays => [...prevHolidays, newHoliday]);
    }
    setEditDialogOpen(false);
    setSelectedHoliday(null);
  };

  const handleDelete = (holiday: HolidayData) => {
    setHolidays(prevHolidays =>
      prevHolidays.filter(h => h.id !== holiday.id)
    );
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

  // Open dialog for adding new holiday
  const handleAddHoliday = () => {
    setSelectedHoliday(null); // Clear selection for add mode
    setEditDialogOpen(true);
  };

  // Define columns
  const columns = HolidayListTableColumnConfig({
    handleEdit,
    handleDelete
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

      <HolidayCreationDialog
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
