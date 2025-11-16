"use client"

import { useState, useEffect } from "react"

interface BarState {
  value: number
  state: "default" | "pivot" | "sorted" | "comparing"
}

export function QuickSortVisualizer() {
  const [bars, setBars] = useState<BarState[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [comparing, setComparing] = useState<number[]>([])
  const [sorted, setSorted] = useState<number[]>([])

  // Initialize array
  useEffect(() => {
    const initialBars = Array.from({ length: 10 }, () => ({
      value: Math.floor(Math.random() * 100) + 10,
      state: "default" as const,
    }))
    setBars(initialBars)
  }, [])

  const performQuickSort = async () => {
    setIsRunning(true)
    const arr = [...bars.map((b) => b.value)]

    const quickSort = async (low: number, high: number) => {
      if (low < high) {
        const pi = await partition(arr, low, high)
        await quickSort(low, pi - 1)
        await quickSort(pi + 1, high)
      }
    }

    const partition = async (arr: number[], low: number, high: number) => {
      const pivot = arr[high]
      let i = low - 1

      for (let j = low; j < high; j++) {
        setComparing([j, high])
        await new Promise((resolve) => setTimeout(resolve, 200))

        if (arr[j] < pivot) {
          i++
          ;[arr[i], arr[j]] = [arr[j], arr[i]]
          setBars(arr.map((v) => ({ value: v, state: "default" })))
        }
      }
      ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
      setBars(arr.map((v) => ({ value: v, state: "default" })))
      return i + 1
    }

    await quickSort(0, arr.length - 1)
    setSorted(Array.from({ length: arr.length }, (_, i) => i))
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
              width: "30px",
              backgroundColor: sorted.includes(i) ? "#22c55e" : comparing.includes(i) ? "#ef4444" : "#0ea5e9",
            }}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={performQuickSort}
          disabled={isRunning}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          {isRunning ? "Sorting..." : "Start Sorting"}
        </button>
      </div>
    </div>
  )
}
