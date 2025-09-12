import { Controller, useFormContext } from 'react-hook-form';
import { ShadCnFormInput } from './ShadCnFormInput';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { cn } from '@/utils/cn';
import { divide } from 'lodash';

interface ShadCnTextProps {
  name: string;
  label: string;
  className?: string;
  uppercase?: boolean;
  disabled?: boolean;
  required?: boolean;
  forcedValue?: string;
  onInputChange?: (value: string) => void;
  placeholder?: string;
}

export const ShadCnText = ({
  name,
  label,
  className,
  uppercase,
  disabled = false,
  required = false,
  forcedValue,
  onInputChange,
  placeholder,
}: ShadCnTextProps) => {
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
              type="text"
              placeholder={placeholder}
              uppercase={uppercase}
              disabled={disabled}
              className={cn("form-input shadow-none focus-visible:ring-0", error && "border-destructive focus:ring-destructive")}
              forcedValue={forcedValue}
              {...(onInputChange && { onInputChange })}
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