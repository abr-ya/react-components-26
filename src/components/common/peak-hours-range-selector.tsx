import { Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";

import { Button } from "@components/ui/button";
import { cn } from "@lib/utils";

import type {
  AddRangeStrategy,
  PeakHoursRangeSelectorProps,
  PeakHoursValue,
  PeakRange,
} from "./peak-hours-range-selector.types";

type FreeSlot = {
  start: number;
  end: number;
};

type DragState = {
  type: "start" | "end" | "move";
  index: number;
  pointerStart: number;
  rangeStart: number;
  rangeEnd: number;
};

const DAY_START = 0;
const DAY_END = 24;
const DEFAULT_PREFERRED_RANGE: PeakRange = { start: 8, end: 9 };
const TIME_LABELS = [0, 6, 12, 18, 24];
const HOUR_TICKS = Array.from({ length: 25 }, (_, index) => index);

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const roundToStep = (value: number, step: number) => Math.round(value / step) * step;

const normalizeTime = (value: number, step: number) => clamp(roundToStep(value, step), DAY_START, DAY_END);

const sortRanges = (ranges: PeakHoursValue) => [...ranges].sort((a, b) => a.start - b.start || a.end - b.end);

const formatTime = (value: number) => {
  const totalMinutes = Math.round(value * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

const toPercent = (value: number) => `${(value / DAY_END) * 100}%`;

const getFreeSlots = (ranges: PeakHoursValue, minGap: number): FreeSlot[] => {
  const sorted = sortRanges(ranges);
  const slots: FreeSlot[] = [];
  let cursor = DAY_START;

  sorted.forEach((range) => {
    const slotEnd = range.start - minGap;

    if (slotEnd > cursor) {
      slots.push({ start: cursor, end: slotEnd });
    }

    cursor = Math.max(cursor, range.end + minGap);
  });

  if (cursor < DAY_END) {
    slots.push({ start: cursor, end: DAY_END });
  }

  return slots;
};

const fitRangeInSlot = (slot: FreeSlot, duration: number, idealStart: number, step: number): PeakRange | null => {
  if (slot.end - slot.start < duration) {
    return null;
  }

  const minStart = slot.start;
  const maxStart = slot.end - duration;
  const roundedStart = roundToStep(idealStart, step);
  const start = normalizeTime(clamp(roundedStart, minStart, maxStart), step);
  const adjustedStart = clamp(start, minStart, maxStart);

  return {
    start: adjustedStart,
    end: adjustedStart + duration,
  };
};

const findFirstAvailableRange = (slots: FreeSlot[], duration: number, step: number) => {
  for (const slot of slots) {
    const range = fitRangeInSlot(slot, duration, slot.start, step);

    if (range) {
      return range;
    }
  }

  return null;
};

const findLargestGapRange = (slots: FreeSlot[], duration: number, step: number) => {
  const slot = slots
    .filter((item) => item.end - item.start >= duration)
    .sort((a, b) => b.end - b.start - (a.end - a.start))[0];

  if (!slot) {
    return null;
  }

  return fitRangeInSlot(slot, duration, slot.start + (slot.end - slot.start - duration) / 2, step);
};

const findNearestRange = (slots: FreeSlot[], duration: number, idealStart: number, step: number) => {
  let nearest: PeakRange | null = null;
  let nearestDistance = Number.POSITIVE_INFINITY;

  slots.forEach((slot) => {
    const candidate = fitRangeInSlot(slot, duration, idealStart, step);

    if (!candidate) {
      return;
    }

    const distance = Math.abs(candidate.start - idealStart);

    if (distance < nearestDistance) {
      nearest = candidate;
      nearestDistance = distance;
    }
  });

  return nearest;
};

const findRangeForStrategy = ({
  ranges,
  strategy,
  preferredRange,
  defaultRangeDuration,
  step,
  minGap,
}: {
  ranges: PeakHoursValue;
  strategy: AddRangeStrategy;
  preferredRange: PeakRange;
  defaultRangeDuration: number;
  step: number;
  minGap: number;
}) => {
  const slots = getFreeSlots(ranges, minGap);

  if (strategy === "first-available") {
    return findFirstAvailableRange(slots, defaultRangeDuration, step);
  }

  if (strategy === "preferred-time") {
    const duration = preferredRange.end - preferredRange.start;

    return findNearestRange(slots, duration, preferredRange.start, step);
  }

  return findLargestGapRange(slots, defaultRangeDuration, step);
};

const findSlotByTime = (slots: FreeSlot[], time: number) =>
  slots.find((slot) => time >= slot.start && time <= slot.end);

export const PeakHoursRangeSelector = ({
  value,
  onChange,
  maxRanges = 3,
  step = 0.5,
  minDuration = 0.5,
  minGap = 0.5,
  defaultRangeDuration = 1,
  disabled = false,
  addRangeStrategy = "largest-gap",
  preferredRange = DEFAULT_PREFERRED_RANGE,
  addOnDoubleClick = false,
  showTimeLabels = true,
  showAddButton = true,
  className,
}: PeakHoursRangeSelectorProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const ranges = useMemo(() => sortRanges(value), [value]);
  const freeSlots = useMemo(() => getFreeSlots(ranges, minGap), [ranges, minGap]);
  const canAdd =
    !disabled && ranges.length < maxRanges && freeSlots.some((slot) => slot.end - slot.start >= defaultRangeDuration);

  const emitChange = useCallback(
    (nextRanges: PeakHoursValue) => {
      onChange(sortRanges(nextRanges));
    },
    [onChange],
  );

  const getTimeFromClientX = useCallback(
    (clientX: number) => {
      const rect = trackRef.current?.getBoundingClientRect();

      if (!rect) {
        return DAY_START;
      }

      const raw = ((clientX - rect.left) / rect.width) * DAY_END;

      return normalizeTime(raw, step);
    },
    [step],
  );

  const addRange = useCallback(
    (range?: PeakRange | null) => {
      if (!canAdd && !range) {
        return;
      }

      const nextRange =
        range ??
        findRangeForStrategy({
          ranges,
          strategy: addRangeStrategy,
          preferredRange,
          defaultRangeDuration,
          step,
          minGap,
        });

      if (!nextRange) {
        return;
      }

      emitChange([...ranges, nextRange]);
    },
    [addRangeStrategy, canAdd, defaultRangeDuration, emitChange, minGap, preferredRange, ranges, step],
  );

  const removeRange = useCallback(
    (index: number) => {
      emitChange(ranges.filter((_, rangeIndex) => rangeIndex !== index));
    },
    [emitChange, ranges],
  );

  const handleTrackDoubleClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!addOnDoubleClick || disabled || ranges.length >= maxRanges) {
      return;
    }

    const time = getTimeFromClientX(event.clientX);
    const slot = findSlotByTime(freeSlots, time);

    if (!slot) {
      return;
    }

    addRange(fitRangeInSlot(slot, defaultRangeDuration, time - defaultRangeDuration / 2, step));
  };

  const handleDragStart =
    (type: DragState["type"], index: number) => (event: ReactMouseEvent<HTMLButtonElement | HTMLDivElement>) => {
      if (disabled) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const range = ranges[index];

      if (!range) {
        return;
      }

      setDragState({
        type,
        index,
        pointerStart: getTimeFromClientX(event.clientX),
        rangeStart: range.start,
        rangeEnd: range.end,
      });
    };

  useEffect(() => {
    if (!dragState) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const range = ranges[dragState.index];

      if (!range) {
        return;
      }

      const nextRanges = [...ranges];
      const prevRange = ranges[dragState.index - 1];
      const nextRange = ranges[dragState.index + 1];
      const pointerTime = getTimeFromClientX(event.clientX);

      if (dragState.type === "start") {
        const minStart = prevRange ? prevRange.end + minGap : DAY_START;
        const maxStart = range.end - minDuration;

        nextRanges[dragState.index] = {
          ...range,
          start: clamp(pointerTime, minStart, maxStart),
        };
      }

      if (dragState.type === "end") {
        const minEnd = range.start + minDuration;
        const maxEnd = nextRange ? nextRange.start - minGap : DAY_END;

        nextRanges[dragState.index] = {
          ...range,
          end: clamp(pointerTime, minEnd, maxEnd),
        };
      }

      if (dragState.type === "move") {
        const duration = dragState.rangeEnd - dragState.rangeStart;
        const delta = roundToStep(pointerTime - dragState.pointerStart, step);
        const minStart = prevRange ? prevRange.end + minGap : DAY_START;
        const maxStart = (nextRange ? nextRange.start - minGap : DAY_END) - duration;
        const start = clamp(dragState.rangeStart + delta, minStart, maxStart);

        nextRanges[dragState.index] = {
          start,
          end: start + duration,
        };
      }

      emitChange(nextRanges);
    };

    const handleMouseUp = () => {
      setDragState(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragState, emitChange, getTimeFromClientX, minDuration, minGap, ranges, step]);

  return (
    <div className={cn("flex w-full items-center gap-3", disabled && "opacity-70", className)}>
      <div className={cn("relative min-w-0 flex-1", showTimeLabels && "pt-5")}>
        {showTimeLabels ? (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-5 text-xs text-slate-300/80">
            {TIME_LABELS.map((time) => (
              <span
                className="absolute -translate-x-1/2 whitespace-nowrap first:translate-x-0 last:-translate-x-full"
                key={time}
                style={{ left: toPercent(time) }}
              >
                {formatTime(time)}
              </span>
            ))}
          </div>
        ) : null}

        <div
          className="relative h-9 overflow-visible border-y border-white/5 bg-slate-700/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          onDoubleClick={handleTrackDoubleClick}
          ref={trackRef}
        >
          {HOUR_TICKS.map((hour) => (
            <span
              className={cn(
                "pointer-events-none absolute top-0 h-full w-px bg-white/5",
                hour % 6 === 0 && "bg-white/10",
              )}
              key={hour}
              style={{ left: toPercent(hour) }}
            />
          ))}

          {ranges.map((range, index) => (
            <div
              className="absolute top-1/2 flex h-7 -translate-y-1/2 cursor-grab items-center justify-center overflow-visible rounded-sm bg-linear-to-r from-fuchsia-950 via-rose-700 to-fuchsia-950 px-7 text-xs font-medium text-white shadow-lg shadow-rose-950/30 active:cursor-grabbing"
              key={`${range.start}-${range.end}-${index}`}
              onDoubleClick={(event) => {
                event.stopPropagation();

                if (addOnDoubleClick && !disabled) {
                  removeRange(index);
                }
              }}
              onMouseDown={handleDragStart("move", index)}
              style={{
                left: toPercent(range.start),
                width: `${((range.end - range.start) / DAY_END) * 100}%`,
              }}
            >
              <button
                aria-label="Изменить начало диапазона"
                className="absolute left-0 top-1/2 flex h-8 w-4 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded bg-slate-100 text-slate-700 shadow-md shadow-slate-950/25 hover:bg-white disabled:cursor-not-allowed"
                disabled={disabled}
                onMouseDown={handleDragStart("start", index)}
                type="button"
              >
                <span className="text-[10px] leading-none">|||</span>
              </button>

              <span className="min-w-0 truncate whitespace-nowrap">
                {formatTime(range.start)} - {formatTime(range.end)}
              </span>

              <button
                aria-label="Удалить диапазон"
                className="ml-1 inline-flex size-5 shrink-0 items-center justify-center rounded-sm text-white/85 hover:bg-white/15 hover:text-white disabled:pointer-events-none"
                disabled={disabled}
                onClick={(event) => {
                  event.stopPropagation();
                  removeRange(index);
                }}
                onMouseDown={(event) => event.stopPropagation()}
                type="button"
              >
                <Trash2 className="size-3" />
              </button>

              <button
                aria-label="Изменить конец диапазона"
                className="absolute right-0 top-1/2 flex h-8 w-4 -translate-y-1/2 translate-x-1/2 cursor-ew-resize items-center justify-center rounded bg-slate-100 text-slate-700 shadow-md shadow-slate-950/25 hover:bg-white disabled:cursor-not-allowed"
                disabled={disabled}
                onMouseDown={handleDragStart("end", index)}
                type="button"
              >
                <span className="text-[10px] leading-none">|||</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {showAddButton ? (
        <Button
          aria-label="Добавить диапазон"
          className={cn(
            "size-8 shrink-0 border-white/10 bg-white/10 text-white hover:bg-white/15",
            showTimeLabels && "mt-5",
          )}
          disabled={!canAdd}
          onClick={() => addRange()}
          size="icon-sm"
          type="button"
          variant="outline"
        >
          <Plus className="size-4" />
        </Button>
      ) : null}
    </div>
  );
};
