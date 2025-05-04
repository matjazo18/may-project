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
              <SelectValue placeholder="Select an Item" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="exercise">exercise</SelectItem>
                <SelectItem value="reading">reading</SelectItem>
                <SelectItem value="meditating">meditating</SelectItem>
                <SelectItem value="noSocialMedia">study</SelectItem>
                <SelectItem value="new language">
                  Practicing a new language
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
