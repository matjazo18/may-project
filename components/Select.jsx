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

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="exercise">exercise</SelectItem>
          <SelectItem value="reading">reading</SelectItem>
          <SelectItem value="meditating">meditating</SelectItem>
          <SelectItem value="noSocialMedia">study</SelectItem>
          <SelectItem value="pineapple">Practicing a new language</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
