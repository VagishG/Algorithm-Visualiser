"use client"

import { Button } from "@/components/ui/button"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Play, Pause, RotateCcw, Plus, Minus, StepForward } from "lucide-react"
import { useAlgorithmVisualization } from "@/hooks/use-algorithm-visualization"
import { BubbleSortVisualizer } from "./visualizers/bubble-sort-visualizer"
import { QuickSortVisualizer } from "./visualizers/quick-sort-visualizer"
import { BinarySearchVisualizer } from "./visualizers/binary-search-visualizer"
import { LinearSearchVisualizer } from "./visualizers/linear-search-visualizer"
import { MergeSortVisualizer } from "./visualizers/merge-sort-visualizer"
import { InsertionSortVisualizer } from "./visualizers/insertion-sort-visualizer"
import { SelectionSortVisualizer } from "./visualizers/selection-sort-visualizer"
import { HeapSortVisualizer } from "./visualizers/heap-sort-visualizer"
import { ShellSortVisualizer } from "./visualizers/shell-sort-visualizer"
import { DFSVisualizer } from "./visualizers/dfs-visualizer"
import { BFSVisualizer } from "./visualizers/bfs-visualizer"
import { DijkstraVisualizer } from "./visualizers/dijkstra-visualizer"

interface AlgorithmVisualizationProps {
  algorithmId: string
}

export function AlgorithmVisualization({ algorithmId }: AlgorithmVisualizationProps) {
  const { isPlaying, speed, setSpeed, step, reset } = useAlgorithmVisualization()
  const [stepCount, setStepCount] = useState(0)

  const renderVisualizer = () => {
    switch (algorithmId) {
      case "bubble-sort":
        return <BubbleSortVisualizer />
      case "quick-sort":
        return <QuickSortVisualizer />
      case "merge-sort":
        return <MergeSortVisualizer />
      case "insertion-sort":
        return <InsertionSortVisualizer />
      case "selection-sort":
        return <SelectionSortVisualizer />
      case "heap-sort":
        return <HeapSortVisualizer />
      case "shell-sort":
        return <ShellSortVisualizer />
      case "binary-search":
        return <BinarySearchVisualizer />
      case "linear-search":
        return <LinearSearchVisualizer />
      case "depth-first-search":
        return <DFSVisualizer />
      case "breadth-first-search":
        return <BFSVisualizer />
      case "dijkstra":
        return <DijkstraVisualizer />
      default:
        return <div className="text-center py-12 text-muted-foreground">Visualizer not available</div>
    }
  }

  const handleReset = () => {
    reset()
    setStepCount(0)
  }

  return (
    <Card className="p-6 space-y-6 border border-border">
      {/* Visualization Area */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 rounded-lg p-8 min-h-96 flex items-center justify-center border border-border">
        {renderVisualizer()}
      </div>

      {/* Controls */}
      <div className="space-y-4 pt-2 border-t border-border">
        {/* Primary Controls */}
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={isPlaying ? "default" : "outline"}
            size="sm"
            onClick={() => step(isPlaying ? "pause" : "play")}
            className="gap-2"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Play
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={() => step("next")} className="gap-2" disabled={isPlaying}>
            <StepForward className="w-4 h-4" />
            Step
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset} className="gap-2 bg-transparent">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>

        {/* Speed Control */}
        <div className="flex items-center gap-4 pt-2">
          <span className="text-xs font-semibold text-foreground uppercase tracking-wide">Speed</span>
          <div className="flex items-center gap-2 flex-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSpeed(Math.max(0.25, speed - 0.25))}
              className="gap-2"
              disabled={isPlaying}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <div className="flex-1 max-w-xs h-2 bg-secondary rounded-full">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all"
                style={{ width: `${(speed / 2) * 100}%` }}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSpeed(Math.min(2, speed + 0.25))}
              className="gap-2"
              disabled={isPlaying}
            >
              <Plus className="w-4 h-4" />
            </Button>
            <span className="text-xs font-mono text-muted-foreground w-10 text-right">{speed.toFixed(2)}x</span>
          </div>
        </div>

        {/* Info */}
        <div className="text-xs text-muted-foreground bg-primary/5 dark:bg-primary/10 rounded-lg p-3 border border-primary/20">
          Use Play/Pause to watch the algorithm execute, or Step to go through it manually. Adjust speed for better
          comprehension.
        </div>
      </div>
    </Card>
  )
}
