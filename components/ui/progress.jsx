"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

function Progress({ className, value, ...props }) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-gray-200",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full w-full flex-1 transition-all relative z-10"
        style={{
          background: "linear-gradient(135deg, #e926e9 0%, #ff9800 100%)",
          transform: `translateX(-${100 - value}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
