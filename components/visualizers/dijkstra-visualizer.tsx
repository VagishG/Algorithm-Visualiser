"use client"

import { useState, useEffect, useRef } from "react"
import { RotateCcw, Play } from "lucide-react"

interface Node {
  id: string
  x: number
  y: number
  distance: number
  state: "unvisited" | "active" | "visited"
}

interface Edge {
  from: string
  to: string
  weight: number
}

export function DijkstraVisualizer() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [visitedOrder, setVisitedOrder] = useState<string[]>([])
  const [shortestPath, setShortestPath] = useState<string[]>([])
  const [speed, setSpeed] = useState(50)
  const [steps, setSteps] = useState(0)

  const isRunningRef = useRef(false)

  // ----------------------------
  // INIT GRAPH
  // ----------------------------
  useEffect(() => {
    const graphNodes: Node[] = [
      { id: "A", x: 100, y: 150, distance: 0, state: "active" },
      { id: "B", x: 250, y: 80, distance: Infinity, state: "unvisited" },
      { id: "C", x: 400, y: 150, distance: Infinity, state: "unvisited" },
      { id: "D", x: 250, y: 250, distance: Infinity, state: "unvisited" },
      { id: "E", x: 400, y: 250, distance: Infinity, state: "unvisited" },
    ]

    const directedEdges: Edge[] = [
      { from: "A", to: "B", weight: 4 },
      { from: "A", to: "D", weight: 2 },
      { from: "B", to: "C", weight: 2 },
      { from: "B", to: "D", weight: 5 },
      { from: "D", to: "E", weight: 3 },
      { from: "C", to: "E", weight: 2 },
    ]

    const undirected = [
      ...directedEdges,
      ...directedEdges.map((e) => ({ from: e.to, to: e.from, weight: e.weight })),
    ]

    setNodes(graphNodes)
    setEdges(undirected)
  }, [])

  const wait = (ms: number) => new Promise(res => setTimeout(res, ms))

  // ----------------------------
  // DIJKSTRA
  // ----------------------------
  const performDijkstra = async () => {
    isRunningRef.current = true
    setVisitedOrder([])
    setShortestPath([])
    setSteps(0)

    let stepCount = 0
    const animationDelay = 200 - speed * 1.95

    const dist = new Map<string, number>()
    const parent = new Map<string, string | null>()
    const visited = new Set<string>()

    nodes.forEach((n) => {
      dist.set(n.id, n.id === "A" ? 0 : Infinity)
      parent.set(n.id, null)
    })

    for (let i = 0; i < nodes.length; i++) {
      if (!isRunningRef.current) return

      // PICK MINIMUM DISTANCE NODE
      let minNode: string | null = null
      let minDist = Infinity

      for (const n of nodes) {
        if (!visited.has(n.id) && dist.get(n.id)! < minDist) {
          minDist = dist.get(n.id)!
          minNode = n.id
        }
      }

      if (!minNode) break
      visited.add(minNode)

      setVisitedOrder((prev) => [...prev, minNode])
      setSteps(++stepCount)

      // highlight selected node
      setNodes((prev) =>
        prev.map((n) =>
          n.id === minNode
            ? { ...n, state: "visited" }
            : visited.has(n.id)
            ? { ...n, state: "visited" }
            : { ...n, state: "unvisited" }
        )
      )

      await wait(animationDelay)

      // RELAX EDGES
      const neighbors = edges.filter((e) => e.from === minNode)

      for (const edge of neighbors) {
        if (visited.has(edge.to)) continue

        const newDist = dist.get(minNode)! + edge.weight

        if (newDist < dist.get(edge.to)!) {
          dist.set(edge.to, newDist)
          parent.set(edge.to, minNode)

          setNodes((prev) =>
            prev.map((n) =>
              n.id === edge.to
                ? { ...n, state: "active", distance: newDist }
                : n
            )
          )
          await wait(animationDelay)
        }
      }
    }

    // ----------------------------
    // SHORTEST PATH A → E
    // ----------------------------
    let path: string[] = []
    let curr: string | null = "E"

    while (curr) {
      path.unshift(curr)
      curr = parent.get(curr) ?? null
    }

    setShortestPath(path)
    isRunningRef.current = false
  }

  // ----------------------------
  // RESET
  // ----------------------------
  const resetVisualization = () => {
    isRunningRef.current = false
    setVisitedOrder([])
    setShortestPath([])
    setSteps(0)

    setNodes((prev) =>
      prev.map((n) => ({
        ...n,
        state: n.id === "A" ? "active" : "unvisited",
        distance: n.id === "A" ? 0 : Infinity,
      }))
    )
  }

  // ----------------------------
  // UI
  // ----------------------------
  return (
    <div className="space-y-6">

      {/* SPEED CONTROL */}
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
        viewBox="0 0 500 350"
        style={{ width: "100%", height: "350px" }}
      >
        {/* EDGES */}
        {edges.map((edge, i) => {
          const f = nodes.find((n) => n.id === edge.from)
          const t = nodes.find((n) => n.id === edge.to)
          if (!f || !t) return null

          const midX = (f.x + t.x) / 2
          const midY = (f.y + t.y) / 2

          return (
            <g key={i}>
              <line x1={f.x} y1={f.y} x2={t.x} y2={t.y} stroke="#94a3b8" strokeWidth="2" />

              <rect
                x={midX - 15}
                y={midY - 12}
                width="30"
                height="24"
                rx="4"
                fill="white"
                stroke="#64748b"
                strokeWidth="1"
              />

              <text x={midX} y={midY} dy="0.3em" textAnchor="middle" className="text-xs font-bold">
                {edge.weight}
              </text>
            </g>
          )
        })}

        {/* NODES */}
        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r="28"
              fill={
                node.state === "visited"
                  ? "#10b981"
                  : node.state === "active"
                  ? "#f59e0b"
                  : "#e2e8f0"
              }
              stroke="#475569"
              strokeWidth="2"
              style={{
                transition: "0.25s",
                filter: node.state !== "unvisited" ? "drop-shadow(0 0 10px rgba(245,158,11,0.7))" : "none"
              }}
            />

            <text x={node.x} y={node.y - 10} textAnchor="middle" className="font-bold">
              {node.id}
            </text>

            <text x={node.x} y={node.y + 10} textAnchor="middle" className="text-xs">
              {node.distance === Infinity ? "∞" : node.distance}
            </text>
          </g>
        ))}
      </svg>

      {/* SHORTEST PATH */}
      <div>
        <label className="font-medium text-sm">Shortest Path (A → E)</label>
        <div className="flex flex-wrap gap-2 p-2 bg-muted rounded-lg mt-2">
          {shortestPath.length === 0 ? (
            <span className="text-muted-foreground text-sm">Run algorithm to compute path</span>
          ) : (
            shortestPath.map((n, i) => (
              <span key={i} className="px-3 py-1 bg-primary text-white rounded-full">
                {n}
              </span>
            ))
          )}
        </div>
      </div>

      {/* STEPS */}
      <div className="p-3 bg-muted rounded-lg text-center">
        <div className="text-xs text-muted-foreground">Steps</div>
        <div className="text-2xl font-bold">{steps}</div>
      </div>

      {/* BUTTONS */}
      <div className="flex justify-center gap-3">
        <button
          onClick={performDijkstra}
          className="px-6 py-2 bg-primary text-white rounded-lg flex items-center gap-2"
        >
          <Play className="w-4 h-4" /> Start Dijkstra
        </button>

        <button
          onClick={resetVisualization}
          className="px-6 py-2 bg-secondary rounded-lg flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
      </div>
    </div>
  )
}
