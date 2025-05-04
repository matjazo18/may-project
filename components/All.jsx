"use client";

import { useState } from "react";
import { DateRangePicker } from "./ui/calendar";
import SelectDemo from "./Select";
import DrawerDemo from "./SelectTarget";

export default function All() {
  const [datum, setDatum] = useState({ from: null, to: null });
  const [stvar, setStvar] = useState();
  const [time, setTime] = useState();

  return (
    <>
      <div className="flex flex-col xl:flex-row items-center justify-center gap-6">
        {" "}
        I will be
        <div>
          <SelectDemo setStvar={setStvar} />
        </div>
        from
        <div>
          <DateRangePicker setDatum={setDatum} />
        </div>
        for
        <div className="mb-20 xl:mb-0">
          <DrawerDemo setTime={setTime} stvar={stvar} />
        </div>
      </div>
      <div>
        {datum && stvar && time ? (
          <div className="mt-6 p-4 border rounded-lg shadow-sm space-y-4 mb-40">
            {/* Header */}
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="text-lg font-bold">Commitment</h3>
            </div>

            {/* Main Content - Responsive Flex Layout */}
            <div className="flex flex-col gap-4 md:flex-row md:justify-between">
              {/* Activity Section */}
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600">I will do:</p>
                  <p className="text-base font-medium">
                    {stvar || (
                      <span className="text-gray-400">(select activity)</span>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">For:</p>
                  <p className="text-base font-medium">
                    {time || (
                      <span className="text-gray-400">(set duration)</span>
                    )}{" "}
                    mins daily
                  </p>
                </div>
              </div>

              {/* Date Range Section */}
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Date range:</p>
                <div className="flex gap-4">
                  <div>
                    <p className="text-xs text-gray-500">From</p>
                    <p className="text-sm font-medium">
                      {datum.from ? datum.from.toLocaleDateString() : "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">To</p>
                    <p className="text-sm font-medium">
                      {datum.to ? datum.to.toLocaleDateString() : "-"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stakes Section */}
              <div className="space-y-1">
                <p className="text-sm text-gray-600">Stakes:</p>
                <p className="text-sm">
                  If I miss a day, I owe you{" "}
                  <span className="font-bold">$5</span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
