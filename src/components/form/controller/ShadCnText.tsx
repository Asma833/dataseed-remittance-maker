import { Controller, useFormContext } from 'react-hook-form';
import { ShadCnFormInput } from './ShadCnFormInput';
import { FormItem, FormLabel, FormControl, FormMessage, FormField } from '@/components/ui/form';
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
  control?: any;
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
  control: propControl,
}: ShadCnTextProps) => {
  const { control: contextControl } = useFormContext();
  const control = propControl || contextControl;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={className}>
          <FormLabel className="text-[var(--color-form-label)]">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <div>
              <ShadCnFormInput
                {...field}
                type="text"
                placeholder={placeholder}
                uppercase={uppercase}
                disabled={disabled}
                className={cn('form-input', error && 'border-destructive focus:ring-destructive')}
                forcedValue={forcedValue}
                {...(onInputChange && { onInputChange })}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
