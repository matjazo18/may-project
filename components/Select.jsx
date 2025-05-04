"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { set } from "date-fns";
import DrawerDemo from "./SelectTarget";
import { DateRangePicker } from "./ui/calendar";

export default function SelectDemo({ setStvar }) {
  const [selected, setSelected] = useState();

  return (
    <div className="flex-col">
      <div className="flex my-4 gap-6">
        <div>
          <Select onValueChange={(value) => setStvar(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Exercising">Exercising</SelectItem>
                <SelectItem value="Reading">Reading</SelectItem>
                <SelectItem value="Meditating">Meditating</SelectItem>
                <SelectItem value="Studying">Studying</SelectItem>
                <SelectItem value="Learning new language ">
                  Learning new language
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
