"use client"

import { useState, useEffect } from "react"

interface BarState {
  value: number
  state: "default" | "comparing" | "sorted" | "heapifying"
}

export function HeapSortVisualizer() {
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

  const performHeapSort = async () => {
    setIsRunning(true)
    const arr = [...bars.map((b) => b.value)]
    const n = arr.length

    const heapify = async (n: number, i: number) => {
      let largest = i
      const left = 2 * i + 1
      const right = 2 * i + 2

      if (left < n && arr[left] > arr[largest]) {
        largest = left
      }
      if (right < n && arr[right] > arr[largest]) {
        largest = right
      }

      if (largest !== i) {
        setComparing([i, largest])
        await new Promise((resolve) => setTimeout(resolve, 200))
        ;[arr[i], arr[largest]] = [arr[largest], arr[i]]
        setBars(arr.map((v) => ({ value: v, state: "default" })))
        await heapify(n, largest)
      }
    }

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(n, i)
    }

    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
      setComparing([0, i])
      await new Promise((resolve) => setTimeout(resolve, 200))
      ;[arr[0], arr[i]] = [arr[i], arr[0]]
      setSorted((prev) => [...prev, i])
      setBars(arr.map((v) => ({ value: v, state: "default" })))
      await heapify(i, 0)
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
          onClick={performHeapSort}
          disabled={isRunning}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          {isRunning ? "Sorting..." : "Start Sorting"}
        </button>
      </div>
    </div>
  )
}
