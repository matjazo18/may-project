"use client";
import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import icon from "@/public/icon.png";
import { Progress } from "@radix-ui/react-progress";
import ProgresBar from "@/components/ProgresBar";
import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  collectionGroup,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export default function SharedPage({ params }) {
  const { id } = use(params);
  const [challenge, setChallenge] = useState(null);
  const [progress, setProgress] = useState(0);
  const [finalDays, setFinalDays] = useState(1);
  const [challengeDocPath, setChallengeDocPath] = useState(null);

  // Fetch challenge by shareId
  useEffect(() => {
    async function fetchChallenge() {
      const q = query(
        collectionGroup(db, "challenges"),
        where("shareId", "==", id)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        const data = docSnap.data();
        setChallenge(data);
        setProgress(data.progress?.daysCompleted || 0);
        setChallengeDocPath(docSnap.ref.path);

        // Calculate finalDays
        const fromDate =
          data.from && typeof data.from.toDate === "function"
            ? data.from.toDate()
            : new Date(data.from);
        const toDate =
          data.to && typeof data.to.toDate === "function"
            ? data.to.toDate()
            : new Date(data.to);
        const days = (toDate - fromDate) / (1000 * 60 * 60 * 24);
        setFinalDays(days);
      }
    }
    fetchChallenge();
  }, [id]);

  // Handler to increment progress
  const handleAddDay = async () => {
    if (!challengeDocPath) return;
    const newProgress = progress + 1;
    setProgress(newProgress);
    await updateDoc(doc(db, ...challengeDocPath.split("/")), {
      "progress.daysCompleted": newProgress,
      "progress.lastUpdated": new Date().toISOString(),
    });
  };

  if (!challenge) return <div>Loading...</div>;

  const fromDate =
    challenge.from && typeof challenge.from.toDate === "function"
      ? challenge.from.toDate()
      : new Date(challenge.from);

  const toDate =
    challenge.to && typeof challenge.to.toDate === "function"
      ? challenge.to.toDate()
      : new Date(challenge.to);

  return (
    <div className="p-4 border py-8 xl:py-14 rounded-lg shadow-sm mb-6 max-w-[600px] mx-auto mt-20">
      <div className="flex  justify-between items-center gap-6 ">
        {/* LEFT COLUMN */}
        <div className="flex flex-col space-y-4 text-left  ">
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
            <p className="text-base font-medium">{challenge.activity}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">For:</p>
            <p className="text-base font-medium">{challenge.time} mins daily</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Date range:</p>
            <div className="flex gap-4">
              <div>
                <p className="text-xs text-gray-500">From</p>
                <p className="text-sm font-medium">
                  {fromDate ? fromDate.toLocaleDateString() : "-"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">To</p>
                <p className="text-sm font-medium">
                  {toDate ? toDate.toLocaleDateString() : "-"}
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600">Stakes:</p>
            <p className="text-sm">
              If I miss a day, I owe you <span className="font-bold">$5</span>
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col items-center justify-center text-center space-y-4 sm:mr-20  mr-5">
          <h3 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
            <div className="flex flex-col">
              <span className="text-gray-500">Challenge</span>
              <span className="text-gray-500">
                Yourself<span className="text-yellow-500">.</span>
              </span>
            </div>
          </h3>
          <Image src={icon} width={100} height={100} alt="Challenge Icon" />
        </div>
      </div>
      <div className="flex flex-col justify-start items-start mt-10">
        <span className="mb-2">Progress bar</span>
        <div className="flex gap-4 items-center mb-4">
          <button
            onClick={handleAddDay}
            className="px-6 py-1 bg-gray-800 text-slate-100 rounded-xl hover:scale-105 transition-transform duration-300"
            disabled={progress >= finalDays}
          >
            Add
          </button>
          <span>
            Day {progress} of {finalDays} Days
          </span>
        </div>
        <div className="flex items-center w-full gap-8">
          <div className="flex.1 w-full">
            <div
              style={{
                width: "100%",
                height: "16px",
                borderRadius: "8px",
                background: "#e5e7eb",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${(progress * 100) / finalDays}%`,
                  height: "100%",
                  background: "#1f2937",
                  borderRadius: "8px",
                  transition: "width 0.3s",
                }}
                className="bg-gradient-to-r from-[#e926e9] to-orange-400"
              />
            </div>
          </div>
          {/* Trophy Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={progress >= finalDays ? "yellow" : "none"}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`size-12 ${
              progress >= finalDays ? "opacity-100" : "opacity-60"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
            />
          </svg>
        </div>
        {/* Congrats message */}
        {progress >= finalDays && (
          <div className="mt-4 text-xl font-bold text-yellow-600 flex items-center gap-2 animate-bounce">
            <span>🎉 Congrats! You completed the challenge! 🎉</span>
          </div>
        )}
      </div>
    </div>
  );
}
