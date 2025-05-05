"use client";

import Image from "next/image";
import { useState } from "react";
import { DateRangePicker } from "./ui/calendar";
import SelectDemo from "./Select";
import DrawerDemo from "./SelectTarget";
import Link from "next/link";
import icon from "@/public/icon.png";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { resolve } from "styled-jsx/css";
import toast from "react-hot-toast";

export default function All() {
  const [datum, setDatum] = useState({ from: null, to: null });
  const [stvar, setStvar] = useState();
  const [time, setTime] = useState();

  const handleClick = async () => {
    const timestamp = Date.now();
    const link = `${window.location.origin}/share/${timestamp}?activity=${stvar}&time=${time}&from=${datum.from}&to=${datum.to}`;

    try {
      const sharableLink = await navigator.clipboard.writeText(link);
      toast.success("Coppied");
      console.log(sharableLink, "OTHER LINK");
    } catch (e) {
      console.log(e);
    }
  };

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
          {datum && stvar && time ? (
            <div className="flex justify-center items-center mt-20 xl:hidden ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 xl:hidden"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                />
              </svg>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>
        {datum && stvar && time ? (
          <div className="p-4 border py-14 rounded-lg shadow-sm mb-6 max-w-[600px] mx-auto">
            <div className="flex flex-row justify-evenly items-center gap-6">
              {/* LEFT COLUMN: Commitment Details */}
              <div className="flex flex-col space-y-4">
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

                <div>
                  <p className="text-sm text-gray-600">I will do:</p>
                  <p className="text-base font-medium">{stvar}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">For:</p>
                  <p className="text-base font-medium">{time} mins daily</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Date range:</p>
                  <div className="flex gap-4">
                    <div>
                      <p className="text-xs text-gray-500">From</p>
                      <p className="text-sm font-medium">
                        {datum.from?.toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">To</p>
                      <p className="text-sm font-medium">
                        {datum.to?.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Stakes:</p>
                  <p className="text-sm">
                    If I miss a day, I owe you{" "}
                    <span className="font-bold">$5</span>
                  </p>
                </div>
              </div>

              {/* RIGHT COLUMN: Motivation + Share */}
              <div className="flex flex-col items-center justify-center text-center space-y-4 ">
                <div>
                  <h3 className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
                    <div className="flex flex-col">
                      <span className="text-gray-500">Challenge</span>
                      <span className="text-gray-500">
                        Yourself
                        <span className="text-yellow-500">.</span>
                      </span>
                    </div>
                  </h3>
                </div>
                <div>
                  <Image
                    src={icon}
                    width={100}
                    height={100}
                    alt="Challenge Icon"
                  />
                </div>
                <div>
                  <button
                    className="bg-gray-800 py-2 px-4 rounded-lg text-white flex items-center gap-2 hover:scale-105 transition-transform text-sm"
                    onClick={handleClick}
                  >
                    Copy & <br />
                    Share it
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                    >
                      <path d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
