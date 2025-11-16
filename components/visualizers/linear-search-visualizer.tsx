"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface BarState {
  value: number
  state: "default" | "checking" | "found"
}

export function LinearSearchVisualizer() {
  const [bars, setBars] = useState<BarState[]>([])
  const [target, setTarget] = useState<number | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [foundIndex, setFoundIndex] = useState(-1)
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    const initialBars = Array.from({ length: 8 }, () => ({
      value: Math.floor(Math.random() * 100) + 10,
      state: "default" as const,
    }))
    setBars(initialBars)
  }, [])

  const performLinearSearch = async () => {
    if (target === null) return
    setIsRunning(true)
    setFoundIndex(-1)
    setCurrentIndex(-1)

    for (let i = 0; i < bars.length; i++) {
      setCurrentIndex(i)
      await new Promise((resolve) => setTimeout(resolve, 300))

      if (bars[i].value === target) {
        setFoundIndex(i)
        break
      }
    }

    setCurrentIndex(-1)
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
              width: "40px",
              backgroundColor: foundIndex === i ? "#22c55e" : currentIndex === i ? "#f59e0b" : "#0ea5e9",
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
          <Button onClick={performLinearSearch} disabled={isRunning || target === null}>
            Search
          </Button>
        </div>

        {foundIndex >= 0 && <div className="text-sm text-green-600 font-semibold">Found at index {foundIndex}!</div>}
        {isRunning && <div className="text-sm text-blue-600">Searching...</div>}
      </div>
    </div>
  )
}
