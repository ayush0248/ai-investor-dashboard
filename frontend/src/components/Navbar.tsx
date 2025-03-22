"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, User } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../components/ModeToggle";
import { auth } from "@/lib/firebase"; // Ensure firebase is correctly set up

export function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      return setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-background text-foreground border-b shadow-sm z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-foreground"></span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition">
            Home
          </Link>
          <Link href="/dashboard" className="text-sm font-medium text-foreground hover:text-primary transition">
            Dashboard
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ModeToggle />
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-foreground">{user.displayName}</span>
              <Button onClick={handleSignOut}>Sign Out</Button>
            </div>
          ) : (
            <Button onClick={handleGoogleSignIn}>Get Started</Button>
          )}
        </div>
      </div>
    </header>
  );
}
