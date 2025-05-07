// components/LoginButton.js
"use client";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAuth } from "../app/context/AuthContext";

export default function LoginButton() {
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <p className="text-sm">Welcome, {user.email}</p>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={isRegister ? handleRegister : handleLogin}
      className="flex flex-col gap-2 max-w-xs mx-auto"
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
      >
        {isRegister ? "Register" : "Log in"}
      </button>
      <button
        type="button"
        onClick={() => setIsRegister((v) => !v)}
        className="text-xs underline text-blue-700 mt-1"
      >
        {isRegister
          ? "Already have an account? Log in"
          : "Don't have an account? Register"}
      </button>
    </form>
  );
}
