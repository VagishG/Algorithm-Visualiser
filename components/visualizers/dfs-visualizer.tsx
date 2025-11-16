"use client"

import { useState, useEffect } from "react"
import { RotateCcw, Play } from "lucide-react"

interface Node {
  id: string
  x: number
  y: number
  state: "unvisited" | "visiting" | "visited" | "current"
}

interface Edge {
  from: string
  to: string
}

export function DFSVisualizer() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [visitedOrder, setVisitedOrder] = useState<string[]>([])
  const [speed, setSpeed] = useState(100)
  const [currentNode, setCurrentNode] = useState<string | null>(null)
  const [steps, setSteps] = useState(0)

  // Initialize graph
  useEffect(() => {
    const graphNodes: Node[] = [
      { id: "A", x: 100, y: 100, state: "unvisited" },
      { id: "B", x: 250, y: 80, state: "unvisited" },
      { id: "C", x: 400, y: 100, state: "unvisited" },
      { id: "D", x: 170, y: 220, state: "unvisited" },
      { id: "E", x: 330, y: 220, state: "unvisited" },
      { id: "F", x: 250, y: 320, state: "unvisited" },
    ]

    const originalEdges: Edge[] = [
      { from: "A", to: "B" },
      { from: "A", to: "D" },
      { from: "B", to: "C" },
      { from: "B", to: "E" },
      { from: "D", to: "F" },
      { from: "E", to: "F" },
    ]

    // Convert to undirected (add reverse edges)
    const undirectedEdges = [
      ...originalEdges,
      ...originalEdges.map(e => ({ from: e.to, to: e.from }))
    ]

    setNodes(graphNodes)
    setEdges(undirectedEdges)
  }, [])

  const performDFS = async () => {
    setIsRunning(true)
    setVisitedOrder([])
    setSteps(0)

    const visited = new Set<string>()
    const order: string[] = []
    let stepCount = 0
    const animationDelay = 200 - speed * 1.95

    const dfs = async (nodeId: string) => {
      if (visited.has(nodeId)) return

      visited.add(nodeId)
      order.push(nodeId)
      setVisitedOrder([...order])
      setCurrentNode(nodeId)
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

      await new Promise(res => setTimeout(res, animationDelay))

      const neighbors = edges
        .filter(e => e.from === nodeId)
        .map(e => e.to)
        .filter(nei => !visited.has(nei))

      for (const nei of neighbors) {
        if (!isRunning) return
        await dfs(nei)
      }

      // Mark as visited
      setNodes(prev =>
        prev.map(n => (n.id === nodeId ? { ...n, state: "visited" } : n))
      )
    }

    await dfs("A")
    setCurrentNode(null)
    setIsRunning(false)
  }

  const resetVisualization = () => {
    setNodes(prev => prev.map(n => ({ ...n, state: "unvisited" })))
    setVisitedOrder([])
    setCurrentNode(null)
    setSteps(0)
    setIsRunning(false)
  }

  return (
    <div className="w-full space-y-6">
      {/* Speed Control */}
      <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
        <label className="text-sm font-medium">Speed: {speed}%</label>
        <input
          type="range"
          min="1"
          max="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          disabled={isRunning}
          className="flex-1 accent-red-500"
        />
      </div>

      {/* Graph SVG */}
      <svg className="w-full border rounded-lg bg-background" height="400">
        {/* Edges */}
        {edges.map((edge, i) => {
          const fromNode = nodes.find(n => n.id === edge.from)
          const toNode = nodes.find(n => n.id === edge.to)
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

        {/* Nodes */}
        {nodes.map(node => (
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
              stroke={node.state === "current" ? "#f97316" : "#64748b"}
              strokeWidth="2"
              style={{
                transition: "all 0.3s ease",
                filter:
                  node.state === "current"
                    ? "drop-shadow(0 0 12px rgba(245, 158, 11, 0.8))"
                    : "none",
              }}
            />
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dy="0.3em"
              className="font-bold text-sm"
              fill="#1e293b"
            >
              {node.id}
            </text>
          </g>
        ))}
      </svg>

      {/* Visitation Order */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Visitation Order</label>
        <div className="flex flex-wrap gap-2">
          {visitedOrder.map((nodeId, i) => (
            <div
              key={i}
              className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium"
            >
              {i + 1}. {nodeId}
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
          disabled={isRunning}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg flex items-center gap-2"
        >
          <Play className="w-4 h-4" />
          {isRunning ? "Running..." : "Start DFS"}
        </button>

        <button
          onClick={resetVisualization}
          disabled={isRunning}
          className="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  )
}
