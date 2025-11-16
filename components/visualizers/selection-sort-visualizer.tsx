"use client"

import { useState, useEffect } from "react"

interface BarState {
  value: number
  state: "default" | "searching" | "sorted"
}

export function SelectionSortVisualizer() {
  const [bars, setBars] = useState<BarState[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [searching, setSearching] = useState(-1)
  const [sorted, setSorted] = useState<number[]>([])

  useEffect(() => {
    const initialBars = Array.from({ length: 9 }, () => ({
      value: Math.floor(Math.random() * 100) + 10,
      state: "default" as const,
    }))
    setBars(initialBars)
  }, [])

  const performSelectionSort = async () => {
    setIsRunning(true)
    const arr = [...bars.map((b) => b.value)]
    const n = arr.length

    for (let i = 0; i < n; i++) {
      let minIdx = i
      setSearching(i)

      for (let j = i + 1; j < n; j++) {
        await new Promise((resolve) => setTimeout(resolve, 100))

        if (arr[j] < arr[minIdx]) {
          minIdx = j
        }
      }
      ;[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
      setBars(arr.map((v) => ({ value: v, state: "default" })))
      setSorted((prev) => [...prev, i])
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    setSearching(-1)
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
              width: "35px",
              backgroundColor: sorted.includes(i) ? "#22c55e" : searching === i ? "#f59e0b" : "#0ea5e9",
            }}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={performSelectionSort}
          disabled={isRunning}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          {isRunning ? "Sorting..." : "Start Sorting"}
        </button>
      </div>
    </div>
  )
}
