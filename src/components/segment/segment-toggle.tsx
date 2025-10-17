import React from "react";

type SegValue = string;

interface SegmentedToggleProps {
  options: { label: string; value: SegValue }[];
  value: SegValue;
  onChange: (v: SegValue) => void;
  disabled?: boolean;
  size?: "sm" | "md";
  /** Width for EACH segment in pixels (controls pill width) */
  segmentWidthPx?: number; // e.g. 110 for md, 92 for sm
  className?: string;
}

const SegmentedToggle: React.FC<SegmentedToggleProps> = ({
  options,
  value,
  onChange,
  disabled = false,
  size = "md",
  segmentWidthPx, // optional override
  className = "",
}) => {
  const activeIx = Math.max(0, options.findIndex((o) => o.value === value));

  const sizes = {
    sm: { h: "h-8", pad: "p-1", btn: "text-xs", indH: "h-6", defaultSegPx: 92 },
    md: { h: "h-10", pad: "p-1", btn: "text-sm", indH: "h-8", defaultSegPx: 110 },
  }[size];

  // each segment width (px) -> container width = segments * segPx
  const perSegPx = segmentWidthPx ?? sizes.defaultSegPx;
  const containerWidth = perSegPx * options.length;

  // indicator position/width (percentage based, aligns to segment)
  const segW = `${100 / options.length}%`;
  const segL = `calc(${activeIx} * ${segW})`;

  return (
    <div
      role="tablist"
      aria-label="Toggle"
      className={[
        "relative grid rounded-full bg-gray-200 shadow-md",
        sizes.h,
        sizes.pad,
        disabled ? "opacity-60" : "",
        className,
      ].join(" ")}
      style={{
        gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))`,
        width: `${containerWidth}px`, // makes all segments equal & pills wider
      }}
    >
      {/* Active pill (gradient + glow) sized to one segment */}
      <div
        aria-hidden
        className={[
          "!cursor-pointer",
          "absolute top-1/2 -translate-y-1/2",
          "rounded-full",
          sizes.indH,
          "transition-all duration-200",
          "bg-primary text-primary-foreground bg-linear-to-r from-primary-gradient-1 to-primary-gradient-2 shadow-[0_0_0_3px_rgba(99,102,241,0.25)] hover:bg-primary/150",
          "shadow-[0_0_0_3px_rgba(99,102,241,0.25)]",
        ].join(" ")}
        style={{ left: segL, width: segW }}
      />

      {/* Options (each fills its grid cell => equal widths) */}
      {options.map((opt, ix) => {
        const isActive = ix === activeIx;
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={isActive}
            disabled={disabled}
            type="button"
            onClick={() => !disabled && onChange(opt.value)}
            className={[
              "relative z-10 w-full px-4", // w-full ensures equal segment width
              "flex items-center justify-center",
              sizes.btn,
              "rounded-full select-none",
              "transition-colors",
              "cursor-pointer",
              isActive ? "text-white" : "text-gray-700",
            ].join(" ")}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

export default SegmentedToggle;
