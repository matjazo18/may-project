// app/auth/page.jsx
"use client";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../lib/firebase";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { db } from "../../lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(userCredential.user, { displayName: name });
        await setDoc(doc(db, "users", userCredential.user.uid), {
          displayName: name,
          email: email,
          photoURL: userCredential.user.photoURL || null,
          createdAt: serverTimestamp(),
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/"); // Redirect to home after login/register
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center mt-10">
        <h2 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400">
          {isRegister ? "Register" : "Sign In"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-80 max-w-full p-6 rounded-xl shadow-lg border border-gray-100"
        >
          {isRegister && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 text-white font-semibold py-2 rounded-md hover:opacity-90 transition-opacity"
            disabled={loading}
          >
            {loading
              ? isRegister
                ? "Registering..."
                : "Signing in..."
              : isRegister
              ? "Register"
              : "Sign In"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setIsRegister((v) => !v)}
          className="text-sm text-pink-600 mt-4 underline hover:text-orange-500 transition-colors"
        >
          {isRegister
            ? "Already have an account? Sign In"
            : "Don't have an account? Register"}
        </button>
      </div>
    </>
  );
}
