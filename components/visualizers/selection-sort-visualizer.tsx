"use client"

import { useState, useEffect } from "react"

interface BarState {
  value: number
  state: "default" | "searching" | "sorted"
}

export function SelectionSortVisualizer() {
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

  const performSelectionSort = async () => {
    if (isRunning) return
    setIsRunning(true)

    let arr = bars.map((b) => ({ ...b }))

    for (let i = 0; i < arr.length; i++) {
      let minIndex = i
      arr[i].state = "searching"
      setBars([...arr])
      await delay(speed)

      for (let j = i + 1; j < arr.length; j++) {
        arr[j].state = "searching"
        setBars([...arr])
        await delay(speed)

        if (arr[j].value < arr[minIndex].value) {
          minIndex = j
        }

        arr[j].state = "default"
      }

      const temp = { ...arr[i] }
      arr[i] = { ...arr[minIndex] }
      arr[minIndex] = temp

      arr[i].state = "sorted"
      setBars([...arr])
      await delay(speed)
    }

    setIsRunning(false)
  }

  return (
    <div className="w-full space-y-6 pb-10">
      <div className="flex justify-center gap-2">
        <input
          type="text"
          value={manual}
          onChange={(e) => setManual(e.target.value)}
          placeholder="20, 50, 90, 15"
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
              width: "35px",
              backgroundColor:
                bar.state === "sorted"
                  ? "#22c55e"
                  : bar.state === "searching"
                  ? "#eab308"
                  : "#0ea5e9",
              transform: bar.state === "searching" ? "scaleY(1.1)" : "scaleY(1)",
            }}
          >
            <span className="absolute -top-5 text-xs">{bar.value}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={performSelectionSort}
          disabled={isRunning}
          className="px-6 py-2 bg-primary text-primary-foreground rounded disabled:opacity-50"
        >
          {isRunning ? "Sorting..." : "Start Sorting"}
        </button>
      </div>
    </div>
  )
}
