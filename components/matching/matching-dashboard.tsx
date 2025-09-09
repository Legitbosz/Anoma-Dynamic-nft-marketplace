"use client"

import { useState, useEffect } from "react"
import { MatchCard } from "./match-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Zap, Target, TrendingUp, RefreshCw, Filter, Settings } from "lucide-react"

// Mock matching data
const mockMatches = [
  {
    id: "match-1",
    score: 92,
    confidence: "High" as const,
    type: "Direct" as const,
    participants: [
      {
        id: "user-1",
        name: "CryptoTrader_42",
        avatar: "/placeholder.svg?height=32&width=32",
        offering: "Gaming NFTs (3x Epic)",
        seeking: "Art NFTs (Similar Rarity)",
        reputation: 98,
      },
      {
        id: "user-2",
        name: "ArtCollector_99",
        avatar: "/placeholder.svg?height=32&width=32",
        offering: "Digital Art (2x Epic)",
        seeking: "Gaming Collection",
        reputation: 95,
      },
    ],
    estimatedValue: {
      your: "4.2 ETH",
      their: "4.5 ETH",
      difference: 7.1,
    },
    timeline: "2-4 hours",
    complexity: "Simple" as const,
    requirements: ["Rarity Match", "Value ±10%", "Instant Settlement"],
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "match-2",
    score: 78,
    confidence: "Medium" as const,
    type: "Multi-Party" as const,
    participants: [
      {
        id: "user-3",
        name: "DAOGov_Master",
        avatar: "/placeholder.svg?height=32&width=32",
        offering: "Governance Tokens",
        seeking: "Art Collection",
        reputation: 89,
      },
      {
        id: "user-4",
        name: "MusicNFT_Fan",
        avatar: "/placeholder.svg?height=32&width=32",
        offering: "Music NFTs",
        seeking: "Gaming Assets",
        reputation: 92,
      },
      {
        id: "user-5",
        name: "SportsFan_2024",
        avatar: "/placeholder.svg?height=32&width=32",
        offering: "Sports Memorabilia",
        seeking: "DAO Tokens",
        reputation: 87,
      },
    ],
    estimatedValue: {
      your: "6.8 ETH",
      their: "7.1 ETH",
      difference: 4.4,
    },
    timeline: "6-12 hours",
    complexity: "Complex" as const,
    requirements: ["Multi-Party Coordination", "Cross-Category", "DAO Integration", "Escrow Required"],
    createdAt: "2024-01-15T09:15:00Z",
  },
]

interface MatchingDashboardProps {
  intentId?: string
}

export function MatchingDashboard({ intentId }: MatchingDashboardProps) {
  const [matches, setMatches] = useState(mockMatches)
  const [isSearching, setIsSearching] = useState(false)
  const [filters, setFilters] = useState({
    minScore: 70,
    maxComplexity: "Complex",
    confidence: "All",
    type: "All",
  })
  const [sortBy, setSortBy] = useState("score")

  // Simulate real-time matching
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        // Simulate new match found
        console.log("New match found!")
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleRefreshMatches = () => {
    setIsSearching(true)
    setTimeout(() => {
      setIsSearching(false)
      // Simulate finding new matches
    }, 2000)
  }

  const filteredMatches = matches
    .filter((match) => {
      if (match.score < filters.minScore) return false
      if (filters.confidence !== "All" && match.confidence !== filters.confidence) return false
      if (filters.type !== "All" && match.type !== filters.type) return false
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "score":
          return b.score - a.score
        case "value":
          return Number.parseFloat(b.estimatedValue.their) - Number.parseFloat(a.estimatedValue.their)
        case "timeline":
          return a.timeline.localeCompare(b.timeline)
        default:
          return 0
      }
    })

  const getMatchingStats = () => {
    const total = matches.length
    const high = matches.filter((m) => m.confidence === "High").length
    const avgScore = matches.reduce((sum, m) => sum + m.score, 0) / total || 0
    return { total, high, avgScore: Math.round(avgScore) }
  }

  const stats = getMatchingStats()

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Matches</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground font-body">
              <span className="text-green-600">+2</span> in last hour
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Confidence</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.high}</div>
            <p className="text-xs text-muted-foreground font-body">Ready to execute</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgScore}%</div>
            <p className="text-xs text-muted-foreground font-body">Match quality</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Scanning</CardTitle>
            <RefreshCw className={`h-4 w-4 text-muted-foreground ${isSearching ? "animate-spin" : ""}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Live</div>
            <p className="text-xs text-muted-foreground font-body">Real-time matching</p>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-4">
          <Button onClick={handleRefreshMatches} disabled={isSearching} variant="outline" className="bg-transparent">
            <RefreshCw className={`w-4 h-4 mr-2 ${isSearching ? "animate-spin" : ""}`} />
            {isSearching ? "Searching..." : "Refresh Matches"}
          </Button>
          <Badge variant="secondary" className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Live Matching Active
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="score">Match Score</SelectItem>
              <SelectItem value="value">Estimated Value</SelectItem>
              <SelectItem value="timeline">Timeline</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="matches" className="space-y-6">
        <TabsList>
          <TabsTrigger value="matches">All Matches ({filteredMatches.length})</TabsTrigger>
          <TabsTrigger value="filters">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="matches" className="space-y-4">
          {filteredMatches.length > 0 ? (
            <div className="space-y-4">
              {filteredMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onViewDetails={(id) => console.log("View details:", id)}
                  onInitiateTrade={(id) => console.log("Initiate trade:", id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-body mb-4">No matches found with current filters</p>
              <Button
                variant="outline"
                onClick={() => setFilters({ minScore: 0, maxComplexity: "Complex", confidence: "All", type: "All" })}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="filters" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Matching Preferences
              </CardTitle>
              <CardDescription className="font-body">
                Customize how matches are found and ranked for your intents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Minimum Match Score: {filters.minScore}%</Label>
                <Slider
                  value={[filters.minScore]}
                  onValueChange={([value]) => setFilters((prev) => ({ ...prev, minScore: value }))}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground font-body">
                  Only show matches with at least this compatibility score
                </p>
              </div>

              <Separator />

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Confidence Level</Label>
                  <Select
                    value={filters.confidence}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, confidence: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Confidence Levels</SelectItem>
                      <SelectItem value="High">High Confidence Only</SelectItem>
                      <SelectItem value="Medium">Medium & High</SelectItem>
                      <SelectItem value="Low">Low Confidence</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Trade Type</Label>
                  <Select
                    value={filters.type}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Trade Types</SelectItem>
                      <SelectItem value="Direct">Direct Trades Only</SelectItem>
                      <SelectItem value="Multi-Party">Multi-Party Trades</SelectItem>
                      <SelectItem value="Chain">Chain Trades</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => console.log("Filters applied:", filters)}>Apply Filters</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Matching Performance</CardTitle>
                <CardDescription className="font-body">How well your intents are being matched</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-body">Success Rate</span>
                    <span>87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-body">Avg Match Time</span>
                    <span>4.2 hours</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-body">Value Accuracy</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Match Distribution</CardTitle>
                <CardDescription className="font-body">Types of matches found for your intents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                      <span className="text-sm font-body">Direct Trades</span>
                    </div>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-secondary rounded-full" />
                      <span className="text-sm font-body">Multi-Party</span>
                    </div>
                    <span className="text-sm font-medium">35%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-accent rounded-full" />
                      <span className="text-sm font-body">Chain Trades</span>
                    </div>
                    <span className="text-sm font-medium">20%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
