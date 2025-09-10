"use client"

import { useState } from "react"
import { NFTCard } from "@/components/nft/nft-card"
import { CollectionFilters } from "@/components/nft/collection-filters"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Zap, Users } from "lucide-react"
import Link from "next/link"

// Mock NFT data
const mockNFTs = [
  {
    id: "1",
    name: "Cyber Warrior #1234",
    collection: "CyberPunks",
    image: "/cyberpunk-warrior-nft-digital-art.jpg",
    price: "2.5",
    rarity: "Epic" as const,
    category: "Gaming" as const,
  },
  {
    id: "2",
    name: "Abstract Dreams",
    collection: "Digital Canvas",
    image: "/abstract-digital-art-nft-colorful.jpg",
    price: "1.8",
    rarity: "Rare" as const,
    category: "Art" as const,
  },
  {
    id: "3",
    name: "Beat Drop #567",
    collection: "SoundWaves",
    image: "/music-nft-sound-waves-visualization.jpg",
    price: "0.9",
    rarity: "Common" as const,
    category: "Music" as const,
  },
  {
    id: "4",
    name: "Golden Goal",
    collection: "Sports Legends",
    image: "/sports-nft-golden-soccer-ball.jpg",
    price: "5.2",
    rarity: "Legendary" as const,
    category: "Sports" as const,
  },
  {
    id: "5",
    name: "DAO Membership",
    collection: "Governance Tokens",
    image: "/dao-governance-token-nft-badge.jpg",
    price: "3.1",
    rarity: "Epic" as const,
    category: "Utility" as const,
  },
  {
    id: "6",
    name: "Pixel Knight #789",
    collection: "8-Bit Heroes",
    image: "/pixel-art-knight-nft-8bit-style.jpg",
    price: "1.2",
    rarity: "Rare" as const,
    category: "Gaming" as const,
  },
]

export default function MarketplacePage() {
  const [filteredNFTs, setFilteredNFTs] = useState(mockNFTs)

  const handleFiltersChange = (filters: any) => {
    let filtered = [...mockNFTs]

    if (filters.search) {
      filtered = filtered.filter(
        (nft) =>
          nft.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          nft.collection.toLowerCase().includes(filters.search.toLowerCase()),
      )
    }

    if (filters.category) {
      filtered = filtered.filter((nft) => nft.category === filters.category)
    }

    if (filters.rarity) {
      filtered = filtered.filter((nft) => nft.rarity === filters.rarity)
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange
        .split("-")
        .map((p: string) => (p === "+" ? Number.POSITIVE_INFINITY : Number.parseFloat(p)))
      filtered = filtered.filter((nft) => {
        const price = Number.parseFloat(nft.price)
        return price >= min && (max === undefined || price <= max)
      })
    }

    // Sort
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => Number.parseFloat(a.price) - Number.parseFloat(b.price))
        break
      case "price-high":
        filtered.sort((a, b) => Number.parseFloat(b.price) - Number.parseFloat(a.price))
        break
      case "rarity":
        const rarityOrder = { Common: 1, Rare: 2, Epic: 3, Legendary: 4 }
        filtered.sort((a, b) => rarityOrder[b.rarity] - rarityOrder[a.rarity])
        break
    }

    setFilteredNFTs(filtered)
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
            <Link href="/marketplace" className="text-foreground font-medium">
              Marketplace
            </Link>
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              My Collection
            </Link>
            <Link href="/intents" className="text-muted-foreground hover:text-foreground transition-colors">
              My Intents
            </Link>
            <Link href="/dao" className="text-muted-foreground hover:text-foreground transition-colors">
              DAO Hub
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/intents/create">Create Intent</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">NFT Marketplace</h1>
          <p className="text-muted-foreground font-body">
            Discover, collect, and trade NFTs with intelligent intent matching
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">24.5K</p>
                <p className="text-sm text-muted-foreground font-body">Total NFTs</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">8.2K</p>
                <p className="text-sm text-muted-foreground font-body">Active Traders</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground font-body">Active Intents</p>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All NFTs</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="new">New Drops</TabsTrigger>
            <TabsTrigger value="intents">Intent Matches</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <CollectionFilters onFiltersChange={handleFiltersChange} />

            <div className="flex items-center justify-between">
              <p className="text-muted-foreground font-body">
                Showing {filteredNFTs.length} of {mockNFTs.length} NFTs
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Live Matching</Badge>
                <Badge variant="secondary">Intent-Based</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredNFTs.map((nft) => (
                <NFTCard key={nft.id} {...nft} />
              ))}
            </div>

            {filteredNFTs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground font-body mb-4">No NFTs match your current filters</p>
                <Button variant="outline" onClick={() => handleFiltersChange({})}>
                  Clear Filters
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="trending" className="space-y-6">
            <div className="text-center py-12">
              <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-body">Trending NFTs will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="new" className="space-y-6">
            <div className="text-center py-12">
              <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-body">New drops will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="intents" className="space-y-6">
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-body">Intent matches will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
