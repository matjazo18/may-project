// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "challangeyourself-97960.firebaseapp.com",
  projectId: "challangeyourself-97960",
  storageBucket: "challangeyourself-97960.firebasestorage.app",
  messagingSenderId: "521697758707",
  appId: "1:521697758707:web:7541ae5791101f5b065686",
  measurementId: "G-1WZZVZ8WQ2",
};

// Initialize Firebase dd
// Initialize only on the client
let app;
let analytics;
if (typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
} else {
  // Avoid SSR execution
  app = null;
  analytics = null;
}

// These will still work in the client
const db = typeof window !== "undefined" ? getFirestore() : null;
const auth = typeof window !== "undefined" ? getAuth() : null;

export { app, db, auth, analytics };
