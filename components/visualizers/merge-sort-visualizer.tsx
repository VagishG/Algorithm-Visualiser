"use client"

import { useState, useEffect } from "react"

interface BarState {
  value: number
  state: "default" | "comparing" | "sorted" | "merging"
}

export function MergeSortVisualizer() {
  const [bars, setBars] = useState<BarState[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [comparing, setComparing] = useState<number[]>([])
  const [sorted, setSorted] = useState<number[]>([])

  useEffect(() => {
    const initialBars = Array.from({ length: 8 }, () => ({
      value: Math.floor(Math.random() * 100) + 10,
      state: "default" as const,
    }))
    setBars(initialBars)
  }, [])

  const performMergeSort = async () => {
    setIsRunning(true)
    setSorted([])
    setComparing([])

    const arr = bars.map((b) => b.value)

    const merge = async (low: number, mid: number, high: number) => {
      const left = arr.slice(low, mid + 1)
      const right = arr.slice(mid + 1, high + 1)
      let i = 0,
        j = 0,
        k = low

      while (i < left.length && j < right.length) {
        setComparing([low + i, mid + 1 + j])
        await new Promise((resolve) => setTimeout(resolve, 150))

        if (left[i] <= right[j]) {
          arr[k++] = left[i++]
        } else {
          arr[k++] = right[j++]
        }
        setBars(arr.map((v) => ({ value: v, state: "default" })))
      }

      while (i < left.length) arr[k++] = left[i++]
      while (j < right.length) arr[k++] = right[j++]

      for (let idx = low; idx <= high; idx++) {
        setSorted((prev) => [...prev, idx])
      }
    }

    const mergeSort = async (low: number, high: number) => {
      if (low < high) {
        const mid = Math.floor((low + high) / 2)
        await mergeSort(low, mid)
        await mergeSort(mid + 1, high)
        await merge(low, mid, high)
      } else {
        setSorted((prev) => [...prev, low])
      }
    }

    await mergeSort(0, arr.length - 1)
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
          onClick={performMergeSort}
          disabled={isRunning}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          {isRunning ? "Sorting..." : "Start Sorting"}
        </button>
      </div>
    </div>
  )
}
