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

    </Card>
  )
}
