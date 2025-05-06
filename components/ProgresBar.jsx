"use client";

import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

export default function ProgresBar({ finalDays }) {
  const [progress, setProgress] = useState(15);
  const result = (progress * 100) / finalDays;

  console.log(progress);

  return <Progress value={result} className="w-[60%]" />;
}
