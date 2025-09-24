import { cn } from "@/utils/cn";
import { Check } from "lucide-react";

export type StepperProps = {
  steps: string[];
  currentStep: number;
  completedSteps?: Set<number>;
  className?: string;
  onStepClick?: (stepIndex: number) => void;
};

export function Stepper({
  steps,
  currentStep,
  completedSteps = new Set(),
  className,
  onStepClick,
}: StepperProps) {
  return (
    <div className={cn("relative", className)}>
      <ol
        className="grid"
        style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0,1fr))` }}
      >
        {steps.map((label, idx) => {
          const isCompleted = completedSteps.has(idx);
          const isCurrent = idx === currentStep;

          return (
            <li key={idx} className={cn("relative flex flex-col items-center", onStepClick && "cursor-pointer")} onClick={() => onStepClick?.(idx)}>
              {/* Connector line to next step (skip last step) */}
              {idx < steps.length - 1 && (
                <div
                  className={cn(
                    "absolute top-5 left-1/2 w-full h-[2px] -translate-x-0",
                    isCompleted ? "bg-green-500" : "bg-muted"
                  )}
                  style={{ width: "100%" }}
                />
              )}

              {/* Step circle */}
              <div
                className={cn(
                  "z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 shadow-sm",
                  isCompleted
                    ? "bg-green-500 text-white border-green-500"
                    : isCurrent
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted text-muted-foreground border-muted"
                )}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : idx + 1}
              </div>

              {/* Step label */}
              <p
                className={cn(
                  "mt-3 text-xs font-medium leading-tight text-center",
                  isCompleted
                    ? "text-green-600"
                    : isCurrent
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {label}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
