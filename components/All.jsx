"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { DatePickerWithRange } from "./ui/calendar";
import SelectDemo from "./Select";
import DrawerDemo from "./SelectTarget";
import Link from "next/link";
import icon from "@/public/icon.png";
import Header from "./Header";
import { useAuth } from "../app/context/AuthContext";
import CopyShareButton from "./CopyShareButton";
import AuthPage from "../app/auth/page";
import { useRouter } from "next/navigation";
import Challenges from "./Challenges";

export default function All() {
  const [datum, setDatum] = useState({ from: null, to: null });
  const [stvar, setStvar] = useState();
  const [time, setTime] = useState();
  const [isLInk, setLink] = useState();
  const [onPage, setOnPage] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { user, loading } = useAuth();

  const changePage = () => {
    setOnPage(!onPage);
  };

  useEffect(() => {
    const saved = localStorage.getItem("challengeSelections");
    if (saved) {
      let { datum, stvar, time } = JSON.parse(saved);
      // Convert datum.from and datum.to to Date objects if they exist
      if (datum) {
        datum = {
          from: datum.from ? new Date(datum.from) : null,
          to: datum.to ? new Date(datum.to) : null,
        };
        setDatum(datum);
      }
      if (stvar) setStvar(stvar);
      if (time) setTime(time);
      localStorage.removeItem("challengeSelections");
    }
  }, []);

  // Show modal when all fields are filled
  useEffect(() => {
    if (datum && stvar && time) {
      setShowModal(true);
    }
  }, [datum, stvar, time]);

  return (
    <>
      <Header />
      <div className="flex flex-col xl:flex-row items-center justify-center gap-6">
        I will be
        <div>
          <SelectDemo setStvar={setStvar} />
        </div>
        from
        <div>
          <DatePickerWithRange date={datum} setDate={setDatum} />
        </div>
        for
        <div className="mb-20 xl:mb-0">
          <DrawerDemo setTime={setTime} stvar={stvar} />
        </div>
      </div>
      <Challenges />

      {/* Modal Backdrop */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="p-4 border py-8 xl:py-14 rounded-lg shadow-lg mb-6 max-w-[600px] w-full mx-4 bg-white relative animate-fade-in">
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

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
              <div className="flex flex-col items-center justify-center text-center space-y-4">
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
                <CopyShareButton datum={datum} time={time} stvar={stvar} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
