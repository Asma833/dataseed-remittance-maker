import { Controller, useFormContext } from 'react-hook-form';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { cn } from '@/utils/cn';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

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

  return (
    <FormItem className={className}>
      <FormLabel className="text-[var(--color-form-label)]">
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
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-between text-left font-normal form-input shadow-none',
                      !field.value && 'text-muted-foreground',
                      fieldState.error && 'border-destructive focus:ring-destructive'
                    )}
                    disabled={disabled}
                  >
                    {field.value ? format(new Date(field.value), 'PPP') : <span>{placeholder}</span>}
                    <CalendarIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => {
                      field.onChange(date?.toISOString() || null);
                      if (date) {
                        clearErrors(name);
                      }
                    }}
                    disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
                    initialFocus
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
