import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// 🔹 Replace these values with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyADVFp-vNrd_9IrqPiuyFAshHHUpuTuXL0",
  authDomain: "fin-advisor-f6d2f.firebaseapp.com",
  projectId: "fin-advisor-f6d2f",
  storageBucket: "fin-advisor-f6d2f.firebasestorage.app",
  messagingSenderId: "22669204415",
  appId: "1:22669204415:web:3ef8d5386522e8d0015f0a"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// 🔹 Google Sign-In Function
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user; // Return user info
  } catch (error) {
    console.error("Google Sign-In Error:", error);
  }
};

// 🔹 Logout Function
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout Error:", error);
  }
};
