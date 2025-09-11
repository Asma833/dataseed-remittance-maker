import { Controller, useFormContext } from 'react-hook-form';
import { ShadCnFormInput } from './ShadCnFormInput';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

interface ShadCnPhoneProps {
  name: string;
  label: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  forcedValue?: string;
}

export const ShadCnPhone = ({
  name,
  label,
  className,
  disabled = false,
  required = false,
  forcedValue,
}: ShadCnPhoneProps) => {
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
              type="tel"
              value={(forcedValue ? forcedValue : value) || ''}
              className="shadow-none"
              onChange={(e) => {
                // Remove all non-numeric characters and limit to 10 digits
                const numericValue = e.target.value.replace(/\D/g, '');
                const limitedValue = numericValue.slice(0, 10);
                onChange(limitedValue);
              }}
              disabled={disabled}
              placeholder="Enter phone number"
              maxLength={10}
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