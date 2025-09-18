import { Controller, useFormContext } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/utils/cn";
import {
  Circle,
  CircleCheck,
  Square,
  CheckSquare,
  CircleDot,
  SquareCheck,
} from "lucide-react";
import React from "react";

type CheckboxVariant =
  | "square_check"
  | "circle_check"
  | "radio_style"
  | "circle_check_filled"
  | "square_check_filled";

type CheckboxSize = "small" | "medium" | "large";

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
  orientation?: "horizontal" | "vertical";
}

export const ShadCnCheckbox = ({
  name,
  label,
  options,
  handleCheckboxChange,
  isMulti,
  defaultSelected = {},
  variant = "circle_check",
  size = "medium",
  classNames = { wrapper: "", formGroup: "" },
  disabled = false,
  required = false,
  orientation,
}: ShadCnCheckboxProps) => {
  const { control, setValue, trigger } = useFormContext();

  // --- sizing --------------------------------------------------------
  const getIconPx = () => {
    switch (size) {
      case "small":
        return 18;
      case "large":
        return 24;
      case "medium":
      default:
        return 20;
    }
  };
  const iconPx = getIconPx();

  // --- custom icons --------------------------------------------------
  const FilledCircleCheck = React.memo(function FilledCircleCheck({
    size,
  }: {
    size: number;
  }) {
    return (
      <span
        className="grid place-items-center rounded-full bg-primary"
        style={{ width: size, height: size }}
      >
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
    return (
      <span
        className="rounded-full ring-1 ring-gray-300 bg-white block"
        style={{ width: size, height: size }}
      />
    );
  });

  const getIcons = (isChecked: boolean) => {
    switch (variant) {
      case "square_check":
        return {
          unchecked: (
            <Square size={iconPx} color="var(--fill-primary)" stroke="var(--fill-primary)" />
          ),
          checked: <CheckSquare className="text-primary" size={iconPx} />,
        };
      case "circle_check":
        return {
          unchecked: <Circle size={iconPx} className="text-gray-400" />,
          checked: <CircleCheck className="text-primary" size={iconPx} />,
        };
      case "circle_check_filled":
        return {
          unchecked: <EmptyCircle size={iconPx} />,
          checked: <FilledCircleCheck size={iconPx} />,
        };
      case "square_check_filled":
        return {
          unchecked: (
            <SquareCheck
              className="text-primary-foreground rounded-sm bg-primary"
              size={iconPx}
            />
          ),
          checked: (
            <SquareCheck
              className="text-primary-foreground rounded-sm bg-primary"
              size={iconPx}
            />
          ),
        };
      case "radio_style":
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

  // --- default values ------------------------------------------------
  const getDefaultValues = () => {
    if (isMulti) {
      const defaults = Object.fromEntries(
        Object.keys(options).map((key) => [key, false])
      );
      Object.keys(defaultSelected || {}).forEach((k) => {
        if (k in defaults) defaults[k] = !!defaultSelected[k];
      });
      return defaults;
    }
    const defaultKey = Object.keys(defaultSelected || {}).find(
      (k) => defaultSelected![k]
    );
    return defaultKey || "";
  };

  return (
    <FormItem className={classNames.wrapper}>
      {label && (
        <FormLabel className="text-[var(--color-form-label)]">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </FormLabel>
      )}
      <FormControl>
        <Controller
          name={name}
          control={control}
          defaultValue={getDefaultValues()}
          render={({ field, fieldState:{error} }) => {
            const numOptions = Object.keys(options).length;
            const effectiveOrientation =
              orientation || (numOptions <= 3 ? "horizontal" : "vertical");
            const containerClassName =
              effectiveOrientation === "horizontal"
                ? "flex flex-wrap gap-x-4 gap-y-2"
                : "flex flex-col gap-4";

            return (
              <>
              <div
                className={cn(containerClassName, classNames?.formGroup ?? "")}
              >
                {Object.entries(options).map(([key, option]) => {
                  const isChecked = isMulti
                    ? !!field.value?.[key]
                    : field.value === key;
                  const icons = getIcons(isChecked);

                  return (
                    <div key={key} className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        id={`${name}-${key}`}
                        aria-pressed={isChecked}
                        aria-checked={isChecked}
                        disabled={disabled}
                        onClick={() => {
                          const newChecked = !isChecked;
                          const updatedValue = isMulti
                            ? { ...(field.value || {}), [key]: newChecked }
                            : newChecked
                            ? key
                            : "";

                          // Update just this field
                          setValue(name, updatedValue, {
                            shouldDirty: true,
                            shouldTouch: true,
                            shouldValidate: false,
                          });

                          // validate only this field
                          void trigger(name);

                          handleCheckboxChange?.(key, newChecked);
                        }}
                        className={cn(
                          "grid place-items-center rounded-full",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-500",
                          disabled && "cursor-not-allowed opacity-50"
                        )}
                        style={{ width: iconPx, height: iconPx }}
                      >
                        {isChecked ? icons.checked : icons.unchecked}
                      </button>

                      <label
                        htmlFor={`${name}-${key}`}
                        className="text-sm font-medium leading-none cursor-pointer select-none"
                        onClick={() =>
                          !disabled &&
                          document.getElementById(`${name}-${key}`)?.click()
                        }
                      >
                        {option.label}
                      </label>
                    </div>
                  );
                })}
              </div>
              <p>{error?.message}</p>
              </>
            );
          }}
        />
      </FormControl>
    </FormItem>
  );
};
