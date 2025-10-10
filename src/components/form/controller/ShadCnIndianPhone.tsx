import { Controller, useFormContext } from 'react-hook-form';
import { ShadCnFormInput } from './ShadCnFormInput';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { cn } from '@/utils/cn';

interface ShadCnIndianPhoneProps {
  name: string;
  label: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  forcedValue?: string;
}

export const ShadCnIndianPhone = ({
  name,
  label,
  className,
  disabled = false,
  required = false,
  forcedValue,
}: ShadCnIndianPhoneProps) => {
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
          render={({ field, fieldState: { error } }) => (
            <div>
              <ShadCnFormInput
                {...field}
                type="tel"
                isIndianPhone={true}
                className={cn(
                  'form-input shadow-none focus-visible:ring-0',
                  error && 'border-destructive focus:ring-destructive'
                )}
                disabled={disabled}
                forcedValue={forcedValue}
                placeholder="+91 98765 43210"
                maxLength={17}
              />
              {error && <p className="text-sm text-destructive mt-1">{error.message}</p>}
            </div>
          )}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
