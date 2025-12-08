"use client"

import { useState, useEffect } from "react"

interface BarState {
  value: number
  state: "default" | "comparing" | "sorted" | "merging"
}

export function MergeSortVisualizer() {
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

    setBars(nums.map((n) => ({ value: n, state: "default" })))
  }

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

  const performMergeSort = async () => {
    if (isRunning) return
    setIsRunning(true)

    let arr = bars.map((b) => ({ ...b }))

    const merge = async (low: number, mid: number, high: number) => {
      const left = arr.slice(low, mid + 1).map((x) => ({ ...x }))
      const right = arr.slice(mid + 1, high + 1).map((x) => ({ ...x }))

      let i = 0,
        j = 0,
        k = low

      while (i < left.length && j < right.length) {
        arr[k].state = "comparing"
        setBars([...arr])
        await delay(speed)

        if (left[i].value <= right[j].value) {
          arr[k] = { ...left[i], state: "merging" }
          i++
        } else {
          arr[k] = { ...right[j], state: "merging" }
          j++
        }

        setBars([...arr])
        await delay(speed)
        arr[k].state = "default"
        k++
      }

      while (i < left.length) {
        arr[k] = { ...left[i], state: "merging" }
        setBars([...arr])
        await delay(speed)
        arr[k].state = "default"
        i++
        k++
      }

      while (j < right.length) {
        arr[k] = { ...right[j], state: "merging" }
        setBars([...arr])
        await delay(speed)
        arr[k].state = "default"
        j++
        k++
      }

      for (let x = low; x <= high; x++) arr[x].state = "sorted"

      setBars([...arr])
      await delay(speed)
    }

    const mergeSort = async (low: number, high: number) => {
      if (low < high) {
        const mid = Math.floor((low + high) / 2)
        await mergeSort(low, mid)
        await mergeSort(mid + 1, high)
        await merge(low, mid, high)
      } else {
        arr[low].state = "sorted"
        setBars([...arr])
        await delay(speed)
      }
    }

    await mergeSort(0, arr.length - 1)

    for (let x = 0; x < arr.length; x++) arr[x].state = "sorted"

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
          placeholder="30, 10, 40, 80"
          disabled={isRunning}
          className="border px-3 py-1 rounded w-64"
        />
        <button
          onClick={applyManualArray}
          disabled={isRunning}
          className="px-4 py-1 bg-blue-500 text-white rounded"
        >
          Set Array
        </button>
        <button
          onClick={generateRandom}
          disabled={isRunning}
          className="px-4 py-1 bg-gray-700 text-white rounded"
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
              width: "38px",
              backgroundColor:
                bar.state === "sorted"
                  ? "#22c55e"
                  : bar.state === "merging"
                  ? "#eab308"
                  : bar.state === "comparing"
                  ? "#ef4444"
                  : "#0ea5e9",
              transform: bar.state === "merging" ? "scaleY(1.1)" : "scaleY(1)",
            }}
          >
            <span className="absolute -top-5 text-xs">{bar.value}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={performMergeSort}
          disabled={isRunning}
          className="px-6 py-2 bg-primary text-primary-foreground rounded disabled:opacity-50"
        >
          {isRunning ? "Sorting..." : "Start Sorting"}
        </button>
      </div>
    </div>
  )
}
