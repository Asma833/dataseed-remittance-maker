import { useFormContext } from 'react-hook-form';
import { ShadCnFormInput } from './ShadCnFormInput';
import { FormItem, FormLabel, FormControl, FormMessage, FormField } from '@/components/ui/form';
import { cn } from '@/utils/cn';

interface ShadCnPasswordProps {
  name: string;
  label: string;
  className?: string;
  uppercase?: boolean;
  disabled?: boolean;
  required?: boolean;
  forcedValue?: string;
  placeholder?: string;
  control?: any;
}

const ShadCnPassword = ({
  name,
  label,
  className,
  uppercase,
  disabled = false,
  required = false,
  forcedValue,
  placeholder,
  control: propControl,
}: ShadCnPasswordProps) => {
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
                type="password"
                uppercase={uppercase}
                disabled={disabled}
                required={required}
                forcedValue={forcedValue}
                placeholder={placeholder}
                className={cn('form-input', error && 'border-destructive focus-visible:ring-destructive')}
                autoComplete="off"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ShadCnPassword;
