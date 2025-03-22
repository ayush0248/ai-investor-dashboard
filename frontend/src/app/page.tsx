"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/AuthModal";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { TrendingUp, BarChart, ShieldCheck } from "lucide-react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      return setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleGetStarted = () => {
    if (user) {
      router.push("/dashboard"); // Redirect if already signed in
    } else {
      setOpen(true); // Open the Signup Modal
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-6">
      {/* Hero Section */}
      <section className="text-center max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          AI-Powered Investing Made Simple
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Get real-time market insights, track your portfolio, and make smarter financial decisions with AI-driven analytics.
        </p>
        <div className="mt-6">
          <Button size="lg" onClick={handleGetStarted}>Get Started</Button>
        </div>
      </section>

      {/* Key Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        <div className="flex flex-col items-center text-center">
          <TrendingUp className="w-12 h-12 text-primary mb-2" />
          <h3 className="text-xl font-semibold">AI Market Predictions</h3>
          <p className="text-sm text-muted-foreground">
            Stay ahead with AI-driven insights for smarter investment decisions.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <BarChart className="w-12 h-12 text-primary mb-2" />
          <h3 className="text-xl font-semibold">Portfolio Tracking</h3>
          <p className="text-sm text-muted-foreground">
            Monitor and optimize your investments in real-time.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <ShieldCheck className="w-12 h-12 text-primary mb-2" />
          <h3 className="text-xl font-semibold">Secure & Private</h3>
          <p className="text-sm text-muted-foreground">
            Your data is encrypted and protected with industry-leading security.
          </p>
        </div>
      </section>

      {/* Signup Modal */}
      <AuthModal open={open} onClose={() => setOpen(false)} />
    </main>
  );
}
