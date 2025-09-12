import { Controller, useFormContext } from 'react-hook-form';
import { ShadCnFormInput } from './ShadCnFormInput';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { cn } from '@/utils/cn';

interface ShadCnPasswordProps {
  name: string;
  label: string;
  className?: string;
  uppercase?: boolean;
  disabled?: boolean;
  required?: boolean;
  forcedValue?: string;
}

const ShadCnPassword = ({
  name,
  label,
  className,
  uppercase,
  disabled = false,
  required = false,
  forcedValue,
}: ShadCnPasswordProps) => {
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
          render={({ field, fieldState:{error} }) => (
            <div>
              <ShadCnFormInput
                {...field}
                type="password"
                uppercase={uppercase}
                disabled={disabled}
                required={required}
                forcedValue={forcedValue}
                className={cn("form-input shadow-none focus-visible:ring-0", error && "border-destructive focus:ring-destructive")}
                autoComplete="new-password"
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

export default ShadCnPassword;