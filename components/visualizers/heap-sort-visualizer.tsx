"use client"

import { useState, useEffect } from "react"

interface BarState {
  value: number
  state: "default" | "comparing" | "heapifying" | "sorted"
}

export function HeapSortVisualizer() {
  const [bars, setBars] = useState<BarState[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [manual, setManual] = useState("")
  const [speed, setSpeed] = useState(200)

  useEffect(() => {
    generateRandom()
  }, [])

  const generateRandom = () => {
    if (isRunning) return
    const initialBars = Array.from({ length: 10 }, () => ({
      value: Math.floor(Math.random() * 90) + 10,
      state: "default" as const,
    }))
    setBars(initialBars)
  }

  const applyManualArray = () => {
    if (isRunning) return
    if (!manual.trim()) return

    const nums = manual
      .split(",")
      .map((n) => Number(n.trim()))
      .filter((n) => !isNaN(n))

    if (nums.length === 0) return

    const arr = nums.map((n) => ({
      value: n,
      state: "default" as const,
    }))

    setBars(arr)
  }

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

  const performHeapSort = async () => {
    if (isRunning) return
    setIsRunning(true)

    let arr = bars.map((b) => ({ ...b }))

    const swap = async (i: number, j: number) => {
      arr[i].state = "heapifying"
      arr[j].state = "heapifying"
      setBars([...arr])
      await delay(speed)

      const temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp

      setBars([...arr])
      await delay(speed)

      arr[i].state = "default"
      arr[j].state = "default"
      setBars([...arr])
    }

    const heapify = async (n: number, i: number) => {
      let largest = i
      const left = 2 * i + 1
      const right = 2 * i + 2

      if (left < n && arr[left].value > arr[largest].value) largest = left
      if (right < n && arr[right].value > arr[largest].value) largest = right

      if (largest !== i) {
        await swap(i, largest)
        await heapify(n, largest)
      }
    }

    const n = arr.length

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(n, i)
    }

    for (let i = n - 1; i > 0; i--) {
      await swap(0, i)
      arr[i].state = "sorted"
      setBars([...arr])
      await heapify(i, 0)
    }

    arr[0].state = "sorted"
    setBars([...arr])

    setIsRunning(false)
  }

  return (
    <div className="w-full space-y-6 pb-10">
      <div className="flex justify-center gap-2">
        <input
          type="text"
          value={manual}
          onChange={(e) => setManual(e.target.value)}
          placeholder="20, 45, 80, 15"
          disabled={isRunning}
          className="border rounded px-3 py-1 w-64"
        />
        <button
          onClick={applyManualArray}
          disabled={isRunning}
          className="px-4 py-1 rounded bg-blue-500 text-white"
        >
          Set Array
        </button>
        <button
          onClick={generateRandom}
          disabled={isRunning}
          className="px-4 py-1 rounded bg-gray-700 text-white"
        >
          Random
        </button>
      </div>

      <div className="flex justify-center gap-4">
        <label className="text-sm">Speed</label>
        <input
          type="range"
          min={50}
          max={800}
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          disabled={isRunning}
        />
      </div>

      <div className="flex items-end justify-center gap-2 h-56">
        {bars.map((bar, i) => (
          <div
            key={i}
            className="rounded-t transition-all duration-300 ease-in-out flex items-end justify-center relative"
            style={{
              height: `${(bar.value / 120) * 100}%`,
              width: "30px",
              backgroundColor:
                bar.state === "sorted"
                  ? "#22c55e"
                  : bar.state === "heapifying"
                  ? "#eab308"
                  : "#0ea5e9",
              transform: bar.state === "heapifying" ? "scaleY(1.1)" : "scaleY(1)",
            }}
          >
            <span className="absolute -top-5 text-xs">{bar.value}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={performHeapSort}
          disabled={isRunning}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50"
        >
          {isRunning ? "Sorting..." : "Start Sorting"}
        </button>
      </div>
    </div>
  )
}
