"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Search, ArrowRight } from "lucide-react"
import { ALGORITHMS_DATA } from "@/lib/algorithms-data"

export default function AlgorithmsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(ALGORITHMS_DATA.map((algo) => algo.category)))
  }, [])

  // Filter algorithms
  const filteredAlgorithms = useMemo(() => {
    return ALGORITHMS_DATA.filter((algo) => {
      const matchesSearch =
        algo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        algo.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !selectedCategory || algo.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  // Group algorithms by category
  const groupedAlgorithms = useMemo(() => {
    const grouped: { [key: string]: typeof ALGORITHMS_DATA } = {}
    filteredAlgorithms.forEach((algo) => {
      if (!grouped[algo.category]) {
        grouped[algo.category] = []
      }
      grouped[algo.category].push(algo)
    })
    return grouped
  }, [filteredAlgorithms])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/5 py-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-foreground mb-2">Explore Algorithms</h1>
          <p className="text-muted-foreground">Choose an algorithm to visualize and learn</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-4">
              <h3 className="font-semibold text-foreground">Categories</h3>
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedCategory(null)}
              >
                All Algorithms
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search algorithms..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Algorithm Grid */}
            <div className="space-y-12">
              {Object.entries(groupedAlgorithms).map(([category, algorithms]) => (
                <div key={category}>
                  <h2 className="text-2xl font-bold text-foreground mb-4">{category}</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {algorithms.map((algo) => (
                      <Link key={algo.id} href={`/algorithms/${algo.id}`}>
                        <div className="p-6 rounded-lg border border-border bg-card hover:shadow-lg hover:border-primary/50 transition cursor-pointer group">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition">
                                {algo.name}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">{algo.subcategory}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition" />
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{algo.description}</p>
                          <div className="flex gap-2 mt-4 flex-wrap">
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                              Time: {algo.timeComplexity}
                            </span>
                            <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">
                              Space: {algo.spaceComplexity}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {filteredAlgorithms.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No algorithms found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
