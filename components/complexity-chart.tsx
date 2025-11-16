"use client"

import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts"
import { Card } from "@/components/ui/card"

interface ComplexityChartProps {
  timeComplexity: string
}

export function ComplexityChart({ timeComplexity }: ComplexityChartProps) {
  const data = [
    { n: "10", "O(n)": 10, "O(n log n)": 33, "O(n²)": 100, "O(log n)": 3.3, "O(2^n)": 1024 },
    { n: "50", "O(n)": 50, "O(n log n)": 282, "O(n²)": 2500, "O(log n)": 5.6, "O(2^n)": 1125899906842624 },
    { n: "100", "O(n)": 100, "O(n log n)": 664, "O(n²)": 10000, "O(log n)": 6.6, "O(2^n)": Number.POSITIVE_INFINITY },
    {
      n: "1000",
      "O(n)": 1000,
      "O(n log n)": 9966,
      "O(n²)": 1000000,
      "O(log n)": 10,
      "O(2^n)": Number.POSITIVE_INFINITY,
    },
  ]

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-4">Algorithm Complexity Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="n" />
              <YAxis scale="log" />
              <Tooltip formatter={(value) => (value === Number.POSITIVE_INFINITY ? "∞" : value)} />
              <Legend />
              <Line type="monotone" dataKey="O(n)" stroke="#0ea5e9" />
              <Line type="monotone" dataKey="O(n log n)" stroke="#22c55e" />
              <Line type="monotone" dataKey="O(n²)" stroke="#ef4444" />
              <Line type="monotone" dataKey="O(log n)" stroke="#f59e0b" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-secondary/5 rounded-lg p-4 space-y-2">
          <p className="text-xs font-semibold text-foreground">
            Current Algorithm: <span className="text-primary">{timeComplexity}</span>
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            This chart shows how different time complexities scale as the input size (n) increases. Lower is better.
          </p>
        </div>
      </div>
    </Card>
  )
}
