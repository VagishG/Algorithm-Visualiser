"use client"

import { useState, useEffect } from "react"

interface BarState {
  value: number
  state: "default" | "comparing" | "sorted" | "active"
}

export function BubbleSortVisualizer() {
  const [bars, setBars] = useState<BarState[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [comparing, setComparing] = useState<number[]>([])
  const [sorted, setSorted] = useState<number[]>([])

  // Initialize array
  useEffect(() => {
    const initialBars = Array.from({ length: 8 }, () => ({
      value: Math.floor(Math.random() * 100) + 10,
      state: "default" as const,
    }))
    setBars(initialBars)
  }, [])

  // Bubble sort animation
  const performBubbleSort = async () => {
    setIsRunning(true)
    const arr = [...bars]
    const n = arr.length

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setComparing([j, j + 1])

        await new Promise((resolve) => setTimeout(resolve, 200))

        if (arr[j].value > arr[j + 1].value) {
          ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          setBars([...arr])
        }
      }
      setSorted((prev) => [...prev, n - i - 1])
    }

    setSorted(Array.from({ length: n }, (_, i) => i))
    setComparing([])
    setIsRunning(false)
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex items-end justify-center gap-2 h-48">
        {bars.map((bar, i) => (
          <div
            key={i}
            className="rounded-t transition-all duration-100"
            style={{
              height: `${(bar.value / 120) * 100}%`,
              width: "40px",
              backgroundColor: sorted.includes(i) ? "#22c55e" : comparing.includes(i) ? "#ef4444" : "#0ea5e9",
            }}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={performBubbleSort}
          disabled={isRunning}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          {isRunning ? "Sorting..." : "Start Sorting"}
        </button>
      </div>
    </div>
  )
}
