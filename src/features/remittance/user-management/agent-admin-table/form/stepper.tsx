// components/stepper.tsx
import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/utils/cn";

export type StepperProps = {
  steps: string[];
  currentStep: number;                 // 0-based
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
            <li key={idx} className="relative flex flex-col items-center">
              {/* Connector line to next step (skip last step) */}
              {idx < steps.length - 1 && (
                <div
                  className={cn(
                    "absolute top-5 left-1/2 w-full h-[2px] -translate-x-0 pointer-events-none",
                    isCompleted ? "setps-secondary" : "bg-muted"
                  )}
                  style={{ width: "100%" }}
                />
              )}

              {/* Step circle + label as a real button to avoid anchor/parent captures */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // allow jumping back or to current; block forward clicks
                  if (onStepClick && idx <= currentStep) onStepClick(idx);
                }}
                className={cn(
                  "outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full flex flex-col items-center"
                )}
                aria-current={isCurrent ? "step" : undefined}
                aria-label={`Step ${idx + 1}${isCompleted ? " completed" : isCurrent ? " current" : ""}`}
              >
                <div
                  className={cn(
                    "z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 shadow-sm",
                    isCompleted
                      ? "setps-secondary text-white border-[setps-secondary]"
                      : isCurrent
                      ? "setps-primary text-primary-foreground border-[setps-primary]"
                      : "bg-muted text-muted-foreground border-muted"
                  )}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : idx + 1}
                </div>

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
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
