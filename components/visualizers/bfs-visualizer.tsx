"use client"

import { useState, useEffect } from "react"
import { RotateCcw, Play } from "lucide-react"

interface Node {
  id: string
  x: number
  y: number
  state: "unvisited" | "queued" | "visited" | "current"
}

interface Edge {
  from: string
  to: string
}

export function BFSVisualizer() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [visitedOrder, setVisitedOrder] = useState<string[]>([])
  const [speed, setSpeed] = useState(100)
  const [currentNode, setCurrentNode] = useState<string | null>(null)
  const [queue, setQueue] = useState<string[]>([])
  const [steps, setSteps] = useState(0)

  useEffect(() => {
    const graphData: Node[] = [
      { id: "A", x: 100, y: 100, state: "unvisited" },
      { id: "B", x: 250, y: 80, state: "unvisited" },
      { id: "C", x: 400, y: 100, state: "unvisited" },
      { id: "D", x: 170, y: 220, state: "unvisited" },
      { id: "E", x: 330, y: 220, state: "unvisited" },
      { id: "F", x: 250, y: 320, state: "unvisited" },
    ]

    const graphEdges: Edge[] = [
      { from: "A", to: "B" },
      { from: "A", to: "D" },
      { from: "B", to: "C" },
      { from: "B", to: "E" },
      { from: "D", to: "F" },
      { from: "E", to: "F" },
    ]

    setNodes(graphData)
    setEdges(graphEdges)
  }, [])

  const performBFS = async () => {
    setIsRunning(true)
    setVisitedOrder([])
    setQueue([])
    setSteps(0)
    let stepCount = 0
    const animationDelay = 200 - speed * 1.95

    const visited = new Set<string>()
    const queue: string[] = ["A"]
    const order: string[] = []
    visited.add("A")

    while (queue.length > 0) {
      if (!isRunning) return

      const nodeId = queue.shift()!
      order.push(nodeId)
      setVisitedOrder([...order])
      setCurrentNode(nodeId)
      setQueue([...queue])
      setSteps(++stepCount)

      setNodes((prev) =>
        prev.map((n) =>
          n.id === nodeId
            ? { ...n, state: "current" }
            : queue.includes(n.id)
              ? { ...n, state: "queued" }
              : visited.has(n.id)
                ? { ...n, state: "visited" }
                : n,
        ),
      )

      await new Promise((resolve) => setTimeout(resolve, animationDelay))

      const neighbors = edges
        .filter((e) => e.from === nodeId)
        .map((e) => e.to)
        .filter((id) => !visited.has(id))

      for (const neighbor of neighbors) {
        visited.add(neighbor)
        queue.push(neighbor)

        setNodes((prev) => prev.map((n) => (n.id === neighbor ? { ...n, state: "queued" } : n)))
      }

      setQueue([...queue])
      setNodes((prev) => prev.map((n) => (n.id === nodeId ? { ...n, state: "visited" } : n)))
      await new Promise((resolve) => setTimeout(resolve, animationDelay / 2))
    }

    setCurrentNode(null)
    setQueue([])
    setIsRunning(false)
  }

  const resetVisualization = () => {
    setNodes((prev) => prev.map((n) => ({ ...n, state: "unvisited" })))
    setVisitedOrder([])
    setCurrentNode(null)
    setQueue([])
    setSteps(0)
    setIsRunning(false)
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
        <label className="text-sm font-medium">Speed: {speed}%</label>
        <input
          type="range"
          min="1"
          max="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          disabled={isRunning}
          className="flex-1"
        />
      </div>

      <svg className="w-full border rounded-lg bg-background" height="400" style={{ minHeight: "400px" }}>
        {edges.map((edge, i) => {
          const fromNode = nodes.find((n) => n.id === edge.from)
          const toNode = nodes.find((n) => n.id === edge.to)
          if (!fromNode || !toNode) return null

          return (
            <line
              key={i}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="#64748b"
              strokeWidth="2"
            />
          )
        })}

        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r="25"
              fill={
                node.state === "current"
                  ? "#f59e0b"
                  : node.state === "queued"
                    ? "#06b6d4"
                    : node.state === "visited"
                      ? "#10b981"
                      : "#e2e8f0"
              }
              stroke={node.state === "current" ? "#f97316" : "#64748b"}
              strokeWidth="2"
              style={{
                transition: "all 0.3s ease",
                filter: node.state === "current" ? "drop-shadow(0 0 10px rgba(245, 158, 11, 0.8))" : "none",
              }}
            />
            <text x={node.x} y={node.y} textAnchor="middle" dy="0.3em" className="font-bold text-sm" fill="#1e293b">
              {node.id}
            </text>
          </g>
        ))}
      </svg>

      <div className="space-y-2">
        <label className="text-sm font-medium">Queue</label>
        <div className="flex gap-2 p-3 bg-muted rounded-lg min-h-10">
          {queue.length === 0 ? (
            <span className="text-muted-foreground text-sm">Empty</span>
          ) : (
            queue.map((nodeId, i) => (
              <div key={i} className="px-3 py-1 bg-cyan-500 text-white rounded text-sm font-medium">
                {nodeId}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Visitation Order</label>
        <div className="flex flex-wrap gap-2">
          {visitedOrder.map((nodeId, i) => (
            <div key={i} className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
              {i + 1}. {nodeId}
            </div>
          ))}
        </div>
      </div>

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

      <div className="flex justify-center gap-3">
        <button
          onClick={performBFS}
          disabled={isRunning}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
        >
          <Play className="w-4 h-4" />
          {isRunning ? "Running..." : "Start BFS"}
        </button>
        <button
          onClick={resetVisualization}
          disabled={isRunning}
          className="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 disabled:opacity-50 flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  )
}
