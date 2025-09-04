import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { cn } from '@/utils/cn';
import { Circle, CircleCheck, Square, CheckSquare, CircleDot, Disc, SquareCheck } from 'lucide-react';
import { useMemo } from 'react';

type CheckboxVariant = 'square_check' | 'circle_check' | 'radio_style' | 'circle_check_filled' | 'square_check_filled';
type CheckboxSize = 'small' | 'medium' | 'large';

interface ShadCnCheckboxProps {
  name: string;
  label?: string;
  options: Record<string, { label: string }>;
  handleCheckboxChange?: (key: string, checked: boolean) => void;
  isMulti: boolean;
  defaultSelected?: Record<string, boolean>;
  variant?: CheckboxVariant;
  size?: CheckboxSize;
  classNames?: {
    wrapper?: string;
    formGroup?: string;
  };
  disabled?: boolean;
  required?: boolean;
}

export const ShadCnCheckbox = ({
  name,
  label,
  options,
  handleCheckboxChange,
  isMulti,
  defaultSelected = {},
  variant = 'circle_check',
  size = 'medium',
  classNames = {
    wrapper: '',
    formGroup: '',
  },
  disabled = false,
  required = false,
}: ShadCnCheckboxProps) => {
  const { control, setValue, trigger, getValues } = useFormContext();

  // Ensure name is a valid string
  const fieldName = typeof name === 'string' && name ? name : 'defaultName';

  // Helper function to get icon size based on size prop
  const getIconSize = () => {
    switch (size) {
      case 'small':
        return 16;
      case 'medium':
        return 20;
      case 'large':
        return 24;
      default:
        return 20;
    }
  };

  // Helper function to get icons based on variant
  const getIcons = (isChecked: boolean) => {
    const iconSize = getIconSize();

    switch (variant) {
      case 'square_check':
        return {
          unchecked: <Square size={iconSize} color="var(--fill-primary)" stroke="var(--fill-primary)" />,
          checked: <CheckSquare className="text-primary" size={iconSize} />,
        };
      case 'circle_check':
        return {
          unchecked: <Circle size={iconSize} />,
          checked: <CircleCheck className="text-primary" size={iconSize} />,
        };
      case 'circle_check_filled':
        return {
          unchecked: <Circle size={iconSize} />,
          checked: <Disc className="text-primary" size={iconSize} />,
        };
      case 'square_check_filled':
        return {
          unchecked: (
            <SquareCheck
              className="text-primary-foreground rounded-sm bg-primary"
              fill="var(--fill-foreground)"
              size={iconSize}
            />
          ),
          checked: (
            <SquareCheck
              className="text-primary-foreground rounded-sm bg-primary"
              fill="var(--fill-primary)"
              size={iconSize}
            />
          ),
        };
      case 'radio_style':
        return {
          unchecked: (
            <CircleDot
              size={iconSize}
              fill="white"
              color="var(--fill-primary)"
              className="text-primary-foreground rounded-sm"
            />
          ),
          checked: (
            <CircleDot
              fill="var(--fill-foreground)"
              className="text-primary-foreground rounded-sm"
              size={iconSize}
              color="var(--fill-primary)"
            />
          ),
        };
      default:
        return {
          unchecked: <Circle size={iconSize} />,
          checked: <CircleCheck className="text-primary" size={iconSize} />,
        };
    }
  };

  // Check if the field name contains dots (indicating a nested path)
  const isNestedField = fieldName.includes('.');

  // Parse the nested path to get the parent and child parts
  const getNestedParts = () => {
    const parts = fieldName.split('.');
    const lastPart = parts.pop() || '';
    const parentPath = parts.join('.');
    return { parentPath, lastPart };
  };

  // For nested fields, we need special handling
  const { parentPath, lastPart } = isNestedField ? getNestedParts() : { parentPath: '', lastPart: fieldName };

  const getDefaultValues = () => {
    if (isMulti) {
      return Object.fromEntries(Object.keys(options).map((key) => [key, false]));
    } else {
      return Object.fromEntries(Object.keys(options).map((key) => [key, defaultSelected?.[key] || false]));
    }
  };

  return (
    <FormItem className={classNames.wrapper}>
      {label && (
        <FormLabel>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </FormLabel>
      )}
      <FormControl>
        <Controller
          name={fieldName}
          control={control}
          defaultValue={getDefaultValues()}
          render={({ field }) => (
            <div className={cn('space-y-2', classNames?.formGroup ?? '')}>
              {Object.entries(options).map(([key, option]) => {
                const isChecked = field.value?.[key] || false;
                const icons = getIcons(isChecked);

                return (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${fieldName}-${key}`}
                      checked={isChecked}
                      disabled={disabled}
                      onCheckedChange={(checked) => {
                        const isChecked = checked === true;
                        let updatedValue = { ...field.value, [key]: isChecked };

                        // For radio_style or single selection, uncheck all others when a new one is selected
                        if (!isMulti || variant === 'radio_style') {
                          updatedValue = Object.fromEntries(
                            Object.keys(options).map((k) => [k, k === key ? isChecked : false])
                          );
                        }

                        // Update the form state
                        field.onChange(updatedValue);

                        // Use setValue with the proper path to ensure nested fields are updated correctly
                        if (isNestedField) {
                          // For nested fields, we need to get the current parent object and update just the part we want
                          const currentValues = getValues();
                          const parentObj = parentPath.split('.').reduce((obj, part) => {
                            if (!obj[part]) obj[part] = {};
                            return obj[part];
                          }, currentValues);

                          // Update the nested part
                          parentObj[lastPart] = updatedValue;

                          // Set the entire parent object
                          setValue(parentPath, parentObj, { shouldDirty: true, shouldTouch: true });
                        } else {
                          // For regular fields, just set the value directly
                          setValue(fieldName, updatedValue, {
                            shouldDirty: true,
                            shouldTouch: true,
                            shouldValidate: true,
                          });
                        }

                        // Call handleCheckboxChange with the key and checked state if it exists
                        if (handleCheckboxChange) {
                          handleCheckboxChange(key, isChecked);
                        }

                        trigger(fieldName);
                      }}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <label
                      htmlFor={`${fieldName}-${key}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                    </label>
                  </div>
                );
              })}
            </div>
          )}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};