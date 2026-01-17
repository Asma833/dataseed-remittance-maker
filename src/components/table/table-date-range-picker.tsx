import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface TableDateRangePickerProps {
  className?: string;
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  placeholder?: string;
  label?: string;
}

export function TableDateRangePicker({
  className,
  value,
  onChange,
  placeholder = 'From Date - To Date',
  label,
}: TableDateRangePickerProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && <p className="text-xs text-gray-600 px-1 h-5 flex items-center">{label}</p>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[260px] h-9 justify-between text-left font-normal bg-(--color-table-header-bg)',
              !value && 'text-muted-foreground'
            )}
          >
            <div className="flex items-center gap-2 overflow-hidden">
              {value?.from ? (
                value.to ? (
                  <span className="truncate">
                    {format(value.from, 'LLL dd, y')} - {format(value.to, 'LLL dd, y')}
                  </span>
                ) : (
                  <span className="truncate">{format(value.from, 'LLL dd, y')}</span>
                )
              ) : (
                <span className="truncate">{placeholder}</span>
              )}
            </div>
            <CalendarIcon className="h-4 w-4 text-[#D61F58] shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 border-none shadow-md" align="start" id="table-date-range-popover">
          <Calendar
            initialFocus
            mode="range"
            {...(value?.from ? { defaultMonth: value.from } : {})}
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
            classNames={{
              day_button:
                'relative flex size-9 items-center justify-center whitespace-nowrap rounded-md p-0 text-foreground group-[[data-selected]:not(.range-middle)]:[transition-property:color,background-color,border-radius,box-shadow] group-[[data-selected]:not(.range-middle)]:duration-150 group-data-disabled:pointer-events-none focus-visible:z-10 hover:not-in-data-selected:bg-accent group-data-selected:bg-[#D61F58] group-data-selected:shadow-md hover:not-in-data-selected:text-foreground group-data-selected:text-primary-foreground group-data-disabled:text-foreground/30 group-data-disabled:line-through group-data-outside:text-foreground/30 group-data-selected:group-data-outside:text-primary-foreground outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] group-[.range-start:not(.range-end)]:rounded-e-none group-[.range-end:not(.range-start)]:rounded-s-none group-[.range-middle]:rounded-none group-[.range-middle]:group-data-selected:bg-[#D61F58]/10 group-[.range-middle]:group-data-selected:text-foreground',
              today:
                '*:after:pointer-events-none *:after:absolute *:after:bottom-1 *:after:start-1/2 *:after:z-10 *:after:size-[3px] *:after:-translate-x-1/2 *:after:rounded-full *:after:bg-[#D61F58] [&[data-selected]:not(.range-middle)>*]:after:bg-background [&[data-disabled]>*]:after:bg-foreground/30 *:after:transition-colors',
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
