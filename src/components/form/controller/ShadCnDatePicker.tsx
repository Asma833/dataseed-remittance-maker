import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { cn } from '@/utils/cn';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { DropdownNavProps, DropdownProps } from 'react-day-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';



interface ShadCnDatePickerProps {
  name: string;
  label: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
}

export const ShadCnDatePicker = ({
  name,
  label,
  className,
  disabled = false,
  required = false,
  placeholder = 'Pick a date',
}: ShadCnDatePickerProps) => {
  const { control, clearErrors } = useFormContext();

  const handleCalendarChange = (_value: string | number, _e: React.ChangeEventHandler<HTMLSelectElement>) => {
    const _event = {
      target: {
        value: String(_value),
      },
    } as React.ChangeEvent<HTMLSelectElement>;
    _e(_event);
  };
  return (
    <FormItem className={className}>
      <FormLabel className="text-[--color-form-label]">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </FormLabel>
      <FormControl>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      'p-2 inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] dark:bg-[--color-black] cursor-pointer border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground w-full justify-between text-left font-normal form-input shadow-none truncate',
                      !field.value && 'text-muted-foreground',
                      fieldState.error && 'border-destructive focus:ring-destructive'
                    )}
                    disabled={disabled}
                  >
                    {field.value ? (
                      (() => {
                        try {
                          return format(new Date(field.value), 'PPP');
                        } catch (error) {
                          return <span>{placeholder}</span>;
                        }
                      })()
                    ) : (
                      <span>{placeholder}</span>
                    )}
                    <CalendarIcon className="h-4 w-4" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      field.value
                        ? (() => {
                            try {
                              return new Date(field.value);
                            } catch (error) {
                              return undefined;
                            }
                          })()
                        : undefined
                    }
                    onSelect={(selectedDate) => {
                      field.onChange(selectedDate?.toISOString());
                      clearErrors(name);
                    }}
                    className="rounded-md border p-2"
                    captionLayout="dropdown-years"
                    defaultMonth={
                      field.value
                        ? (() => {
                            try {
                              return new Date(field.value);
                            } catch (error) {
                              return new Date();
                            }
                          })()
                        : new Date()
                    }
                    startMonth={new Date(1940, 6)}
                    endMonth={new Date(2080, 6)}
                    components={{
                      DropdownNav: (props: DropdownNavProps) => {
                        return (
                          <div className="flex w-full items-center justify-center gap-3 [&>span]:text-sm [&>span]:font-medium">
                            {props.children}
                          </div>
                        );
                      },
                      YearsDropdown: (props: DropdownProps) => {
                        return (
                          <Select
                            value={String(props.value)}
                            onValueChange={(value) => {
                              if (props.onChange) {
                                handleCalendarChange(value, props.onChange);
                              }
                            }}
                          >
                            <SelectTrigger className="h-8 w-fit font-medium">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="max-h-[min(26rem,var(--radix-select-content-available-height))]">
                              {props.options?.map((option) => (
                                <SelectItem key={option.value} value={String(option.value)} disabled={option.disabled}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        );
                      },
                    }}
                  />
                </PopoverContent>
              </Popover>
              {fieldState.error && <p className="text-sm text-destructive mt-1">{fieldState.error.message}</p>}
            </div>
          )}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
