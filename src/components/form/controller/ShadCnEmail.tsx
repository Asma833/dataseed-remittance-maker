import { useFormContext } from 'react-hook-form';
import { ShadCnFormInput } from './ShadCnFormInput';
import { FormItem, FormLabel, FormControl, FormMessage, FormField } from '@/components/ui/form';
import { cn } from '@/utils/cn';

interface ShadCnEmailProps {
  name: string;
  label: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  forcedValue?: string;
  control?: any;
}

export const ShadCnEmail = ({
  name,
  label,
  className,
  disabled = false,
  required = false,
  forcedValue,
  control: propControl,
}: ShadCnEmailProps) => {
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
                type="email"
                disabled={disabled}
                className={cn(
                  'form-input shadow-none focus-visible:ring-0',
                  error && 'border-destructive focus:ring-destructive'
                )}
                forcedValue={forcedValue}
                placeholder="Enter Email Address"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
