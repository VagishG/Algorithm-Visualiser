"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, BookOpen, Code2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [dots, setDots] = useState<
    { top: number; left: number; duration: number }[]
  >([]);

  useEffect(() => {
    const arr = Array.from({ length: 12 }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: 4 + Math.random() * 4,
    }));
    setDots(arr);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-slate-900/5">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Code2 className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold text-foreground">
            Algorithm Visual
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-sm text-muted-foreground hover:text-foreground transition"
          >
            Features
          </Link>
          <Link
            href="/algorithms"
            className="text-sm text-muted-foreground hover:text-foreground transition"
          >
            Explore
          </Link>
          <Link
            href="/algorithms"
            className="text-sm text-muted-foreground hover:text-foreground transition"
          >
            About
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Master Algorithms Through
                <span className="block text-primary">
                  {" "}
                  Interactive Visualization
                </span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                See how algorithms work step-by-step with beautiful animations.
                Understand sorting, searching, and graph algorithms like never
                before.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/algorithms">
                <Button
                  size="lg"
                  className="gap-2 w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Start Learning <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual placeholder */}
          <div className="hidden md:block relative h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border border-primary/20 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-[420px] rounded-2xl border bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden shadow-xl">
                {/* Glow blobs */}
                <motion.div
                  className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-indigo-300 blur-3xl opacity-30"
                  animate={{ x: [0, 20, 0], y: [0, 10, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-cyan-300 blur-3xl opacity-30"
                  animate={{ x: [0, -20, 0], y: [0, -15, 0] }}
                  transition={{ duration: 7, repeat: Infinity }}
                />

                {/* Floating Particles */}
                {dots.map((d, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-gray-300"
                    style={{
                      top: `${d.top}%`,
                      left: `${d.left}%`,
                      opacity: 0.4,
                    }}
                    animate={{
                      y: [-10, 10, -10],
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: d.duration,
                      repeat: Infinity,
                    }}
                  />
                ))}

                {/* Center Graph */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="300" height="300" className="relative">
                    {/* Graph Edges */}
                    <line
                      x1="150"
                      y1="40"
                      x2="60"
                      y2="140"
                      stroke="#cbd5e1"
                      strokeWidth="2"
                    />
                    <line
                      x1="150"
                      y1="40"
                      x2="240"
                      y2="140"
                      stroke="#cbd5e1"
                      strokeWidth="2"
                    />
                    <line
                      x1="60"
                      y1="140"
                      x2="150"
                      y2="240"
                      stroke="#cbd5e1"
                      strokeWidth="2"
                    />
                    <line
                      x1="240"
                      y1="140"
                      x2="150"
                      y2="240"
                      stroke="#cbd5e1"
                      strokeWidth="2"
                    />

                    {/* Nodes with orbit animation */}
                    <motion.circle
                      cx="150"
                      cy="40"
                      r="25"
                      fill="#eef2ff"
                      stroke="#6366f1"
                      strokeWidth="2"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 2.0, repeat: Infinity }}
                      style={{
                        filter: "drop-shadow(0 0 8px rgba(99,102,241,0.3))",
                      }}
                    />

                    <motion.circle
                      cx="60"
                      cy="140"
                      r="25"
                      fill="#fff7ed"
                      stroke="#f59e0b"
                      strokeWidth="2"
                      animate={{ y: [0, 6, 0] }}
                      transition={{ duration: 2.3, repeat: Infinity }}
                      style={{
                        filter: "drop-shadow(0 0 8px rgba(245,158,11,0.3))",
                      }}
                    />

                    <motion.circle
                      cx="240"
                      cy="140"
                      r="25"
                      fill="#ecfeff"
                      stroke="#06b6d4"
                      strokeWidth="2"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2.1, repeat: Infinity }}
                      style={{
                        filter: "drop-shadow(0 0 8px rgba(6,182,212,0.3))",
                      }}
                    />

                    <motion.circle
                      cx="150"
                      cy="240"
                      r="25"
                      fill="#f0fdf4"
                      stroke="#22c55e"
                      strokeWidth="2"
                      animate={{ y: [0, 7, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity }}
                      style={{
                        filter: "drop-shadow(0 0 8px rgba(34,197,94,0.3))",
                      }}
                    />
                  </svg>
                </div>

                {/* Bottom Label */}
                <div className="absolute bottom-5 w-full text-center text-gray-600 text-sm font-medium tracking-wide">
                  Algorithm Visualizer • Interactive Graph Animation
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-secondary/5 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Learn Algorithms Effectively
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive tools to understand computer science concepts
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-lg border border-border bg-card hover:shadow-lg transition">
              <Zap className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Step-by-Step Animation
              </h3>
              <p className="text-muted-foreground">
                Watch algorithms execute in real-time with smooth animations
                showing every operation
              </p>
            </div>

            <div className="p-8 rounded-lg border border-border bg-card hover:shadow-lg transition">
              <Code2 className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Multi-Language Code
              </h3>
              <p className="text-muted-foreground">
                View algorithm implementations in Python, JavaScript, and Java
                side-by-side
              </p>
            </div>

            <div className="p-8 rounded-lg border border-border bg-card hover:shadow-lg transition">
              <BookOpen className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Clear Explanations
              </h3>
              <p className="text-muted-foreground">
                Detailed descriptions of time complexity, use cases, and
                algorithm variations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to master algorithms?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Dive into our interactive platform and start visualizing algorithms
            today
          </p>
          <Link href="/algorithms">
            <Button
              size="lg"
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Explore All Algorithms <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
