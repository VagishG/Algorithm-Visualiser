"use client"

import { useState, useCallback } from "react"

export function useAlgorithmVisualization() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [stepIndex, setStepIndex] = useState(0)

  const step = useCallback((action: "play" | "pause" | "next") => {
    if (action === "play") {
      setIsPlaying(true)
    } else if (action === "pause") {
      setIsPlaying(false)
    } else if (action === "next") {
      setStepIndex((prev) => prev + 1)
    }
  }, [])

  const reset = useCallback(() => {
    setIsPlaying(false)
    setStepIndex(0)
    setSpeed(1)
  }, [])

  return {
    isPlaying,
    speed,
    setSpeed,
    stepIndex,
    step,
    reset,
  }
}
