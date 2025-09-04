import { Controller, useFormContext } from 'react-hook-form';
import { ShadCnFormInput } from './ShadCnFormInput';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

interface ShadCnEmailProps {
  name: string;
  label: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  forcedValue?: string;
}

export const ShadCnEmail = ({
  name,
  label,
  className,
  disabled = false,
  required = false,
  forcedValue,
}: ShadCnEmailProps) => {
  const { control } = useFormContext();

  return (
    <FormItem className={className}>
      <FormLabel>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </FormLabel>
      <FormControl>
        <Controller
          name={name}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <ShadCnFormInput
              {...field}
              type="email"
              disabled={disabled}
              required={required}
              forcedValue={forcedValue}
              placeholder="Enter Email Address"
            />
          )}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};