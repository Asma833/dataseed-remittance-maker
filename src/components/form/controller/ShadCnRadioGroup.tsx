import { Controller, FieldValues, Path, FieldPathValue } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { cn } from "@/utils/cn";

interface ShadCnRadioGroupProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  options: { [key: string]: { label: string; checked?: boolean } };
  className?: string;
  disabled?: boolean;
  required?: boolean;
  forcedValue?: string;
  onChange?: (value: string) => void;
  defaultValue?: FieldPathValue<T, Path<T>>;
  orientation?: "horizontal" | "vertical";
  primaryColorClass?: string; // border & dot color when checked (default violet-600)
  focusRingClass?: string;    // focus ring color (default violet-300)
}

export const ShadCnRadioGroup = <T extends FieldValues>({
  name,
  label,
  options,
  className,
  disabled = false,
  required = false,
  forcedValue,
  onChange,
  defaultValue,
  orientation,
  primaryColorClass = "violet-600",
  focusRingClass = "violet-300",
}: ShadCnRadioGroupProps<T>) => {
  const optionKeys = Object.keys(options);
  const isBooleanGroup = optionKeys.every((k) => k === "true" || k === "false");

  return (
    <FormItem className={className}>
      <FormLabel className={cn("text-[var(--color-form-label)]", disabled && "text-gray-400")}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </FormLabel>

      <FormControl>
        <Controller
          name={name}
          {...(defaultValue !== undefined ? { defaultValue } : {})}
          render={({ field }) => {
            // Keep the value as string unless this group is truly boolean
            const currentValue =
              forcedValue ??
              (isBooleanGroup ? String(field.value) : String(field.value ?? ""));

            const horizontal =
              (orientation ?? (optionKeys.length <= 3 ? "horizontal" : "vertical")) ===
              "horizontal";

            return (
              <RadioGroup
                value={currentValue}
                onValueChange={(v) => {
                  const next = isBooleanGroup ? (v === "true") : v;
                  field.onChange(next);
                  onChange?.(v);
                }}
                disabled={disabled}
                className={horizontal ? "flex items-center gap-6 justify-center" : "flex flex-col gap-2"}
              >
                {Object.entries(options).map(([value, option]) => (
                  <div key={value} className="flex items-center gap-2">
                    <RadioGroupItem
                      value={value}
                      id={`${name}-${value}`}
                      disabled={disabled}
                      className={cn(
                        // Outer circle
                        "relative shrink-0 inline-grid place-items-center h-[20px] w-[20px] rounded-full",
                        "bg-white border border-gray-400 hover:border-gray-500",
                        "transition-[border-color] duration-150 ease-out",
                        // Ensure no fill when checked (fights any global bg override)
                        "data-[state=checked]:!bg-white",
                        // Checked ring color
                        `data-[state=checked]:border-primary`,
                        // Hide Radix indicator
                        "[&>span]:hidden",
                        // Inner dot (10px) that scales in when checked
                        "after:content-[''] after:absolute after:h-[10px] after:w-[10px] after:rounded-full",
                        `after:bg-primary`,
                        "after:scale-0 data-[state=checked]:after:scale-100 after:transition-transform after:duration-150",
                        // Focus ring
                        "focus-visible:outline-none",
                        `focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary`,
                        // Disabled
                        disabled && "bg-gray-100 border-gray-300 opacity-60 cursor-not-allowed"
                      )}
                    />

                    <label
                      htmlFor={`${name}-${value}`}
                      className={cn(
                        "text-sm leading-none cursor-pointer select-none",
                        disabled && "text-gray-400 cursor-not-allowed"
                      )}
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            );
          }}
        />
      </FormControl>

      <FormMessage />
    </FormItem>
  );
};
