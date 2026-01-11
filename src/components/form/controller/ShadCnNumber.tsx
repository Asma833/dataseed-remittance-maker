import { Controller, useFormContext } from 'react-hook-form';
import { ShadCnFormInput } from './ShadCnFormInput';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { cn } from '@/utils/cn';
import { NumericFormat } from 'react-number-format';

interface ShadCnNumberProps {
  name: string;
  label: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  forcedValue?: string | number;
  min?: number;
  step?: number | string;
  placeholder?: string;
}

const currencyFields = [
  'settlement_rate',
  'add_margin',
  'fx_amount',
  'customer_rate',
  'declared_education_loan_amount',
  'previous_transaction_amount',
  'declared_previous_amount',
  'total_transaction_amount_tcs',
  'company_settlement_rate',
  'remittance_charges.agent_mark_up',
  'nostro_charges.agent_mark_up',
  'other_charges.agent_mark_up'
];

export const ShadCnNumber = ({
  name,
  label,
  className,
  disabled = false,
  required = false,
  forcedValue,
  min = 0,
  step = 'any',
  placeholder,
}: ShadCnNumberProps) => {
  const { control } = useFormContext();

  const isCurrencyField = currencyFields.some((field) => name.endsWith(`.${field}`));

  return (
    <FormItem className={className}>
      <FormLabel className="text-[--color-form-label]">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </FormLabel>
      <FormControl>
        <Controller
          name={name}
          control={control}
          defaultValue=""
          render={({ field: { value, onChange, ...field }, fieldState: { error } }) => {
            const currentValue = forcedValue !== undefined ? forcedValue : value;
            const isValueEmpty = currentValue === '' || currentValue === null || currentValue === undefined;

            return (
              <div>
                {isCurrencyField ? (
                  <NumericFormat
                    {...field}
                    thousandSeparator={true}
                    thousandsGroupStyle="lakh"
                    decimalSeparator="."
                    decimalScale={2}
                    fixedDecimalScale={true}
                    allowNegative={false}
                    prefix=""
                    placeholder={placeholder}
                    className={cn(
                      'form-input flex h-9 w-full border border-input bg-transparent px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 truncate',
                      isValueEmpty ? 'text-left' : 'text-right',
                      'aria-invalid:focus-visible:border-destructive',
                      error && 'border-destructive focus:ring-destructive'
                    )}
                    value={forcedValue !== undefined ? forcedValue : (value ?? '')}
                    onValueChange={(values) => {
                      const { floatValue } = values;
                      onChange(floatValue !== undefined ? floatValue : '');
                    }}
                    disabled={disabled}
                  />
                ) : (
                  <ShadCnFormInput
                    {...field}
                    type="text"
                    placeholder={placeholder}
                    className={cn(
                      'form-input flex h-9 w-full border border-input bg-transparent px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 truncate',
                      'aria-invalid:focus-visible:border-destructive'
                    )}
                    value={currentValue ?? ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      // Allow only numbers and decimal point
                      if (/^[0-9]*\.?[0-9]*$/.test(val) || val === '') {
                        onChange(val === '' ? '' : val);
                      }
                    }}
                    disabled={disabled}
                  />
                )}
                {error && <p className="text-sm text-destructive mt-1">{error.message}</p>}
              </div>
            );
          }}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
