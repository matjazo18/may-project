"use client";

import toast from "react-hot-toast";
import { useAuth } from "../app/context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function CopyShareButton({ datum, stvar, time }) {
  const [isLInk, setLink] = useState();
  const router = useRouter();
  const { user } = useAuth();

  const handleClick = async () => {
    if (!user) {
      localStorage.setItem(
        "challengeSelections",
        JSON.stringify({ datum, stvar, time })
      );
      router.push("/auth");
      return;
    }
    if (typeof window === "undefined") return;

    try {
      const challangeId = String(Date.now());
      const fromParam = encodeURIComponent(datum.from.toISOString());
      const toParam = encodeURIComponent(datum.to.toISOString());
      const link = `${window.location.origin}/share/${challangeId}?activity=${stvar}&time=${time}&from=${fromParam}&to=${toParam}`;

      // Store challenge in Firestore first
      await setDoc(doc(db, "users", user.uid, "challenges", challangeId), {
        from: datum.from,
        to: datum.to,
        activity: stvar,
        time: time,
        createdAt: serverTimestamp(),
        progress: {
          daysCompleted: 0,
          lastUpdated: null,
        },
        shareId: challangeId,
      });

      // After successful save, set the link and copy to clipboard
      setLink(link);
      await navigator.clipboard.writeText(link);
      toast.success("Challenge saved and link copied!");

      // Redirect to challenges page
      router.push("/challenges");
    } catch (e) {
      toast.error("Failed to save or copy link");
      console.error(e);
    }
  };

  return (
    <div>
      <button
        className="bg-gray-800 py-2 px-4 rounded-lg text-white flex items-center gap-2 hover:scale-105 transition-transform text-sm"
        onClick={handleClick}
      >
        {!user ? "Login" : "Save & Share"}
      </button>
    </div>
  );
}
