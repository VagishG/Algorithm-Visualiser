"use client"

import { useState, useEffect } from "react"

interface BarState {
  value: number
  state: "default" | "inserting" | "sorted"
}

export function InsertionSortVisualizer() {
  const [bars, setBars] = useState<BarState[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [inserting, setInserting] = useState(-1)
  const [sorted, setSorted] = useState<number[]>([])

  useEffect(() => {
    const initialBars = Array.from({ length: 9 }, () => ({
      value: Math.floor(Math.random() * 100) + 10,
      state: "default" as const,
    }))
    setBars(initialBars)
  }, [])

  const performInsertionSort = async () => {
    setIsRunning(true)
    setSorted([0])
    const arr = [...bars.map((b) => b.value)]

    for (let i = 1; i < arr.length; i++) {
      setInserting(i)
      const key = arr[i]
      let j = i - 1

      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j]
        setBars(arr.map((v) => ({ value: v, state: "default" })))
        await new Promise((resolve) => setTimeout(resolve, 200))
        j--
      }

      arr[j + 1] = key
      setBars(arr.map((v) => ({ value: v, state: "default" })))
      setSorted((prev) => [...prev, i])
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    setInserting(-1)
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
              backgroundColor: sorted.includes(i) ? "#22c55e" : inserting === i ? "#f59e0b" : "#0ea5e9",
            }}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={performInsertionSort}
          disabled={isRunning}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          {isRunning ? "Sorting..." : "Start Sorting"}
        </button>
      </div>
    </div>
  )
}
