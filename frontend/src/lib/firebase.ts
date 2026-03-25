import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAoXz7EoU2Fi8-GgHu8_wyd5FRBScKYrDU",
  authDomain: "money-mentor-252bc.firebaseapp.com",
  projectId: "money-mentor-252bc",
  storageBucket: "money-mentor-252bc.firebasestorage.app",
  messagingSenderId: "636986428857",
  appId: "1:636986428857:web:79392c91eb427b9f04fa68",
  measurementId: "G-3CRGSY1D2F"
};

// Initialize Firebase only if not already initialized (to prevent hot module reload issues)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

// Analytics is only supported in browser environments
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, googleProvider, db, analytics };
