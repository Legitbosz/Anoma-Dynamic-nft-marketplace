"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DAOCard } from "@/components/dao/dao-card"
import { ProposalCard } from "@/components/dao/proposal-card"
import { Search, Filter, TrendingUp, Users, Vote, Coins, Plus, ExternalLink } from "lucide-react"

// Mock DAO data
const mockDAOs = [
  {
    id: "dao1",
    name: "ArtistsDAO",
    description:
      "A decentralized community of digital artists creating and trading NFT art with collective governance over platform decisions and revenue sharing.",
    logo: "/placeholder.svg?height=48&width=48",
    category: "Art & Culture",
    members: 15420,
    totalSupply: "1M ART",
    marketCap: "$2.4M",
    votingPower: "100%",
    activeProposals: 3,
    governanceToken: {
      symbol: "ART",
      price: "$2.40",
      change24h: 5.2,
    },
    userHoldings: {
      amount: "1,250 ART",
      votingPower: "0.125%",
      value: "$3,000",
    },
  },
  {
    id: "dao2",
    name: "GamersUnited",
    description:
      "Gaming-focused DAO that governs a play-to-earn ecosystem, manages tournament prizes, and votes on new game integrations and partnerships.",
    logo: "/placeholder.svg?height=48&width=48",
    category: "Gaming",
    members: 28750,
    totalSupply: "5M GAME",
    marketCap: "$8.7M",
    votingPower: "100%",
    activeProposals: 5,
    governanceToken: {
      symbol: "GAME",
      price: "$1.74",
      change24h: -2.1,
    },
  },
  {
    id: "dao3",
    name: "MusicDAO",
    description:
      "Decentralized music platform where artists and fans collaborate on music production, distribution, and royalty sharing through democratic governance.",
    logo: "/placeholder.svg?height=48&width=48",
    category: "Music",
    members: 9830,
    totalSupply: "2M MUSIC",
    marketCap: "$1.8M",
    votingPower: "100%",
    activeProposals: 2,
    governanceToken: {
      symbol: "MUSIC",
      price: "$0.90",
      change24h: 8.7,
    },
  },
]

// Mock proposal data
const mockProposals = [
  {
    id: "prop1",
    title: "Increase Artist Royalty Share to 15%",
    description:
      "Proposal to increase the royalty percentage for original artists from 10% to 15% on all secondary sales to better support creators in our ecosystem.",
    proposer: {
      name: "Alice Chen",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    dao: {
      name: "ArtistsDAO",
      logo: "/placeholder.svg?height=32&width=32",
    },
    status: "active" as const,
    votingPower: {
      for: 125000,
      against: 45000,
      abstain: 12000,
      total: 182000,
    },
    endTime: "2024-01-20T18:00:00Z",
    quorum: 100000,
    userVote: "for" as const,
    userVotingPower: "1,250 ART",
  },
  {
    id: "prop2",
    title: "Add New Tournament Prize Pool",
    description:
      "Allocate 500,000 GAME tokens to create a monthly tournament prize pool for competitive gaming events and community challenges.",
    proposer: {
      name: "Mike Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    dao: {
      name: "GamersUnited",
      logo: "/placeholder.svg?height=32&width=32",
    },
    status: "active" as const,
    votingPower: {
      for: 890000,
      against: 120000,
      abstain: 45000,
      total: 1055000,
    },
    endTime: "2024-01-18T12:00:00Z",
    quorum: 500000,
  },
  {
    id: "prop3",
    title: "Partnership with Spotify Integration",
    description:
      "Establish a partnership with Spotify to enable direct music streaming and royalty distribution through our platform's smart contracts.",
    proposer: {
      name: "Sarah Kim",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    dao: {
      name: "MusicDAO",
      logo: "/placeholder.svg?height=32&width=32",
    },
    status: "passed" as const,
    votingPower: {
      for: 450000,
      against: 89000,
      abstain: 23000,
      total: 562000,
    },
    endTime: "2024-01-15T09:00:00Z",
    quorum: 200000,
  },
]

export default function DAOPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("discover")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "Art & Culture", "Gaming", "Music", "DeFi", "Social"]

  const handleJoinDAO = (daoId: string) => {
    console.log("Joining DAO:", daoId)
    // Implementation would handle DAO joining logic
  }

  const handleTradeForTokens = (daoId: string) => {
    console.log("Trading for tokens:", daoId)
    // Implementation would redirect to intent creation with DAO token preference
  }

  const handleVote = (proposalId: string, vote: "for" | "against" | "abstain") => {
    console.log("Voting on proposal:", proposalId, vote)
    // Implementation would handle voting logic
  }

  const filteredDAOs = mockDAOs.filter((dao) => {
    const matchesSearch =
      dao.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dao.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || dao.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">DAO Governance Hub</h1>
        <p className="text-muted-foreground">
          Discover DAOs, participate in governance, and trade for voting power in communities you care about
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total DAOs</p>
                <p className="text-2xl font-bold">247</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Proposals</p>
                <p className="text-2xl font-bold">89</p>
              </div>
              <Vote className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Your DAOs</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <Coins className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">$12.4K</p>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="discover">Discover DAOs</TabsTrigger>
          <TabsTrigger value="my-daos">My DAOs</TabsTrigger>
          <TabsTrigger value="proposals">Active Proposals</TabsTrigger>
          <TabsTrigger value="history">Voting History</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search DAOs by name, category, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "All Categories" : category}
              </Badge>
            ))}
          </div>

          {/* DAO Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDAOs.map((dao) => (
              <DAOCard
                key={dao.id}
                dao={dao}
                onJoin={() => handleJoinDAO(dao.id)}
                onTrade={() => handleTradeForTokens(dao.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-daos" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your DAO Memberships</h2>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Join New DAO
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockDAOs
              .filter((dao) => dao.userHoldings)
              .map((dao) => (
                <DAOCard
                  key={dao.id}
                  dao={dao}
                  onJoin={() => handleJoinDAO(dao.id)}
                  onTrade={() => handleTradeForTokens(dao.id)}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="proposals" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Active Proposals</h2>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <ExternalLink className="h-4 w-4" />
              Create Proposal
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockProposals.map((proposal) => (
              <ProposalCard key={proposal.id} proposal={proposal} onVote={(vote) => handleVote(proposal.id, vote)} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardContent className="p-8 text-center">
              <Vote className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Voting History</h3>
              <p className="text-muted-foreground">Your past votes and proposal outcomes will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
