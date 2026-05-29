export type PeakRange = {
  start: number;
  end: number;
};

export type PeakHoursValue = PeakRange[];

export type AddRangeStrategy = "first-available" | "preferred-time" | "largest-gap";

export type PeakHoursRangeSelectorProps = {
  value: PeakHoursValue;
  onChange: (value: PeakHoursValue) => void;
  maxRanges?: number;
  step?: number;
  minDuration?: number;
  minGap?: number;
  defaultRangeDuration?: number;
  disabled?: boolean;
  addRangeStrategy?: AddRangeStrategy;
  preferredRange?: PeakRange;
  addOnDoubleClick?: boolean;
  showTimeLabels?: boolean;
  showAddButton?: boolean;
  className?: string;
};
