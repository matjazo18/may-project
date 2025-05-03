"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function DateRangePicker({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  const [range, setRange] = useState({ from: null, to: null });

  return (
    <div className="p-4">
      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        showOutsideDays={showOutsideDays}
        className={cn("p-3", className)}
        classNames={{
          months: "flex flex-col sm:flex-row gap-2",
          month: "flex flex-col gap-4",
          caption: "flex justify-center pt-1 relative items-center w-full",
          caption_label: "text-sm font-medium",
          nav: "flex items-center gap-1",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-x-1",
          head_row: "flex",
          head_cell:
            "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: cn(
            "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-gray-100",
            props.mode === "range"
              ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
              : "[&:has([aria-selected])]:rounded-md"
          ),
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "size-8 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100"
          ),
          day_range_start: "day-range-start bg-gray-800 text-white",
          day_range_end: "day-range-end bg-gray-800 text-white",
          day_selected:
            "bg-gray-800 text-white hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white",
          day_today: "bg-gray-100 text-gray-900",
          day_outside: "text-gray-400 opacity-50",
          day_disabled: "text-gray-400 opacity-50",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ ...props }) => (
            <ChevronLeft className="size-4" {...props} />
          ),
          IconRight: ({ ...props }) => (
            <ChevronRight className="size-4" {...props} />
          ),
        }}
        {...props}
      />

      <div className="mt-4 space-y-2">
        {range?.from && (
          <p className="text-sm">
            <span className="font-medium">From:</span>{" "}
            {range.from.toLocaleDateString()}
          </p>
        )}
        {range?.to && (
          <p className="text-sm">
            <span className="font-medium">To:</span>{" "}
            {range.to.toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
}

export { DateRangePicker };
