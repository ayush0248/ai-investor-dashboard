"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { auth, googleProvider as provider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      onClose(); // Close the modal after successful login
      router.push("/dashboard"); // Redirect to Dashboard
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Get Started</DialogTitle>
        </DialogHeader>
        <Button onClick={handleGoogleSignIn} className="w-full">
          Sign up with Google
        </Button>
      </DialogContent>
    </Dialog>
  );
}
