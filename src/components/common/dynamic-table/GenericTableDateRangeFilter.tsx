import React, { useState, useEffect } from 'react';
import { Calendar } from 'primereact/calendar';
import { DateRange } from '@/components/types/filter.types';

interface GenericTableDateRangeFilterProps {
  dateRange: DateRange;
  onDateRangeChange: (dateRange: DateRange) => void;
  className?: string;
}

const GenericTableDateRangeFilter: React.FC<GenericTableDateRangeFilterProps> = ({
  dateRange,
  onDateRangeChange,
  className = '',
}) => {
  const [localDateRange, setLocalDateRange] = useState<DateRange>(dateRange);

  useEffect(() => {
    setLocalDateRange(dateRange);
  }, [dateRange]);

  const handleFromDateChange = (date: Date | null) => {
    const newRange = { ...localDateRange, from: date || undefined };
    setLocalDateRange(newRange);
    onDateRangeChange(newRange);
  };

  const handleToDateChange = (date: Date | null) => {
    const newRange = { ...localDateRange, to: date || undefined };
    setLocalDateRange(newRange);
    onDateRangeChange(newRange);
  };

  const slot = 'flex-1 min-w-[120px] max-w-[200px]';

  return (
    <div className={`flex flex-wrap items-end gap-2 ${className}`}>
      {/* From Date */}
      <div className={`flex flex-col ${slot}`}>
        <label className="text-sm text-gray-600 mb-1 font-bold">From Date</label>
        <Calendar
          value={localDateRange.from}
          onChange={(e) => handleFromDateChange(e.value as Date | null)}
          selectionMode="single"
          readOnlyInput
          showIcon
          placeholder="DD/MM/YYYY"
          className="w-full [&_.p-datepicker-trigger]:bg-blue-100 [&_.p-datepicker-trigger]:text-blue-600 [&_.p-datepicker-trigger]:rounded-md [&_.p-datepicker-trigger:hover]:bg-blue-200"
          inputClassName="w-full h-10 py-0 px-2 focus:ring-0 focus:border-0"
          maxDate={localDateRange.to}
          panelClassName="z-50"
        />
      </div>

      {/* To Date */}
      <div className={`flex flex-col ${slot}`}>
        <label className="text-sm text-gray-600 mb-1 font-bold">To Date</label>
        <Calendar
          value={localDateRange.to}
          onChange={(e) => handleToDateChange(e.value as Date | null)}
          selectionMode="single"
          readOnlyInput
          showIcon
          placeholder="DD/MM/YYYY"
          className="w-full [&_.p-datepicker-trigger]:bg-blue-100 [&_.p-datepicker-trigger]:text-blue-600 [&_.p-datepicker-trigger]:rounded-md [&_.p-datepicker-trigger:hover]:bg-blue-200"
          inputClassName="w-full h-10 py-0 px-2 focus:ring-0 focus:border-0"
          minDate={localDateRange.from}
          panelClassName="z-50"
        />
      </div>
    </div>
  );
};

export default GenericTableDateRangeFilter;
