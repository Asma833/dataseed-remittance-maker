import { Controller, useFormContext } from 'react-hook-form';
import { ShadCnFormInput } from './ShadCnFormInput';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { cn } from '@/utils/cn';

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
              type="text"
              placeholder={placeholder}
              uppercase={uppercase}
              disabled={disabled}
              required={required}
              forcedValue={forcedValue}
              {...(onInputChange && { onInputChange })}
            />
          )}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};