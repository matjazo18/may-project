"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const data = [
  { goal: 400 },
  { goal: 300 },
  { goal: 200 },
  { goal: 300 },
  { goal: 200 },
  { goal: 278 },
  { goal: 189 },
  { goal: 239 },
  { goal: 300 },
  { goal: 200 },
  { goal: 278 },
  { goal: 189 },
  { goal: 349 },
];

export default function DrawerDemo({ stvar, setTime }) {
  const [goal, setGoal] = useState(0);
  const [value, submitedVal] = useState();
  const [open, SetItOpen] = useState(false);

  function onClick(adjustment) {
    setGoal(Math.max(0, Math.min(180, goal + adjustment)));
  }

  function SubmitGoal() {
    setTime(goal);
    SetItOpen(false);
  }

  return (
    <Drawer open={open} onOpenChange={SetItOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="bg-gradient-to-br from-[#e926e9] to-orange-400 text-slate-100"
        >
          {goal ? `${goal} min/day` : "How much time"}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>
              {stvar ? (
                <p className="font-semibold hover:scale-105 transition-transform duration-200">
                  How much time per day do you want to spend
                  <span className="font-extrabold text-gray-900 ">
                    {` ${stvar}`}
                  </span>
                  ?
                </p>
              ) : (
                <p className="text-xl font-extrabold animate-bounce">
                  Select Goal
                </p>
              )}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2 my-16">
              <div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => onClick(-1)}
                  disabled={goal <= 1}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease</span>
                </Button>
              </div>
              <div className="flex-1 text-center justify-center items-center ">
                <div className="text-7xl font-bold tracking-tighter">
                  {goal}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  min/day
                </div>
              </div>
              <div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => onClick(1)}
                  disabled={goal >= 180}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase</span>
                </Button>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={SubmitGoal}>Submit</Button>

            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
//fxing
