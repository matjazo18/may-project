// context/AuthContext.js
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Check if user document exists in Firestore

        const userDoc = await getDoc(doc(db, "users", user.uid));

        console.log(user.uid);
        console.log("TESTING");

        if (!userDoc.exists()) {
          // Create new user document if it doesn't exist
          await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            createdAt: new Date().toISOString(),
            challanges: user.challanges,
          });
        }
      }
      setUser(user || null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
