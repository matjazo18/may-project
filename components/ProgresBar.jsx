"use client";

import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

export default function ProgresBar({ finalDays }) {
  const [progress, setProgress] = useState(2);

  const changeDays = () => {
    if (progress < finalDays) setProgress(progress + 1);
  };
  const result = (progress * 100) / finalDays;

  console.log(progress);

  return (
    <>
      <Progress value={result} className="min-w-[300px]"></Progress>
      <button onClick={changeDays} className="bg-black w-20">
        add more
      </button>
    </>
  );
}
