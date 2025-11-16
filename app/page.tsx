// "use client"

// import { useState, useMemo } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import Link from "next/link"
// import { Search, ArrowRight } from "lucide-react"
// import { ALGORITHMS_DATA } from "@/lib/algorithms-data"

// export default function AlgorithmsPage() {
//   const [searchQuery, setSearchQuery] = useState("")
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

//   // Get unique categories
//   const categories = useMemo(() => {
//     return Array.from(new Set(ALGORITHMS_DATA.map((algo) => algo.category)))
//   }, [])

//   // Filter algorithms
//   const filteredAlgorithms = useMemo(() => {
//     return ALGORITHMS_DATA.filter((algo) => {
//       const matchesSearch =
//         algo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         algo.description.toLowerCase().includes(searchQuery.toLowerCase())
//       const matchesCategory = !selectedCategory || algo.category === selectedCategory
//       return matchesSearch && matchesCategory
//     })
//   }, [searchQuery, selectedCategory])

//   // Group algorithms by category
//   const groupedAlgorithms = useMemo(() => {
//     const grouped: { [key: string]: typeof ALGORITHMS_DATA } = {}
//     filteredAlgorithms.forEach((algo) => {
//       if (!grouped[algo.category]) {
//         grouped[algo.category] = []
//       }
//       grouped[algo.category].push(algo)
//     })
//     return grouped
//   }, [filteredAlgorithms])

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <div className="bg-gradient-to-br from-primary/10 to-secondary/5 py-12 border-b border-border">
//         <div className="max-w-7xl mx-auto px-6">
//           <h1 className="text-4xl font-bold text-foreground mb-2">Explore Algorithms</h1>
//           <p className="text-muted-foreground">Choose an algorithm to visualize and learn</p>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-8">
//         <div className="grid lg:grid-cols-4 gap-8">
//           {/* Sidebar - Categories */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-8 space-y-4">
//               <h3 className="font-semibold text-foreground">Categories</h3>
//               <Button
//                 variant={selectedCategory === null ? "default" : "outline"}
//                 className="w-full justify-start"
//                 onClick={() => setSelectedCategory(null)}
//               >
//                 All Algorithms
//               </Button>
//               {categories.map((category) => (
//                 <Button
//                   key={category}
//                   variant={selectedCategory === category ? "default" : "outline"}
//                   className="w-full justify-start"
//                   onClick={() => setSelectedCategory(category)}
//                 >
//                   {category}
//                 </Button>
//               ))}
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="lg:col-span-3">
//             {/* Search */}
//             <div className="mb-8">
//               <div className="relative">
//                 <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                 <Input
//                   placeholder="Search algorithms..."
//                   className="pl-10"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
//             </div>

//             {/* Algorithm Grid */}
//             <div className="space-y-12">
//               {Object.entries(groupedAlgorithms).map(([category, algorithms]) => (
//                 <div key={category}>
//                   <h2 className="text-2xl font-bold text-foreground mb-4">{category}</h2>
//                   <div className="grid md:grid-cols-2 gap-4">
//                     {algorithms.map((algo) => (
//                       <Link key={algo.id} href={`/algorithms/${algo.id}`}>
//                         <div className="p-6 rounded-lg border border-border bg-card hover:shadow-lg hover:border-primary/50 transition cursor-pointer group">
//                           <div className="flex items-start justify-between mb-3">
//                             <div>
//                               <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition">
//                                 {algo.name}
//                               </h3>
//                               <p className="text-sm text-muted-foreground mt-1">{algo.subcategory}</p>
//                             </div>
//                             <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition" />
//                           </div>
//                           <p className="text-sm text-muted-foreground line-clamp-2">{algo.description}</p>
//                           <div className="flex gap-2 mt-4 flex-wrap">
//                             <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
//                               Time: {algo.timeComplexity}
//                             </span>
//                             <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">
//                               Space: {algo.spaceComplexity}
//                             </span>
//                           </div>
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {filteredAlgorithms.length === 0 && (
//               <div className="text-center py-12">
//                 <p className="text-muted-foreground">No algorithms found matching your search.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, BookOpen, Code2 } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-slate-900/5">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Code2 className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold text-foreground">Algorithm Visual</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">
            Features
          </Link>
          <Link href="/algorithms" className="text-sm text-muted-foreground hover:text-foreground transition">
            Explore
          </Link>
          <Link href="/algorithms" className="text-sm text-muted-foreground hover:text-foreground transition">
            About
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Master Algorithms Through
                <span className="block text-primary"> Interactive Visualization</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                See how algorithms work step-by-step with beautiful animations. Understand sorting, searching, and graph
                algorithms like never before.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/algorithms">
                <Button
                  size="lg"
                  className="gap-2 w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Start Learning <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual placeholder */}
          <div className="hidden md:block relative h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border border-primary/20 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Zap className="w-16 h-16 text-primary/40 mx-auto mb-4" />
                <p className="text-muted-foreground">Interactive Visualizations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-secondary/5 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Learn Algorithms Effectively</h2>
            <p className="text-lg text-muted-foreground">Comprehensive tools to understand computer science concepts</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-lg border border-border bg-card hover:shadow-lg transition">
              <Zap className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Step-by-Step Animation</h3>
              <p className="text-muted-foreground">
                Watch algorithms execute in real-time with smooth animations showing every operation
              </p>
            </div>

            <div className="p-8 rounded-lg border border-border bg-card hover:shadow-lg transition">
              <Code2 className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Multi-Language Code</h3>
              <p className="text-muted-foreground">
                View algorithm implementations in Python, JavaScript, and Java side-by-side
              </p>
            </div>

            <div className="p-8 rounded-lg border border-border bg-card hover:shadow-lg transition">
              <BookOpen className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Clear Explanations</h3>
              <p className="text-muted-foreground">
                Detailed descriptions of time complexity, use cases, and algorithm variations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to master algorithms?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Dive into our interactive platform and start visualizing algorithms today
          </p>
          <Link href="/algorithms">
            <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
              Explore All Algorithms <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
