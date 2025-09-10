"use client"

import { useState } from "react"
import { IntentCard } from "@/components/intents/intent-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter, Zap, Target, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

// Mock intents data
const mockIntents = [
  {
    id: "1",
    title: "Gaming NFTs → Art NFTs",
    description: "Trade my gaming collection for art NFTs of similar rarity and value",
    status: "active" as const,
    progress: 67,
    matches: 2,
    totalMatches: 3,
    createdAt: "2024-01-15T10:30:00Z",
    priority: "balanced" as const,
    category: "Cross-Category",
  },
  {
    id: "2",
    title: "Collection → DAO Tokens",
    description: "Exchange my entire collection for governance tokens in art DAOs",
    status: "active" as const,
    progress: 25,
    matches: 1,
    totalMatches: 4,
    createdAt: "2024-01-14T15:45:00Z",
    priority: "value" as const,
    category: "Governance",
  },
  {
    id: "3",
    title: "Rarity Upgrade Trade",
    description: "Trade 3 common CryptoPunks for 1 rare Bored Ape",
    status: "completed" as const,
    progress: 100,
    matches: 1,
    totalMatches: 1,
    createdAt: "2024-01-10T09:15:00Z",
    priority: "rarity" as const,
    category: "Upgrade",
  },
  {
    id: "4",
    title: "Music NFTs → Sports NFTs",
    description: "Swap my music collection for sports memorabilia NFTs",
    status: "paused" as const,
    progress: 0,
    matches: 0,
    totalMatches: 2,
    createdAt: "2024-01-12T14:20:00Z",
    priority: "speed" as const,
    category: "Cross-Category",
  },
]

export default function IntentsPage() {
  const [intents, setIntents] = useState(mockIntents)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredIntents = intents.filter((intent) => {
    const matchesSearch =
      intent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intent.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || intent.status === statusFilter
    const matchesCategory = categoryFilter === "all" || intent.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleIntentAction = (action: string, id: string) => {
    console.log(`${action} intent:`, id)
    // Handle intent actions
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Zap className="w-4 h-4" />
      case "paused":
        return <Clock className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Target className="w-4 h-4" />
    }
  }

  const getStatusCount = (status: string) => {
    if (status === "all") return intents.length
    return intents.filter((intent) => intent.status === status).length
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <img src="/wizard-logo.jpg" alt="Anoma Dynamic NFT Logo" className="w-8 h-8 rounded-lg object-cover" />
              <span className="text-xl font-bold">Anoma Dynamic NFT</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/marketplace" className="text-muted-foreground hover:text-foreground transition-colors">
              Marketplace
            </Link>
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              My Collection
            </Link>
            <Link href="/intents" className="text-foreground font-medium">
              My Intents
            </Link>
            <Link href="/matching" className="text-muted-foreground hover:text-foreground transition-colors">
              Matching Engine
            </Link>
            <Link href="/dao" className="text-muted-foreground hover:text-foreground transition-colors">
              DAO Hub
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button asChild>
              <Link href="/intents/create">
                <Plus className="w-4 h-4 mr-2" />
                Create Intent
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Trading Intents</h1>
          <p className="text-muted-foreground font-body">
            Manage your active trading intents and track matching progress
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search intents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Cross-Category">Cross-Category</SelectItem>
              <SelectItem value="Governance">Governance</SelectItem>
              <SelectItem value="Upgrade">Upgrade</SelectItem>
              <SelectItem value="Collection">Collection</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              All ({getStatusCount("all")})
            </TabsTrigger>
            <TabsTrigger value="active" className="flex items-center gap-2">
              {getStatusIcon("active")}
              Active ({getStatusCount("active")})
            </TabsTrigger>
            <TabsTrigger value="paused" className="flex items-center gap-2">
              {getStatusIcon("paused")}
              Paused ({getStatusCount("paused")})
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              {getStatusIcon("completed")}
              Completed ({getStatusCount("completed")})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredIntents.length > 0 ? (
              <div className="space-y-4">
                {filteredIntents.map((intent) => (
                  <IntentCard
                    key={intent.id}
                    intent={intent}
                    onEdit={(id) => handleIntentAction("edit", id)}
                    onDelete={(id) => handleIntentAction("delete", id)}
                    onToggle={(id) => handleIntentAction("toggle", id)}
                    onExecute={(id) => handleIntentAction("execute", id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground font-body mb-4">No intents match your current filters</p>
                <Button asChild>
                  <Link href="/intents/create">Create Your First Intent</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            {filteredIntents
              .filter((i) => i.status === "active")
              .map((intent) => (
                <IntentCard
                  key={intent.id}
                  intent={intent}
                  onEdit={(id) => handleIntentAction("edit", id)}
                  onDelete={(id) => handleIntentAction("delete", id)}
                  onToggle={(id) => handleIntentAction("toggle", id)}
                  onExecute={(id) => handleIntentAction("execute", id)}
                />
              ))}
          </TabsContent>

          <TabsContent value="paused" className="space-y-4">
            {filteredIntents
              .filter((i) => i.status === "paused")
              .map((intent) => (
                <IntentCard
                  key={intent.id}
                  intent={intent}
                  onEdit={(id) => handleIntentAction("edit", id)}
                  onDelete={(id) => handleIntentAction("delete", id)}
                  onToggle={(id) => handleIntentAction("toggle", id)}
                  onExecute={(id) => handleIntentAction("execute", id)}
                />
              ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {filteredIntents
              .filter((i) => i.status === "completed")
              .map((intent) => (
                <IntentCard
                  key={intent.id}
                  intent={intent}
                  onEdit={(id) => handleIntentAction("edit", id)}
                  onDelete={(id) => handleIntentAction("delete", id)}
                  onToggle={(id) => handleIntentAction("toggle", id)}
                  onExecute={(id) => handleIntentAction("execute", id)}
                />
              ))}
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="mt-8 p-6 bg-muted/30 rounded-lg border border-border/50">
          <h3 className="font-semibold mb-3">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/intents/create">
                <Plus className="w-4 h-4 mr-2" />
                New Intent
              </Link>
            </Button>
            <Button variant="outline" size="sm">
              <Target className="w-4 h-4 mr-2" />
              Browse Templates
            </Button>
            <Button variant="outline" size="sm">
              <Zap className="w-4 h-4 mr-2" />
              View Matches
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
