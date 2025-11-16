"use client"

import { useState, useEffect } from "react"

interface BarState {
  value: number
  state: "default" | "comparing" | "sorted" | "gapped"
}

export function ShellSortVisualizer() {
  const [bars, setBars] = useState<BarState[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [comparing, setComparing] = useState<number[]>([])
  const [sorted, setSorted] = useState<number[]>([])

  useEffect(() => {
    const initialBars = Array.from({ length: 10 }, () => ({
      value: Math.floor(Math.random() * 100) + 10,
      state: "default" as const,
    }))
    setBars(initialBars)
  }, [])

  const performShellSort = async () => {
    setIsRunning(true)
    const arr = [...bars.map((b) => b.value)]
    const n = arr.length
    let gap = Math.floor(n / 2)

    while (gap > 0) {
      for (let i = gap; i < n; i++) {
        const temp = arr[i]
        let j = i

        while (j >= gap && arr[j - gap] > temp) {
          setComparing([j - gap, j])
          await new Promise((resolve) => setTimeout(resolve, 200))
          arr[j] = arr[j - gap]
          j -= gap
          setBars(arr.map((v) => ({ value: v, state: "default" })))
        }

        arr[j] = temp
        setBars(arr.map((v) => ({ value: v, state: "default" })))
      }

      gap = Math.floor(gap / 2)
    }

    setSorted(Array.from({ length: n }, (_, idx) => idx))
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
          onClick={performShellSort}
          disabled={isRunning}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          {isRunning ? "Sorting..." : "Start Sorting"}
        </button>
      </div>
    </div>
  )
}
