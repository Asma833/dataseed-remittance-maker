import { useFormContext } from 'react-hook-form';
import { FormItem, FormLabel, FormControl, FormMessage, FormField } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { cn } from '@/utils/cn';
import { Check, ChevronDown } from 'lucide-react';
import * as React from 'react';

interface ShadCnComboboxProps {
  name: string;
  label: string;
  options:
    | { [key: string]: { label: string; selected?: boolean } }
    | Array<{ value: string; label: string; selected?: boolean }>;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  forcedValue?: string;
  control?: any;
}

export const ShadCnCombobox = ({
  name,
  label,
  options,
  className,
  placeholder = 'Select an option',
  disabled = false,
  required = false,
  forcedValue,
  control: propControl,
}: ShadCnComboboxProps) => {
  const { control: contextControl } = useFormContext();
  const control = propControl || contextControl;
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const formattedOptions = React.useMemo(() => {
    if (Array.isArray(options)) {
      return options;
    }
    return Object.entries(options).map(([value, { label }]) => ({
      value,
      label,
    }));
  }, [options]);

  const filteredOptions = React.useMemo(() => {
    if (!inputValue) return formattedOptions;
    return formattedOptions.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [formattedOptions, inputValue]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        // Sync internal input value with external field value on load or external change
        React.useEffect(() => {
          if (field.value) {
            const selectedOption = formattedOptions.find((opt) => opt.value === field.value);
            if (selectedOption) {
              setInputValue(selectedOption.label);
            }
          } else {
            setInputValue('');
          }
        }, [field.value, formattedOptions]);

        return (
          <FormItem className={cn('flex flex-col', className)}>
            <FormLabel className="text-[var(--color-form-label)]">
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
            <FormControl>
              <div className="relative w-full">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <div className="relative flex items-center">
                      <Input
                        className={cn(
                          'form-input pr-8 flex h-9 w-full items-center rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-none transition-colors placeholder:text-[#a3a3a3] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                          !field.value && 'text-[#a3a3a3]'
                        )}
                        placeholder={placeholder}
                        value={inputValue}
                        disabled={disabled}
                        onChange={(e) => {
                          const val = e.target.value;
                          setInputValue(val);
                          // If user clears the input, clear the form field value too
                          if (!val) {
                            field.onChange('');
                          }
                          if (!open && val) setOpen(true);
                        }}
                        onFocus={() => {
                          if (!disabled) setOpen(true);
                        }}
                      />
                      <ChevronDown className="absolute right-2 h-4 w-4 shrink-0 opacity-50 pointer-events-none" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-fit p-0 border border-[#e5e7eb] shadow-lg"
                    align="start"
                    onOpenAutoFocus={(e) => e.preventDefault()} // Don't steal focus from input
                  >
                    <Command className="w-full" shouldFilter={false}>
                      <CommandList className="max-h-60">
                        {filteredOptions.length === 0 ? (
                          <CommandEmpty className="px-4 py-6">No results found.</CommandEmpty>
                        ) : (
                          <CommandGroup>
                            {filteredOptions.map((option) => (
                              <CommandItem
                                key={option.value}
                                value={option.value}
                                onSelect={() => {
                                  field.onChange(option.value);
                                  setInputValue(option.label);
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    field.value === option.value ? 'opacity-100' : 'opacity-0'
                                  )}
                                />
                                {option.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        )}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
