"use client";

import toast from "react-hot-toast";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../app/context/AuthContext";
import { db } from "../lib/firebase";
import { collection, query, getDocs, updateDoc, doc } from "firebase/firestore";
import { Progress } from "@/components/ui/progress";
import Confetti from "react-confetti";
import Link from "next/link";

// Emoji mapping for activities (move outside so it's accessible to all components)
const emojiMap = {
  exercising: "🏋️",
  reading: "📚",
  meditating: "🧘",
  studying: "📝",
  "learning new language": "🗣️",
  cooking: "👨‍🍳",
  drawing: "🎨",
  journaling: "✏️",
  running: "🏃",
  yoga: "🧘‍♂️",
  coding: "💻",
  "playing music": "🎸",
  gardening: "🌱",
  "healthy eating": "🥗",
  volunteering: "🤝",
  cleaning: "🧹",
  dancing: "💃",
  swimming: "🏊",
  walking: "🚶",
  cycling: "🚴",
};

export default function Challenges() {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState([]);
  console.log("CHALLENGES");
  console.log(challenges);
  const [confettiCardId, setConfettiCardId] = useState(null);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  async function fetchChallenges() {
    if (!user) return;
    const challengesRef = collection(db, "users", user.uid, "challenges");
    const q = query(challengesRef);
    const querySnapshot = await getDocs(q);
    const challengesList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setChallenges(challengesList);
  }
  fetchChallenges();

  const handleAddDay = async (challengeId, currentProgress, finalDays) => {
    // če si že completu returna funkcijo
    if (currentProgress >= finalDays) return;

    //  Tukej najde challange z istim ID kot ga ima challengeId
    const challenge = challenges.find((c) => c.id === challengeId);
    if (!challenge) return;

    // Uzame lastUpdated , ki je storam v databasu in ga primerja z danasnjim dnevom mesecem in letom
    const lastUpdated = challenge.progress?.lastUpdated
      ? new Date(challenge.progress.lastUpdated)
      : null;
    const today = new Date();

    if (
      lastUpdated &&
      lastUpdated.getDate() === today.getDate() &&
      lastUpdated.getMonth() === today.getMonth() &&
      lastUpdated.getFullYear() === today.getFullYear()
    ) {
      toast.error("You can only add one day per day!");
      return;
    }

    //Updejta progress če si ga slučajno dodal

    const newProgress = currentProgress + 1;
    const challengeRef = doc(db, "users", user.uid, "challenges", challengeId);

    // ubistvu das try {}catch {} block in pol updtejdas Document v bazi kot bi dodajal nov object
    try {
      await updateDoc(challengeRef, {
        "progress.daysCompleted": newProgress,
        "progress.lastUpdated": new Date().toISOString(),
      });

      // Update local state
      setChallenges(
        challenges.map((challenge) =>
          challenge.id === challengeId
            ? {
                ...challenge,
                progress: {
                  ...challenge.progress,
                  daysCompleted: newProgress,
                  lastUpdated: new Date().toISOString(),
                },
              }
            : challenge
        )
      );

      // Show confetti if challenge is completed
      if (newProgress >= finalDays) {
        setConfettiCardId(challengeId);
        setTimeout(() => setConfettiCardId(null), 5000); // Hide confetti after 5 seconds
      }

      toast.success("Day added successfully!");
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Challenges</h2>
      {!user ? (
        <button
          className="bg-gray-800 text-slate-100 px-6 py-2 rounded-lg font-semibold shadow hover:scale-105 transition-transform"
          onClick={() => (window.location.href = "/auth")}
        >
          Login to see your challenges
        </button>
      ) : challenges.length === 0 ? (
        <p>No challenges found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {challenges
            .map((challenge) => {
              const fromDate = challenge.from.toDate();
              const toDate = challenge.to.toDate();
              const finalDays = Math.ceil(
                (toDate - fromDate) / (1000 * 60 * 60 * 24)
              );
              const progress = challenge.progress?.daysCompleted || 0;
              const progressPercentage = (progress * 100) / finalDays;
              const isCompleted = progress >= finalDays;

              return {
                ...challenge,
                fromDate,
                toDate,
                finalDays,
                progress,
                progressPercentage,
                isCompleted,
              };
            })
            .sort((a, b) => {
              // First sort by completion status (in-progress first)
              if (a.isCompleted !== b.isCompleted) {
                return a.isCompleted ? 1 : -1;
              }
              // Then sort by progress percentage (highest to lowest)
              return b.progressPercentage - a.progressPercentage;
            })
            .map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                handleAddDay={handleAddDay}
                showConfetti={confettiCardId === challenge.id}
              />
            ))}
        </div>
      )}
    </div>
  );
}

function ChallengeCard({ challenge, handleAddDay, showConfetti }) {
  const cardRef = useRef(null);
  const [cardSize, setCardSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (showConfetti && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setCardSize({ width: rect.width, height: rect.height });
    }
  }, [showConfetti]);

  return (
    <div
      ref={cardRef}
      className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow relative overflow-visible"
    >
      {showConfetti && (
        <div className="absolute left-0 top-0 w-full h-full pointer-events-none z-20">
          <Confetti
            width={cardSize.width || 300}
            height={cardSize.height || 200}
            numberOfPieces={120}
            gravity={0.3}
            recycle={false}
            run={showConfetti}
          />
        </div>
      )}
      <div className="flex justify-between items-start mb-2">
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-1">
            <div
              className={`w-2 h-2 rounded-full ${
                challenge.isCompleted
                  ? "bg-green-500"
                  : challenge.progress === 0
                  ? "bg-gray-500"
                  : "bg-yellow-500"
              }`}
            />
            <span className="text-xs text-gray-500">
              {challenge.isCompleted
                ? "Completed"
                : challenge.progress === 0
                ? "Not yet started"
                : "In Progress"}
            </span>
          </div>
          <h3 className="text-lg font-bold flex items-center">
            <span className="mr-2">
              {emojiMap[challenge.activity?.trim?.().toLowerCase() || ""]}
            </span>
            <span>{challenge.activity}</span>
          </h3>
        </div>
        <div className="flex flex-col items-end gap-2 justify-end">
          <span className="text-sm text-gray-500">{challenge.time} mins</span>

          <button
            onClick={() =>
              navigator.clipboard
                .writeText(
                  `https://may-project-xi.vercel.app/share/${challenge.id}`
                )
                .then(() => {
                  toast.success("Copied");
                })
                .catch(() => {
                  toast.error("Failed to copy");
                })
            }
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="text-sm text-gray-600 mb-3">
        <p>
          {challenge.fromDate.toLocaleDateString()} -{" "}
          {challenge.toDate.toLocaleDateString()}
        </p>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Progress value={challenge.progressPercentage} className="flex-1" />
          <span className="text-sm font-medium">
            {challenge.progress}/{challenge.finalDays}
          </span>
        </div>
        <button
          onClick={() =>
            handleAddDay(challenge.id, challenge.progress, challenge.finalDays)
          }
          disabled={challenge.isCompleted}
          className={` ${
            challenge.isCompleted
              ? "bg-green-600 hover:bg-green-500"
              : "bg-gray-800"
          } w-full px-3 py-1 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
        >
          {challenge.isCompleted ? "Completed" : "Add Day"}
        </button>
      </div>
    </div>
  );
}
