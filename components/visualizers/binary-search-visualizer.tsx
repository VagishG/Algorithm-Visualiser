"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface BarState {
  value: number
  state: "default" | "checking" | "found" | "excluded"
}

export function BinarySearchVisualizer() {
  const [bars, setBars] = useState<BarState[]>([])
  const [target, setTarget] = useState<number | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [currentIndices, setCurrentIndices] = useState<number[]>([])
  const [foundIndex, setFoundIndex] = useState(-1)
  const [searchInput, setSearchInput] = useState("")
  const [excluded, setExcluded] = useState<number[]>([])

  useEffect(() => {
    // Create sorted array for binary search
    const arr = Array.from({ length: 10 }, (_, i) => (i + 1) * 10)
    const initialBars = arr.map((v) => ({
      value: v,
      state: "default" as const,
    }))
    setBars(initialBars)
  }, [])

  const performBinarySearch = async () => {
    if (target === null) return
    setIsRunning(true)
    setFoundIndex(-1)
    setExcluded([])

    let left = 0
    let right = bars.length - 1

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      setCurrentIndices([left, mid, right])
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (bars[mid].value === target) {
        setFoundIndex(mid)
        break
      } else if (bars[mid].value < target) {
        setExcluded((prev) => [...prev, ...Array.from({ length: mid - left + 1 }, (_, i) => left + i)])
        left = mid + 1
      } else {
        setExcluded((prev) => [...prev, ...Array.from({ length: right - mid + 1 }, (_, i) => mid + i)])
        right = mid - 1
      }
    }

    setCurrentIndices([])
    setIsRunning(false)
  }

  const handleSearch = (value: string) => {
    setSearchInput(value)
    if (value) {
      setTarget(Number(value))
    }
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex items-end justify-center gap-2 h-48">
        {bars.map((bar, i) => (
          <div
            key={i}
            className="rounded-t transition-all duration-100 relative"
            style={{
              height: `${(bar.value / 120) * 100}%`,
              width: "35px",
              backgroundColor:
                foundIndex === i
                  ? "#22c55e"
                  : currentIndices.includes(i)
                    ? "#f59e0b"
                    : excluded.includes(i)
                      ? "#9ca3af"
                      : "#0ea5e9",
            }}
          >
            <span className="absolute -top-6 left-0 right-0 text-xs font-semibold text-foreground">{bar.value}</span>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Enter number to search..."
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-1"
          />
          <Button onClick={performBinarySearch} disabled={isRunning || target === null}>
            Search
          </Button>
        </div>

        {foundIndex >= 0 && <div className="text-sm text-green-600 font-semibold">Found at index {foundIndex}!</div>}
        {isRunning && <div className="text-sm text-blue-600">Searching...</div>}
        {!isRunning && foundIndex < 0 && target !== null && <div className="text-sm text-red-600">Not found</div>}
      </div>
    </div>
  )
}
