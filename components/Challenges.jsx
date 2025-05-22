"use client";

import toast from "react-hot-toast";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../app/context/AuthContext";
import { db } from "../lib/firebase";
import {
  collection,
  query,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { Progress } from "@/components/ui/progress";
import Confetti from "react-confetti";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const [confettiCardId, setConfettiCardId] = useState(null);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  const fetchChallenges = async () => {
    if (!user) return;
    try {
      const challengesRef = collection(db, "users", user.uid, "challenges");
      const q = query(challengesRef);
      const querySnapshot = await getDocs(q);
      const challengesList = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const fromDate = data.from.toDate();
        const toDate = data.to.toDate();
        const finalDays = Math.ceil(
          (toDate - fromDate) / (1000 * 60 * 60 * 24)
        );
        const progress = data.progress?.daysCompleted || 0;
        const progressPercentage = (progress * 100) / finalDays;
        const isCompleted = progress >= finalDays;

        return {
          id: doc.id,
          ...data,
          fromDate,
          toDate,
          finalDays,
          progress,
          progressPercentage,
          isCompleted,
        };
      });
      setChallenges(challengesList);
    } catch (error) {
      console.error("Error fetching challenges:", error);
      toast.error("Failed to fetch challenges");
    }
  };

  // Initial fetch when component mounts or user changes
  useEffect(() => {
    fetchChallenges();
  }, [user]);

  // Set up real-time listener for challenge updates
  useEffect(() => {
    if (!user) return;

    const challengesRef = collection(db, "users", user.uid, "challenges");
    const unsubscribe = onSnapshot(
      challengesRef,
      (snapshot) => {
        const challengesList = snapshot.docs.map((doc) => {
          const data = doc.data();
          const fromDate = data.from.toDate();
          const toDate = data.to.toDate();
          const finalDays = Math.ceil(
            (toDate - fromDate) / (1000 * 60 * 60 * 24)
          );
          const progress = data.progress?.daysCompleted || 0;
          const progressPercentage = (progress * 100) / finalDays;
          const isCompleted = progress >= finalDays;

          return {
            id: doc.id,
            ...data,
            fromDate,
            toDate,
            finalDays,
            progress,
            progressPercentage,
            isCompleted,
          };
        });
        setChallenges(challengesList);
      },
      (error) => {
        console.error("Error in real-time listener:", error);
        toast.error("Failed to update challenges");
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [user]);

  const handleAddDay = async (challengeId, currentProgress, finalDays) => {
    if (currentProgress >= finalDays) return;

    const challenge = challenges.find((c) => c.id === challengeId);
    if (!challenge) return;

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

    const newProgress = currentProgress + 1;
    const challengeRef = doc(db, "users", user.uid, "challenges", challengeId);

    try {
      await updateDoc(challengeRef, {
        "progress.daysCompleted": newProgress,
        "progress.lastUpdated": new Date().toISOString(),
      });

      // Show confetti if challenge is completed
      if (newProgress >= finalDays) {
        setConfettiCardId(challengeId);
        setTimeout(() => setConfettiCardId(null), 5000);
      }

      toast.success("Day added successfully!");
    } catch (error) {
      console.error("Error updating progress:", error);
      toast.error("Failed to update progress");
    }
  };

  const getChallengesByStatus = () => {
    const notStarted = challenges.filter((c) => c.progress === 0);
    const inProgress = challenges.filter(
      (c) => c.progress > 0 && !c.isCompleted
    );
    const completed = challenges.filter((c) => c.isCompleted);
    return { notStarted, inProgress, completed };
  };

  const renderSection = (title, challenges, icon, color) => (
    <div className="flex-1 min-w-[300px] bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-center gap-2 mb-4 border-b pb-3">
        <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
        <h2 className="text-xl font-bold">{title}</h2>
        <span className="text-sm text-gray-500">({challenges.length})</span>
      </div>
      {challenges.length === 0 ? (
        <p className="text-gray-500 italic text-sm text-center py-4">
          No challenges in this category
        </p>
      ) : (
        <ScrollArea className=" h-[300px] xl:h-[500px] pr-4">
          <div className="space-y-4">
            {challenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                handleAddDay={handleAddDay}
                showConfetti={confettiCardId === challenge.id}
                onDelete={fetchChallenges}
              />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );

  return (
    <div className="min-h-screen ">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        {!user ? (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Welcome to Challenges</h2>
            <p className="text-gray-600 mb-6">
              Track your progress and achieve your goals
            </p>
            <button
              className="bg-gray-800 text-slate-100 px-6 py-2 rounded-lg font-semibold shadow hover:scale-105 transition-transform"
              onClick={() => (window.location.href = "/auth")}
            >
              Login to see your challenges
            </button>
          </div>
        ) : challenges.length === 0 ? (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">No Challenges Yet</h2>
            <p className="text-gray-600 mb-6">
              Start your journey by creating your first challenge
            </p>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold mb-8 text-center">
              My Challenges
            </h1>
            <div className="flex flex-col md:flex-row gap-6">
              {renderSection(
                "Not Started",
                getChallengesByStatus().notStarted,
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>,
                "bg-gray-100"
              )}

              {renderSection(
                "In Progress",
                getChallengesByStatus().inProgress,
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-yellow-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>,
                "bg-yellow-100"
              )}

              {renderSection(
                "Completed",
                getChallengesByStatus().completed,
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-green-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>,
                "bg-green-100"
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ChallengeCard({ challenge, handleAddDay, showConfetti, onDelete }) {
  const cardRef = useRef(null);
  const [cardSize, setCardSize] = useState({ width: 0, height: 0 });
  const { user } = useAuth();

  useEffect(() => {
    if (showConfetti && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setCardSize({ width: rect.width, height: rect.height });
    }
  }, [showConfetti]);

  const handleDelete = async () => {
    if (!user) return;

    try {
      const challengeRef = doc(
        db,
        "users",
        user.uid,
        "challenges",
        challenge.id
      );
      await deleteDoc(challengeRef);
      toast.success("Challenge deleted successfully");
      onDelete();
    } catch (error) {
      toast.error("Failed to delete challenge");
      console.error(error);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow relative overflow-visible ${
        challenge.isCompleted
          ? "bg-green-50"
          : challenge.progress === 0
          ? "bg-gray-50"
          : "bg-yellow-50"
      }`}
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
            className="hover:scale-110 transition-300 transition-all"
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
                d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135.845-2.098 1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
              />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className="hover:scale-110 transition-300 transition-all text-red-500"
          >
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
                d="M6 18 18 6M6 6l12 12"
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
          className={`${
            challenge.isCompleted
              ? "bg-green-600 hover:bg-green-500"
              : "bg-gray-800 hover:bg-gray-700"
          } w-full px-3 py-1 text-white rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
        >
          {challenge.isCompleted ? "Completed" : "Add Day"}
        </button>
      </div>
    </div>
  );
}
