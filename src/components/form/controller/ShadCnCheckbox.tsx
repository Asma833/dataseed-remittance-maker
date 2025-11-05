import { Controller, useFormContext } from 'react-hook-form';
import {
  FormItem,
  FormLabel,
  FormControl,
  // FormMessage,  // we will render error via getFieldState for reliability
} from '@/components/ui/form';
import { cn } from '@/utils/cn';
import { Circle, CircleCheck, Square, CheckSquare, CircleDot, SquareCheck, CheckCircle } from 'lucide-react';
import React, { useEffect } from 'react';

type CheckboxVariant =
  | 'square_check'
  | 'circle_check'
  | 'radio_style'
  | 'circle_check_filled'
  | 'square_check_filled'
  | 'pill';

type CheckboxSize = 'small' | 'medium' | 'large';

interface ShadCnCheckboxProps {
  name: string; // e.g. "checkerDetails.productType"
  label?: string;
  options: Record<string, { label: string }>;
  handleCheckboxChange?: (key: string, checked: boolean) => void;
  isMulti: boolean;
  defaultSelected?: Record<string, boolean>;
  variant?: CheckboxVariant;
  size?: CheckboxSize;
  classNames?: { wrapper?: string; formGroup?: string };
  disabled?: boolean;
  required?: boolean;
  requiredMessage?: string;
  orientation?: 'horizontal' | 'vertical';
}

