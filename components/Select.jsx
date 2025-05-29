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
                <SelectItem value="🏋️ Exercising">🏋️ Exercising</SelectItem>
                <SelectItem value="Reading">📚 Reading</SelectItem>
                <SelectItem value="Meditating">🧘 Meditating</SelectItem>
                <SelectItem value="Studying">📝 Studying</SelectItem>
                <SelectItem value="Learning new language">
                  🗣️ Learning new language
                </SelectItem>
                <SelectItem value="Cooking">👨‍🍳 Cooking</SelectItem>
                <SelectItem value="Drawing">🎨 Drawing</SelectItem>
                <SelectItem value="Journaling">✏️ Journaling</SelectItem>
                <SelectItem value="Running">🏃 Running</SelectItem>
                <SelectItem value="Yoga">🧘‍♂️ Yoga</SelectItem>
                <SelectItem value="Coding">💻 Coding</SelectItem>
                <SelectItem value="Playing music">🎸 Playing music</SelectItem>
                <SelectItem value="Gardening">🌱 Gardening</SelectItem>
                <SelectItem value="75 hard">💪 75 Hard</SelectItem>
                <SelectItem value="Healthy eating">
                  🥗 Healthy eating
                </SelectItem>
                <SelectItem value="Brush teeth">🪥 Brush teeth</SelectItem>
                <SelectItem value="Volunteering">🤝 Volunteering</SelectItem>
                <SelectItem value="Cleaning">🧹 Cleaning</SelectItem>
                <SelectItem value="Dancing">💃 Dancing</SelectItem>

                <SelectItem value="Walking">🚶 Walking</SelectItem>
                <SelectItem value="Cycling">🚴 Cycling</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
