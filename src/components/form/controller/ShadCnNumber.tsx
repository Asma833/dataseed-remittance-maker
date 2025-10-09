import { Controller, useFormContext } from 'react-hook-form';
import { ShadCnFormInput } from './ShadCnFormInput';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { cn } from '@/utils/cn';

interface ShadCnNumberProps {
  name: string;
  label: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  forcedValue?: string | number;
  min?: number;
  step?: number | string;
  placeholder?: string;
}

export const ShadCnNumber = ({
  name,
  label,
  className,
  disabled = false,
  required = false,
  forcedValue,
  min = 0,
  step = 'any',
  placeholder,
}: ShadCnNumberProps) => {
  const { control } = useFormContext();

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
          defaultValue=""
          render={({ field: { value, onChange, ...field }, fieldState: { error } }) => (
            <div>
            <ShadCnFormInput
              {...field}
              type="number"
              placeholder={placeholder}
              className={cn("form-input shadow-none focus-visible:ring-0", error && "border-destructive focus:ring-destructive")}
              value={(forcedValue !== undefined ? forcedValue : value) || ''}
              onChange={(e) => {
                const val = e.target.value;
                onChange(val === '' ? '' : val);
              }}
              disabled={disabled}
              min={min}
              step={step}
            />
            {error && (
                <p className="text-sm text-destructive mt-1">
                  {error.message}
                </p>
              )}
            </div>
          )}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};