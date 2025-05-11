"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange, DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Custom styled Calendar wrapper
const Calendar = React.forwardRef(function Calendar(
  { className, ...props },
  ref
) {
  return (
    <DayPicker
      ref={ref}
      className={cn(
        "p-3 bg-white rounded-xl shadow-md flex flex-col gap-2",
        className
      )}
      classNames={{
        months: "flex flex-row gap-8", // two months side by side
        month: "flex flex-col gap-2",
        caption: "flex justify-center pt-1 relative items-center w-full mb-2",
        caption_label:
          "text-base font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-500",
        nav: "flex items-center gap-2",
        nav_button:
          "w-8 h-8 rounded-full flex items-center justify-center hover:bg-orange-100 transition-colors",
        table: "w-full border-collapse space-x-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.9rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative text-center text-sm focus-within:relative focus-within:z-20",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          "w-8 h-8 p-0 font-normal text-black rounded-md transition-colors duration-200 hover:bg-orange-100"
        ),
        day_range_start:
          "day-range-start bg-gradient-to-br from-[#e926e9] to-orange-400 text-white !important",
        day_range_end:
          "day-range-end bg-gradient-to-br from-[#e926e9] to-orange-400 text-white !important",
        day_selected:
          "bg-gradient-to-br from-[#e926e9] to-orange-400 text-white opacity-100 !important",
        day_today: "border-2 border-orange-400 text-black !important",
        day_outside: "text-gray-400 opacity-40 !important",
        day_disabled: "text-gray-400 opacity-50 !important",
        day_hidden: "invisible !important",
      }}
      showOutsideDays
      {...props}
    />
  );
});

export { Calendar };

export function DatePickerWithRange({ className, date, setDate }) {
  // Always show one month
  const numberOfMonths = 1;

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            className={cn(
              "w-[300px] justify-start text-left font-normal bg-gradient-to-br from-[#e926e9] to-orange-400 text-slate-100 rounded-lg shadow-md border-none ",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={numberOfMonths}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
