"use client";
import { useState, useEffect } from "react";
import { signInWithGoogle, logout, auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      return setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4">
      {user ? (
        <div className="flex flex-col items-center">
          <img src={user.photoURL || "/default-avatar.png"} alt="User Avatar" className="w-16 h-16 rounded-full" />
          <p className="text-lg font-semibold">{user.displayName}</p>
          <button
            onClick={logout}
            className="px-4 py-2 mt-2 bg-red-500 text-white rounded-md"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={signInWithGoogle}
          className="px-6 py-2 bg-blue-500 text-white rounded-md"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
}
