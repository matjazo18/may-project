// app/auth/page.jsx
"use client";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../lib/firebase";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        await createUserWithEmailAndPassword(auth, email, password);
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
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">
          {isRegister ? "Register" : "Sign In"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 w-80 max-w-full"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-2 py-1 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-2 py-1 rounded"
            required
          />
          {error && <div className="text-red-600 text-xs">{error}</div>}
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
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
          className="text-xs underline text-blue-700 mt-3"
        >
          {isRegister
            ? "Already have an account? Sign In"
            : "Don't have an account? Register"}
        </button>
      </div>
    </>
  );
}
