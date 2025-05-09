"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function DateRangePicker({
  className,
  classNames,
  showOutsideDays = true,
  setDatum,
  ...props
}) {
  const [range, setRange] = useState({ from: null, to: null });

  // 🔁 Sync local range to parent
  useEffect(() => {
    console.log("Current range:", range);
    if (range?.from && range?.to) {
      if (range === undefined) {
        setDatum({ from: null, to: null });
      } else {
        setDatum(range);
      }
    }
  }, [range, setDatum]);

  return (
    <div className="p-4 h-[370px]  rounded-xl shadow-md">
      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        showOutsideDays={showOutsideDays}
        className={cn("p-3", className)}
        classNames={{
          months: "flex flex-col sm:flex-row gap-2",
          month: "flex flex-col gap-8",
          caption: "flex justify-center pt-1 relative items-center w-full",
          caption_label:
            "text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-500",
          nav: "flex items-center gap-",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "size-7  p-0 opacity-50 hover:opacity-90 bg-gradient-to-r from-pink-300 to-orange-300"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-x-1",
          head_row: "flex",
          head_cell:
            "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: cn(
            "relative  text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-pink-100",
            props.mode === "range"
              ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
              : "[&:has([aria-selected])]:rounded-md"
          ),
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "size-8 p-0 font-normal text-black ",
            "hover:bg-yellow-200 text-black" // Yellow hover instead of gray
          ),
          day_range_start: "day-range-start bg-orange-400 ",
          day_range_end: "day-range-end bg-orange-400 ",
          day_selected:
            "bg-gradient-to-br from-[#e926e9] to-orange-400 opacity-100 ",
          day_today:
            "bg-gradient-to-br from-[#e926e9] bg-opacity-20 text-black",
          day_outside: "text-gray-400 opacity-40 ",
          day_disabled: "text-gray-400 opacity-50",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: (props) => <ChevronLeft className="size-4" {...props} />,
          IconRight: (props) => <ChevronRight className="size-4" {...props} />,
        }}
        {...props}
      />
    </div>
  );
}
