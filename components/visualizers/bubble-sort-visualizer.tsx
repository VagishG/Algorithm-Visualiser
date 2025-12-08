"use client"

import { useState, useEffect } from "react"

interface BarState {
  value: number
  state: "default" | "comparing" | "sorted" | "active"
}

export function BubbleSortVisualizer() {
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

  const performBubbleSort = async () => {
    if (isRunning) return
    setIsRunning(true)

    const arr = [...bars]
    const n = arr.length

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        arr[j].state = "comparing"
        arr[j + 1].state = "comparing"
        setBars([...arr])
        await delay(speed)

        if (arr[j].value > arr[j + 1].value) {
          arr[j].state = "active"
          arr[j + 1].state = "active"
          setBars([...arr])
          await delay(speed)

          const temp = arr[j]
          arr[j] = arr[j + 1]
          arr[j + 1] = temp
          setBars([...arr])
          await delay(speed)
        }

        arr[j].state = "default"
        arr[j + 1].state = "default"
      }

      arr[n - i - 1].state = "sorted"
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
          placeholder="10, 40, 25, 70"
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
                  : bar.state === "comparing"
                  ? "#ef4444"
                  : bar.state === "active"
                  ? "#eab308"
                  : "#0ea5e9",
              transform: bar.state === "active" ? "scaleY(1.1)" : "scaleY(1)",
            }}
          >
            <span className="absolute -top-5 text-xs">{bar.value}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={performBubbleSort}
          disabled={isRunning}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50"
        >
          {isRunning ? "Sorting..." : "Start Sorting"}
        </button>
      </div>
    </div>
  )
}
