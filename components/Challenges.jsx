"use client";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useAuth } from "../app/context/AuthContext";
import { db } from "../lib/firebase";
import { collection, query, getDocs, updateDoc, doc } from "firebase/firestore";
import { Progress } from "@/components/ui/progress";
import Confetti from "react-confetti";

export default function Challenges() {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
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
  }, [user]);

  const handleAddDay = async (challengeId, currentProgress, finalDays) => {
    if (currentProgress >= finalDays) return;

    // Get the challenge to check last update
    const challenge = challenges.find((c) => c.id === challengeId);
    if (!challenge) return;

    // Check if a day was already added today
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
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 5 seconds
      }

      toast.success("Day added successfully!");
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  return (
    <div className="p-4">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.2}
        />
      )}
      <h2 className="text-2xl font-bold mb-4">My Challenges</h2>
      {challenges.length === 0 ? (
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
              <div
                key={challenge.id}
                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          challenge.isCompleted
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      />
                      <span className="text-xs text-gray-500">
                        {challenge.isCompleted ? "Completed" : "In Progress"}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold">{challenge.activity}</h3>
                  </div>
                  <span className="text-sm text-gray-500">
                    {challenge.time} mins
                  </span>
                </div>

                <div className="text-sm text-gray-600 mb-3">
                  <p>
                    {challenge.fromDate.toLocaleDateString()} -{" "}
                    {challenge.toDate.toLocaleDateString()}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Progress
                      value={challenge.progressPercentage}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium">
                      {challenge.progress}/{challenge.finalDays}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      handleAddDay(
                        challenge.id,
                        challenge.progress,
                        challenge.finalDays
                      )
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
            ))}
        </div>
      )}
    </div>
  );
}
