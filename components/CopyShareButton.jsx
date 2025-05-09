"use client";

import toast from "react-hot-toast";
import { useAuth } from "../app/context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function CopyShareButton({ datum, stvar, time }) {
  const [isLInk, setLink] = useState();
  const [showManualCopy, setShowManualCopy] = useState(false);
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
      const link = `${window.location.origin}/share/${challangeId}`;

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

      setLink(link);
      let copied = false;
      // Try Clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
          await navigator.clipboard.writeText(link);
          toast.success("Challenge saved and link copied!");
          setShowManualCopy(false);
          copied = true;
        } catch (err) {
          // Clipboard API failed, will try fallback
        }
      }
      // Fallback: execCommand hack
      if (!copied) {
        try {
          const textarea = document.createElement("textarea");
          textarea.value = link;
          textarea.setAttribute("readonly", "");
          textarea.style.position = "absolute";
          textarea.style.left = "-9999px";
          document.body.appendChild(textarea);
          textarea.select();
          const successful = document.execCommand("copy");
          document.body.removeChild(textarea);
          if (successful) {
            toast.success("Challenge saved and link copied!");
            setShowManualCopy(false);
            copied = true;
          }
        } catch (err) {
          // Fallback also failed
        }
      }
      // If both methods fail, show manual copy UI
      if (!copied) {
        setShowManualCopy(true);
        toast("Copy the link manually below.");
      }
    } catch (e) {
      setShowManualCopy(true);
      toast.error("Failed to save or copy link. Copy manually below.");
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
      {showManualCopy && isLInk && (
        <div className="mt-3 flex flex-col items-start gap-1">
          <label className="text-xs text-gray-600">Copy this link:</label>
          <input
            type="text"
            value={isLInk}
            readOnly
            className="w-full px-2 py-1 border rounded bg-gray-100 text-gray-800 text-xs"
            onFocus={(e) => e.target.select()}
          />
          <span className="text-xs text-gray-500">
            Tap and hold to copy on mobile.
          </span>
        </div>
      )}
    </div>
  );
}
