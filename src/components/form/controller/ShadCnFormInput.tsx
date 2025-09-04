import React, { forwardRef, useState } from "react";
import { useFormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import { formatIndianMobileNumber } from "@/utils/textFormater";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ShadCnFormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "email" | "number" | "tel" | "password";
  forcedValue?: string | undefined;
  uppercase?: boolean | undefined;
  onInputChange?: (value: string) => void;
  isIndianPhone?: boolean | undefined;
}

const ShadCnFormInput = forwardRef<HTMLInputElement, ShadCnFormInputProps>(
  ({
    className,
    type = "text",
    forcedValue,
    uppercase,
    onInputChange,
    isIndianPhone,
    ...props
  }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;

      // Handle uppercase transformation
      if (uppercase) {
        value = value.toUpperCase();
      }

      // Handle phone number formatting
      if (type === "tel") {
        if (isIndianPhone) {
          // Remove all non-numeric characters
          let numericValue = value.replace(/\D/g, '');

          // Handle different input scenarios for Indian phone
          if (numericValue.startsWith('91') && numericValue.length <= 12) {
            numericValue = numericValue.slice(0, 12);
          } else if (numericValue.startsWith('91') && numericValue.length > 12) {
            numericValue = numericValue.slice(0, 12);
          } else if (!numericValue.startsWith('91') && numericValue.length <= 10) {
            numericValue = numericValue.slice(0, 10);
          } else if (!numericValue.startsWith('91') && numericValue.length > 10) {
            numericValue = numericValue.slice(0, 10);
          }

          value = formatIndianMobileNumber(numericValue);
        } else {
          // Regular phone - limit to 10 digits
          value = value.replace(/\D/g, '').slice(0, 10);
        }
      }

      // Call onInputChange if provided
      if (onInputChange) {
        onInputChange(value);
      }

      // Call the original onChange
      if (props.onChange) {
        const syntheticEvent = {
          ...e,
          target: { ...e.target, value }
        } as React.ChangeEvent<HTMLInputElement>;
        props.onChange(syntheticEvent);
      }
    };

    const inputProps = {
      ...props,
      type: type || "text",
      value: forcedValue ?? props.value,
      onChange: handleChange,
      className: cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        error && "border-destructive focus-visible:ring-destructive",
        className
      ),
      ref,
      id: formItemId,
      "aria-describedby": !error
        ? `${formDescriptionId}`
        : `${formDescriptionId} ${formMessageId}`,
      "aria-invalid": !!error,
    };

    if (type === "password") {
      return <PasswordInput {...(inputProps as any)} />;
    }

    return <Input {...(inputProps as any)} />;
  }
);

ShadCnFormInput.displayName = "ShadCnFormInput";

// Password input with show/hide toggle
const PasswordInput = forwardRef<HTMLInputElement, ShadCnFormInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative">
        <Input
          {...props}
          ref={ref}
          type={showPassword ? "text" : "password"}
          className={cn("pr-10", className)}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Eye className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { ShadCnFormInput };