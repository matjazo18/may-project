// components/LoginButton.js
"use client";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "../app/context/AuthContext";

export default function LoginButton() {
  const { user, loading } = useAuth();

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
}
