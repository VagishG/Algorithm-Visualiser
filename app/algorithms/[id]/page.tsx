"use client"

import React, { useMemo } from "react"
import { ALGORITHMS_DATA } from "@/lib/algorithms-data"
import { AlgorithmVisualization } from "@/components/algorithm-visualization"
import { CodeDisplay } from "@/components/code-display"
import { ComplexityChart } from "@/components/complexity-chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, BookOpen, Zap } from "lucide-react"

export default function AlgorithmDetailPage({ params }) {
  const p = React.use(params)

  const algorithm = useMemo(() => {
    return ALGORITHMS_DATA.find((algo) => algo.id === p.id)
  }, [p.id])

  if (!algorithm) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Algorithm not found</h1>
          <Link href="/algorithms">
            <Button className="mt-4">Back to Algorithms</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary/10 to-secondary/5 border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-6">
          <Link href="/algorithms">
            <Button variant="ghost" className="gap-2 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-primary uppercase">{algorithm.category}</span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{algorithm.subcategory}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">{algorithm.name}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">{algorithm.description}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Complexity Analysis</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-lg border border-border bg-card">
                  <p className="text-xs text-muted-foreground mb-1">Time</p>
                  <p className="text-lg font-mono font-semibold text-primary">{algorithm.timeComplexity}</p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-card">
                  <p className="text-xs text-muted-foreground mb-1">Space</p>
                  <p className="text-lg font-mono font-semibold text-secondary">{algorithm.spaceComplexity}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Overview
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{algorithm.description}</p>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Best Use Case
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{algorithm.useCase}</p>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Implementation</h3>
              <Tabs defaultValue="python" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="python" className="text-xs">Python</TabsTrigger>
                  <TabsTrigger value="javascript" className="text-xs">JS</TabsTrigger>
                  <TabsTrigger value="java" className="text-xs">Java</TabsTrigger>
                </TabsList>
                <TabsContent value="python" className="space-y-2">
                  <CodeDisplay code={algorithm.code.python} language="python" />
                </TabsContent>
                <TabsContent value="javascript" className="space-y-2">
                  <CodeDisplay code={algorithm.code.javascript} language="javascript" />
                </TabsContent>
                <TabsContent value="java" className="space-y-2">
                  <CodeDisplay code={algorithm.code.java} language="java" />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Interactive Visualization</h2>
                <AlgorithmVisualization algorithmId={algorithm.id} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Complexity Analysis</h2>
                <ComplexityChart timeComplexity={algorithm.timeComplexity} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
