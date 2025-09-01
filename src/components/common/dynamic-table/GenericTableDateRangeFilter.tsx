import React, { useState, useEffect } from 'react';
import { Calendar } from 'primereact/calendar';
import { DateRange } from '@/components/types/filter.types';

interface GenericTableDateRangeFilterProps {
  dateRange: DateRange;
  onDateRangeChange: (dateRange: DateRange) => void;
  className?: string;
}

export const GenericTableDateRangeFilter: React.FC<GenericTableDateRangeFilterProps> = ({
  dateRange,
  onDateRangeChange,
  className = ""
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

  return (
    <div className={`flex gap-2 ${className}`}>
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">From Date</label>
        <div className="relative">
          <Calendar
            value={localDateRange.from}
            onChange={(e) => handleFromDateChange(e.value as Date | null)}
            selectionMode="single"
            readOnlyInput
            showIcon
            placeholder="Select from date"
            className="w-48 h-10"
            inputClassName="w-full h-10 pr-10"
            maxDate={localDateRange.to}
            panelClassName="[&_.p-datepicker-trigger]:hidden"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 hover:bg-blue-50 p-1 rounded cursor-pointer z-10 bg-blue-50/50 hover:bg-blue-100/50 transition-colors duration-200">
            <i className="pi pi-calendar text-sm"></i>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">To Date</label>
        <div className="relative">
          <Calendar
            value={localDateRange.to}
            onChange={(e) => handleToDateChange(e.value as Date | null)}
            selectionMode="single"
            readOnlyInput
            showIcon
            placeholder="Select to date"
            className="w-48 h-10"
            inputClassName="w-full h-10 pr-10"
            minDate={localDateRange.from}
            panelClassName="[&_.p-datepicker-trigger]:hidden"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 hover:bg-blue-50 p-1 rounded cursor-pointer z-10 bg-blue-50/50 hover:bg-blue-100/50 transition-colors duration-200">
            <i className="pi pi-calendar text-sm"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericTableDateRangeFilter;