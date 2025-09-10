"use client"

import { useState } from "react"
import { NFTCard } from "@/components/nft/nft-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Wallet, TrendingUp, Users, Plus, ArrowUpRight } from "lucide-react"
import Link from "next/link"

// Mock user NFT data
const userNFTs = [
  {
    id: "user-1",
    name: "My Cyber Warrior #1234",
    collection: "CyberPunks",
    image: "/owned-cyberpunk-warrior-nft.jpg",
    rarity: "Epic" as const,
    category: "Gaming" as const,
    isOwned: true,
  },
  {
    id: "user-2",
    name: "My Abstract Dreams",
    collection: "Digital Canvas",
    image: "/owned-abstract-digital-art-nft.jpg",
    rarity: "Rare" as const,
    category: "Art" as const,
    isOwned: true,
  },
  {
    id: "user-3",
    name: "My DAO Membership",
    collection: "Governance Tokens",
    image: "/owned-dao-governance-token-nft.jpg",
    rarity: "Epic" as const,
    category: "Utility" as const,
    isOwned: true,
  },
]

export default function DashboardPage() {
  const [selectedNFTs, setSelectedNFTs] = useState<string[]>([])

  const handleTradeIntent = () => {
    // Navigate to intent creation with selected NFTs
    console.log("Creating trade intent with NFTs:", selectedNFTs)
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
            <Link href="/dashboard" className="text-foreground font-medium">
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
              <Link href="/intents/create">
                <Plus className="w-4 h-4 mr-2" />
                Create Intent
              </Link>
            </Button>
            <Button asChild>
              <Link href="/marketplace">Browse Market</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
          <p className="text-muted-foreground font-body">Manage your NFT collection and trading intents</p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.4 ETH</div>
              <p className="text-xs text-muted-foreground font-body">
                <span className="text-green-600">+2.1%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">NFTs Owned</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userNFTs.length}</div>
              <p className="text-xs text-muted-foreground font-body">Across 3 collections</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Intents</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground font-body">1 pending match</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Trades Completed</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground font-body">
                <span className="text-green-600">+3</span> this month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="collection" className="space-y-6">
          <TabsList>
            <TabsTrigger value="collection">My Collection</TabsTrigger>
            <TabsTrigger value="intents">Active Intents</TabsTrigger>
            <TabsTrigger value="history">Trade History</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="collection" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-1">Your NFT Collection</h2>
                <p className="text-muted-foreground font-body">Select NFTs to create trading intents</p>
              </div>
              <Button asChild>
                <Link href="/intents/create">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Intent
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {userNFTs.map((nft) => (
                <NFTCard key={nft.id} {...nft} onTrade={handleTradeIntent} />
              ))}
            </div>

            {userNFTs.length === 0 && (
              <div className="text-center py-12">
                <Wallet className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground font-body mb-4">You don't own any NFTs yet</p>
                <Button asChild>
                  <Link href="/marketplace">Browse Marketplace</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="intents" className="space-y-6">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Gaming NFTs → Art NFTs</CardTitle>
                      <CardDescription className="font-body">
                        Trade my gaming collection for art NFTs of similar rarity
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground font-body">Match Progress</span>
                      <span>2 of 3 matches found</span>
                    </div>
                    <Progress value={67} className="h-2" />
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm">
                        Execute Trade
                        <ArrowUpRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Collection → DAO Tokens</CardTitle>
                      <CardDescription className="font-body">
                        Exchange my collection for tokens that give voting power in art DAOs
                      </CardDescription>
                    </div>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground font-body">Match Progress</span>
                      <span>0 of 1 matches found</span>
                    </div>
                    <Progress value={0} className="h-2" />
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        Edit Intent
                      </Button>
                      <Button size="sm" variant="outline">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-body">Your trade history will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="text-center py-12">
              <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-body">Portfolio analytics will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
