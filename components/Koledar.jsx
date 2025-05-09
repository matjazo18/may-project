"use client";
import { DatePickerWithRange } from "@/components/ui/calendar";
import React from "react";

export default function Kolendar() {
  const [date, setDate] = React.useState({ from: null, to: null });
  return (
    <div className="p-4">
      <DatePickerWithRange date={date} setDate={setDate} />
    </div>
  );
}
