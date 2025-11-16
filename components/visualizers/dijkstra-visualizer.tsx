"use client"

import { useState, useEffect } from "react"
import { RotateCcw, Play } from "lucide-react"

interface Node {
  id: string
  x: number
  y: number
  state: "unvisited" | "active" | "visited"
  distance: number
}

interface Edge {
  from: string
  to: string
  weight: number
}

export function DijkstraVisualizer() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [visitedOrder, setVisitedOrder] = useState<string[]>([])
  const [speed, setSpeed] = useState(100)
  const [shortestPath, setShortestPath] = useState<string[]>([])
  const [steps, setSteps] = useState(0)

  useEffect(() => {
    const graphData: Node[] = [
      { id: "A", x: 100, y: 150, state: "unvisited", distance: Number.POSITIVE_INFINITY },
      { id: "B", x: 250, y: 80, state: "unvisited", distance: Number.POSITIVE_INFINITY },
      { id: "C", x: 400, y: 150, state: "unvisited", distance: Number.POSITIVE_INFINITY },
      { id: "D", x: 250, y: 250, state: "unvisited", distance: Number.POSITIVE_INFINITY },
      { id: "E", x: 400, y: 250, state: "unvisited", distance: Number.POSITIVE_INFINITY },
    ]

    const graphEdges: Edge[] = [
      { from: "A", to: "B", weight: 4 },
      { from: "A", to: "D", weight: 2 },
      { from: "B", to: "C", weight: 2 },
      { from: "B", to: "D", weight: 5 },
      { from: "D", to: "E", weight: 3 },
      { from: "C", to: "E", weight: 2 },
    ]

    const initialNodes = graphData.map((n) => (n.id === "A" ? { ...n, distance: 0, state: "active" as const } : n))
    setNodes(initialNodes)
    setEdges(graphEdges)
  }, [])

  const performDijkstra = async () => {
    setIsRunning(true)
    setVisitedOrder([])
    setShortestPath([])
    setSteps(0)
    let stepCount = 0
    const animationDelay = 200 - speed * 1.95

    const distances = new Map<string, number>()
    const visited = new Set<string>()
    const parent = new Map<string, string | null>()

    nodes.forEach((n) => {
      distances.set(n.id, n.id === "A" ? 0 : Number.POSITIVE_INFINITY)
      parent.set(n.id, null)
    })

    for (let i = 0; i < nodes.length; i++) {
      if (!isRunning) return

      let minNode = null
      let minDist = Number.POSITIVE_INFINITY

      for (const node of nodes) {
        if (!visited.has(node.id) && (distances.get(node.id) ?? Number.POSITIVE_INFINITY) < minDist) {
          minNode = node.id
          minDist = distances.get(node.id) ?? Number.POSITIVE_INFINITY
        }
      }

      if (minNode === null) break

      visited.add(minNode)
      visitedOrder.push(minNode)
      setVisitedOrder([...visitedOrder])
      setSteps(++stepCount)

      setNodes((prev) =>
        prev.map((n) =>
          n.id === minNode
            ? { ...n, state: "visited", distance: minDist }
            : visited.has(n.id)
              ? { ...n, distance: distances.get(n.id) ?? Number.POSITIVE_INFINITY }
              : { ...n, distance: distances.get(n.id) ?? Number.POSITIVE_INFINITY },
        ),
      )

      await new Promise((resolve) => setTimeout(resolve, animationDelay))

      for (const edge of edges.filter((e) => e.from === minNode)) {
        if (!visited.has(edge.to)) {
          const newDist = (distances.get(minNode) ?? Number.POSITIVE_INFINITY) + edge.weight

          if (newDist < (distances.get(edge.to) ?? Number.POSITIVE_INFINITY)) {
            distances.set(edge.to, newDist)
            parent.set(edge.to, minNode)

            setNodes((prev) => prev.map((n) => (n.id === edge.to ? { ...n, state: "active", distance: newDist } : n)))
          }
        }
      }

      await new Promise((resolve) => setTimeout(resolve, animationDelay / 2))
    }

    // Reconstruct shortest path to E
    const path = []
    let current: string | null = "E"
    while (current !== null) {
      path.unshift(current)
      current = parent.get(current) ?? null
    }
    setShortestPath(path)

    setIsRunning(false)
  }

  const resetVisualization = () => {
    const initialNodes = nodes.map((n) => ({
      ...n,
      state: (n.id === "A" ? "active" : "unvisited") as const,
      distance: n.id === "A" ? 0 : Number.POSITIVE_INFINITY,
    }))
    setNodes(initialNodes)
    setVisitedOrder([])
    setShortestPath([])
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

      <svg className="w-full border rounded-lg bg-background" height="350" style={{ minHeight: "350px" }}>
        {edges.map((edge, i) => {
          const fromNode = nodes.find((n) => n.id === edge.from)
          const toNode = nodes.find((n) => n.id === edge.to)
          if (!fromNode || !toNode) return null

          const midX = (fromNode.x + toNode.x) / 2
          const midY = (fromNode.y + toNode.y) / 2

          return (
            <g key={i}>
              <line x1={fromNode.x} y1={fromNode.y} x2={toNode.x} y2={toNode.y} stroke="#64748b" strokeWidth="2" />
              <rect
                x={midX - 15}
                y={midY - 12}
                width="30"
                height="24"
                fill="#ffffff"
                stroke="#64748b"
                strokeWidth="1"
                rx="4"
              />
              <text x={midX} y={midY} textAnchor="middle" dy="0.3em" className="text-xs font-bold" fill="#1e293b">
                {edge.weight}
              </text>
            </g>
          )
        })}

        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r="28"
              fill={node.state === "visited" ? "#10b981" : node.state === "active" ? "#f59e0b" : "#e2e8f0"}
              stroke={node.state === "visited" || node.state === "active" ? "#f97316" : "#64748b"}
              strokeWidth="2"
              style={{
                transition: "all 0.3s ease",
                filter: node.state !== "unvisited" ? "drop-shadow(0 0 10px rgba(245, 158, 11, 0.8))" : "none",
              }}
            />
            <text x={node.x} y={node.y - 8} textAnchor="middle" className="font-bold text-sm" fill="#1e293b">
              {node.id}
            </text>
            <text x={node.x} y={node.y + 8} textAnchor="middle" className="text-xs font-semibold" fill="#1e293b">
              {node.distance === Number.POSITIVE_INFINITY ? "∞" : node.distance}
            </text>
          </g>
        ))}
      </svg>

      <div className="space-y-2">
        <label className="text-sm font-medium">Shortest Path (A to E)</label>
        <div className="flex flex-wrap gap-2 p-3 bg-muted rounded-lg">
          {shortestPath.length > 0 ? (
            shortestPath.map((nodeId, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                  {nodeId}
                </div>
                {i < shortestPath.length - 1 && <span className="text-primary font-bold">→</span>}
              </div>
            ))
          ) : (
            <span className="text-muted-foreground text-sm">Run algorithm to find path</span>
          )}
        </div>
      </div>

      <div className="p-3 bg-muted rounded-lg">
        <div className="text-xs text-muted-foreground">Steps</div>
        <div className="text-2xl font-bold">{steps}</div>
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={performDijkstra}
          disabled={isRunning}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
        >
          <Play className="w-4 h-4" />
          {isRunning ? "Running..." : "Start Dijkstra"}
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
