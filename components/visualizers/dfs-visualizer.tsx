"use client"

import { useState, useEffect, useRef } from "react"
import { RotateCcw, Play } from "lucide-react"

interface Node {
  id: string
  x: number
  y: number
  state: "unvisited" | "current" | "visited"
}

interface Edge {
  from: string
  to: string
}

export function DFSVisualizer() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [visitedOrder, setVisitedOrder] = useState<string[]>([])
  const [steps, setSteps] = useState(0)
  const [speed, setSpeed] = useState(50)

  const isRunningRef = useRef(false)

  // --------------------------------------------
  // Initialize Graph
  // --------------------------------------------
  useEffect(() => {
    const graphNodes: Node[] = [
      { id: "A", x: 100, y: 100, state: "unvisited" },
      { id: "B", x: 250, y: 80, state: "unvisited" },
      { id: "C", x: 400, y: 100, state: "unvisited" },
      { id: "D", x: 170, y: 220, state: "unvisited" },
      { id: "E", x: 330, y: 220, state: "unvisited" },
      { id: "F", x: 250, y: 340, state: "unvisited" },
    ]

    const directedEdges: Edge[] = [
      { from: "A", to: "B" },
      { from: "A", to: "D" },
      { from: "B", to: "C" },
      { from: "B", to: "E" },
      { from: "D", to: "F" },
      { from: "E", to: "F" },
    ]

    // Convert directed to undirected
    const undirected = [
      ...directedEdges,
      ...directedEdges.map(e => ({ from: e.to, to: e.from })),
    ]

    setNodes(graphNodes)
    setEdges(undirected)
  }, [])

  const wait = (ms: number) => new Promise((res) => setTimeout(res, ms))

  // --------------------------------------------
  // DFS Function
  // --------------------------------------------
  const performDFS = async () => {
    isRunningRef.current = true
    setVisitedOrder([])
    setSteps(0)

    const visited = new Set<string>()
    const order: string[] = []
    let stepCount = 0
    const animationDelay = 200 - speed * 1.95

    const dfs = async (nodeId: string) => {
      if (!isRunningRef.current) return
      if (visited.has(nodeId)) return

      visited.add(nodeId)
      order.push(nodeId)
      setVisitedOrder([...order])
      setSteps(++stepCount)

      setNodes(prev =>
        prev.map(n =>
          n.id === nodeId
            ? { ...n, state: "current" }
            : visited.has(n.id)
            ? { ...n, state: "visited" }
            : n
        )
      )

      await wait(animationDelay)

      const neighbors = edges
        .filter(e => e.from === nodeId)
        .map(e => e.to)
        .filter(nei => !visited.has(nei))

      for (const nei of neighbors) {
        if (!isRunningRef.current) return
        await dfs(nei)
      }

      setNodes(prev =>
        prev.map(n =>
          n.id === nodeId ? { ...n, state: "visited" } : n
        )
      )
    }

    await dfs("A")
    isRunningRef.current = false
  }

  const reset = () => {
    isRunningRef.current = false
    setVisitedOrder([])
    setSteps(0)
    setNodes(prev => prev.map(n => ({ ...n, state: "unvisited" })))
  }

  // --------------------------------------------
  // UI
  // --------------------------------------------
  return (
    <div className="space-y-6">

      {/* Speed */}
      <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
        <label className="text-sm font-medium">Speed: {speed}%</label>
        <input
          type="range"
          min="1"
          max="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="flex-1 accent-red-500"
        />
      </div>

      {/* SVG GRAPH */}
      <svg
        className="w-full border rounded-lg bg-white"
        viewBox="0 0 500 450"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "450px" }}
      >
        {/* Edges */}
        {edges.map((edge, i) => {
          const from = nodes.find((n) => n.id === edge.from)
          const to = nodes.find((n) => n.id === edge.to)
          if (!from || !to) return null

          return (
            <line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="#94a3b8"
              strokeWidth={2}
            />
          )
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r="25"
              fill={
                node.state === "current"
                  ? "#f59e0b"
                  : node.state === "visited"
                  ? "#10b981"
                  : "#e2e8f0"
              }
              stroke="#475569"
              strokeWidth="2"
              style={{
                transition: "0.25s",
                filter:
                  node.state === "current"
                    ? "drop-shadow(0 0 12px rgba(245, 158, 11, 0.9))"
                    : "none",
              }}
            />
            <text
              x={node.x}
              y={node.y}
              dy="0.35em"
              textAnchor="middle"
              className="font-bold"
            >
              {node.id}
            </text>
          </g>
        ))}
      </svg>

      {/* Visitation */}
      <div>
        <label className="font-medium text-sm">Visitation Order</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {visitedOrder.map((n, i) => (
            <div
              key={i}
              className="px-3 py-1 bg-primary text-primary-foreground rounded-full"
            >
              {i + 1}. {n}
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-muted rounded-lg">
          <div className="text-xs text-muted-foreground">Steps</div>
          <div className="text-2xl font-bold">{steps}</div>
        </div>
        <div className="p-3 bg-muted rounded-lg">
          <div className="text-xs text-muted-foreground">Visited Nodes</div>
          <div className="text-2xl font-bold">{visitedOrder.length}</div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-3">
        <button
          onClick={performDFS}
          className="px-6 py-2 bg-primary text-white rounded-lg flex items-center gap-2"
        >
          <Play className="w-4 h-4" />
          Start DFS
        </button>

        <button
          onClick={reset}
          className="px-6 py-2 bg-secondary rounded-lg flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  )
}
