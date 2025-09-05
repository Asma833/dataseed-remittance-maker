import { Controller, useFormContext } from 'react-hook-form';
import { ShadCnFormInput } from './ShadCnFormInput';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

interface ShadCnNumberProps {
  name: string;
  label: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  forcedValue?: string | number;
  min?: number;
  step?: number | string;
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
            <ShadCnFormInput
              {...field}
              type="number"
              value={(forcedValue !== undefined ? forcedValue : value) || ''}
              onChange={(e) => {
                const val = e.target.value;
                onChange(val === '' ? '' : val);
              }}
              disabled={disabled}
              required={required}
              min={min}
              step={step}
            />
          )}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};