export const ShadCnCheckbox = ({
  name,
  label,
  options,
  handleCheckboxChange,
  isMulti,
  defaultSelected = {},
  variant = 'circle_check_filled',
  size = 'medium',
  classNames = { wrapper: '', formGroup: '' },
  disabled = false,
  required = false,
  requiredMessage = 'Please select at least one option',
  orientation,
}: ShadCnCheckboxProps) => {
  // Guard against null/undefined options
  if (!options) {
    return null;
  }

  const { control, setValue, setError, clearErrors, getValues, getFieldState, formState } = useFormContext();

  // ---------- sizing ----------
  const iconPx = size === 'small' ? 18 : size === 'large' ? 24 : 20;

  // ---------- normalize ----------
  const normalizeMulti = (val?: Record<string, boolean>) => {
    const base = Object.fromEntries(Object.keys(options).map((k) => [k, false])) as Record<string, boolean>;
    if (!val) return base;
    const out = { ...base };
    for (const k of Object.keys(base)) out[k] = !!val[k];
    return out;
  };

  // On mount: ensure multi value has all keys so later toggles always compute properly
  useEffect(() => {
    if (!isMulti) return;
    const current = getValues(name) as Record<string, boolean> | undefined;
    const normalized = normalizeMulti(current);
    // Only set if shape actually changed (avoid needless re-renders)
    const changed = !current || Object.keys(options).some((k) => typeof current[k] === 'undefined');
    if (changed) {
      setValue(name, normalized, {
        shouldDirty: false,
        shouldTouch: false,
        shouldValidate: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, isMulti, options]);

  // ---------- required checker ----------
  const isEmptySelection = (val: any) => (isMulti ? !Object.values<boolean>(val || {}).some(Boolean) : !val);

  const applyRequiredError = (val: any) => {
    if (!required) {
      clearErrors(name);
      return;
    }
    if (isEmptySelection(val)) {
      setError(name, { type: 'manual', message: requiredMessage });
    } else {
      clearErrors(name);
    }
  };

  // ---------- icons ----------
  const FilledCircleCheck = React.memo(function FilledCircleCheck({ size }: { size: number }) {
    return (
      <span className="grid place-items-center rounded-full bg-primary" style={{ width: size, height: size }}>
        <svg
          width={Math.round(size * 0.78)}
          height={Math.round(size * 0.78)}
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
    );
  });

  const EmptyCircle = React.memo(function EmptyCircle({ size }: { size: number }) {
    return <span className="rounded-full ring-1 ring-gray-300 bg-white block" style={{ width: size, height: size }} />;
  });

  const getIcons = (checked: boolean) => {
    switch (variant) {
      case 'square_check':
        return {
          unchecked: <Square size={iconPx} color="var(--fill-primary)" stroke="var(--fill-primary)" />,
          checked: <CheckSquare className="text-primary" size={iconPx} />,
        };
      case 'circle_check':
        return {
          unchecked: <Circle size={iconPx} className="text-gray-400" />,
          checked: <CircleCheck className="text-primary" size={iconPx} />,
        };
      case 'circle_check_filled':
        return {
          unchecked: <EmptyCircle size={iconPx} />,
          checked: <FilledCircleCheck size={iconPx} />,
        };
      case 'square_check_filled':
        return {
          unchecked: <SquareCheck className="text-primary-foreground rounded-sm bg-primary" size={iconPx} />,
          checked: <SquareCheck className="text-primary-foreground rounded-sm bg-primary" size={iconPx} />,
        };
      case 'radio_style':
        return {
          unchecked: <CircleDot size={iconPx} className="text-gray-400" />,
          checked: <CircleDot size={iconPx} className="text-primary" />,
        };
      default:
        return {
          unchecked: <Circle size={iconPx} />,
          checked: <CircleCheck className="text-primary" size={iconPx} />,
        };
    }
  };

  // ---------- defaults ----------
  const getDefaultValues = () => {
    if (isMulti) {
      const base = Object.fromEntries(Object.keys(options).map((k) => [k, false])) as Record<string, boolean>;
      Object?.keys(defaultSelected || {}).forEach((k) => {
        if (k in base) base[k] = !!defaultSelected[k];
      });
      return base;
    }
    const defaultKey = Object.keys(defaultSelected || {}).find((k) => defaultSelected![k]);
    return defaultKey || '';
  };

  // For reliable error rendering even without <FormField />
  const { error: extError } = getFieldState(name, formState);

  return (
    <FormItem className={classNames.wrapper}>
      {label && (
        <FormLabel className="text-(--color-form-label)">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </FormLabel>
      )}
      <FormControl>
        <Controller
          name={name}
          control={control}
          defaultValue={getDefaultValues()}
          render={({ field }) => {
            const numOptions = Object?.keys(options).length;
            const effectiveOrientation = orientation || (numOptions <= 10 ? 'horizontal' : 'vertical');
            const containerClassName =
              effectiveOrientation === 'horizontal' ? 'flex flex-wrap gap-x-4 gap-y-2' : 'flex flex-col gap-4';

            const currentValue = isMulti ? normalizeMulti(field.value) : field.value;

            return (
              <>
                <div className={cn(containerClassName, classNames?.formGroup ?? '')}>
                  {Object.entries(options).map(([key, option]) => {
                    const isChecked = isMulti ? !!currentValue?.[key] : currentValue === key;
                    const icons = getIcons(isChecked);

                    if (variant === 'pill') {
                      return (
                        <label key={key} className={cn('cursor-pointer select-none', disabled && 'cursor-not-allowed')}>
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={isChecked}
                            disabled={disabled}
                            onChange={() => {
                              const nextValue = isMulti
                                ? normalizeMulti({ ...(currentValue || {}), [key]: !isChecked })
                                : !isChecked
                                  ? key
                                  : '';
                              field.onChange(nextValue);
                              applyRequiredError(nextValue);
                              handleCheckboxChange?.(key, !isChecked);
                            }}
                            aria-checked={isChecked}
                          />
                          <span
                            className={[
                              'inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm',
                              'ring-1 ring-gray-300 bg-white text-gray-700',
                              'peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-purple-500/40',
                              'transition',
                              isChecked ? 'bg-purple-50 ring-purple-600' : 'hover:bg-gray-50',
                              disabled && 'cursor-not-allowed opacity-50',
                            ].join(' ')}
                          >
                            <CheckCircle
                              className={isChecked ? 'h-4 w-4 text-purple-600' : 'h-4 w-4 text-gray-300'}
                              aria-hidden="true"
                            />
                            {option.label}
                          </span>
                        </label>
                      );
                    } else {
                      return (
                        <div key={key} className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            id={`${name}-${key}`}
                            aria-pressed={isChecked}
                            aria-checked={isChecked}
                            disabled={disabled}
                            onClick={() => {
                              const nextValue = isMulti
                                ? normalizeMulti({ ...(currentValue || {}), [key]: !isChecked })
                                : !isChecked
                                  ? key
                                  : '';
                              field.onChange(nextValue);
                              applyRequiredError(nextValue);
                              handleCheckboxChange?.(key, !isChecked);
                            }}
                            className={cn(
                              'grid place-items-center rounded-full cursor-pointer',
                              'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-500',
                              disabled && 'cursor-not-allowed opacity-50'
                            )}
                            style={{ width: iconPx, height: iconPx }}
                          >
                            {isChecked ? icons.checked : icons.unchecked}
                          </button>
                          <label
                            htmlFor={`${name}-${key}`}
                            className="text-sm text-(--color-form-label) leading-none cursor-pointer select-none"
                            onClick={() => !disabled && document.getElementById(`${name}-${key}`)?.click()}
                          >
                            {option.label}
                          </label>
                        </div>
                      );
                    }
                  })}
                </div>

                {/* Robust error rendering even without <FormField/> wrapper */}
                {extError?.message ? <p className="mt-1 text-sm text-destructive">{extError.message}</p> : null}

                {/*
                  If you wrap this with shadcn's <FormField name={name}>, you can instead use:
                  <FormMessage />
                */}
              </>
            );
          }}
        />
      </FormControl>
    </FormItem>
  );
};
