"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TradeExecutionModal } from "@/components/execution/trade-execution-modal"
import { Search, Filter, Clock, CheckCircle, AlertCircle, Users, ArrowRight, TrendingUp, Activity } from "lucide-react"

// Mock data for active executions
const mockExecutions = [
  {
    id: "exec_001",
    tradeId: "trade_abc123",
    type: "Multi-Party Exchange",
    parties: [
      {
        id: "user1",
        name: "Alex Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        offering: [
          {
            id: "nft1",
            name: "CyberPunk Warrior #1234",
            image: "/cyberpunk-warrior-nft-digital-art.jpg",
            type: "nft" as const,
            value: "Rare",
          },
        ],
        receiving: [
          {
            id: "nft2",
            name: "Abstract Art #5678",
            image: "/abstract-digital-art-nft-colorful.jpg",
            type: "nft" as const,
            value: "Epic",
          },
        ],
        status: "approved" as const,
        approvedAt: "2024-01-15T10:30:00Z",
      },
      {
        id: "user2",
        name: "Sarah Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        offering: [
          {
            id: "nft2",
            name: "Abstract Art #5678",
            image: "/abstract-digital-art-nft-colorful.jpg",
            type: "nft" as const,
            value: "Epic",
          },
        ],
        receiving: [
          {
            id: "token1",
            name: "DAO Governance Tokens",
            image: "/dao-governance-token-nft-badge.jpg",
            type: "token" as const,
            value: "1000 VOTE",
          },
        ],
        status: "approved" as const,
        approvedAt: "2024-01-15T10:45:00Z",
      },
      {
        id: "user3",
        name: "Mike Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        offering: [
          {
            id: "token1",
            name: "DAO Governance Tokens",
            image: "/dao-governance-token-nft-badge.jpg",
            type: "token" as const,
            value: "1000 VOTE",
          },
        ],
        receiving: [
          {
            id: "nft1",
            name: "CyberPunk Warrior #1234",
            image: "/cyberpunk-warrior-nft-digital-art.jpg",
            type: "nft" as const,
            value: "Rare",
          },
        ],
        status: "pending" as const,
      },
    ],
    status: "pending",
    createdAt: "2024-01-15T09:00:00Z",
    estimatedCompletion: "2024-01-15T12:00:00Z",
  },
  {
    id: "exec_002",
    tradeId: "trade_def456",
    type: "Chain Exchange",
    parties: [
      {
        id: "user4",
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        offering: [
          {
            id: "nft3",
            name: "Music NFT #9999",
            image: "/music-nft-sound-waves-visualization.jpg",
            type: "nft" as const,
            value: "Legendary",
          },
        ],
        receiving: [
          {
            id: "nft4",
            name: "Sports Card #1111",
            image: "/sports-nft-golden-soccer-ball.jpg",
            type: "nft" as const,
            value: "Rare",
          },
        ],
        status: "approved" as const,
        approvedAt: "2024-01-15T11:00:00Z",
      },
      {
        id: "user5",
        name: "David Lee",
        avatar: "/placeholder.svg?height=40&width=40",
        offering: [
          {
            id: "nft4",
            name: "Sports Card #1111",
            image: "/sports-nft-golden-soccer-ball.jpg",
            type: "nft" as const,
            value: "Rare",
          },
        ],
        receiving: [
          {
            id: "nft3",
            name: "Music NFT #9999",
            image: "/music-nft-sound-waves-visualization.jpg",
            type: "nft" as const,
            value: "Legendary",
          },
        ],
        status: "approved" as const,
        approvedAt: "2024-01-15T11:15:00Z",
      },
    ],
    status: "executing",
    createdAt: "2024-01-15T10:30:00Z",
    estimatedCompletion: "2024-01-15T11:30:00Z",
  },
]

export default function ExecutionPage() {
  const [selectedExecution, setSelectedExecution] = useState<(typeof mockExecutions)[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("active")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "executing":
        return <Activity className="h-4 w-4 text-blue-500" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "executing":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Trade Execution Center</h1>
        <p className="text-muted-foreground">
          Monitor and manage multi-party trade executions powered by Anoma protocol
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Executions</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed Today</p>
                <p className="text-2xl font-bold">47</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">98.5%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Time</p>
                <p className="text-2xl font-bold">2.3m</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by trade ID, participant, or asset..."
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

      {/* Execution List */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="failed">Failed</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {mockExecutions.map((execution) => (
            <Card key={execution.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(execution.status)}
                      <Badge className={getStatusColor(execution.status)}>{execution.status}</Badge>
                    </div>
                    <div>
                      <p className="font-semibold">{execution.type}</p>
                      <p className="text-sm text-muted-foreground font-mono">{execution.tradeId}</p>
                    </div>
                  </div>
                  <Button onClick={() => setSelectedExecution(execution)} variant="outline">
                    View Details
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Participants</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{execution.parties.length} parties</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Created</p>
                    <p className="font-medium">{new Date(execution.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Est. Completion</p>
                    <p className="font-medium">{new Date(execution.estimatedCompletion).toLocaleString()}</p>
                  </div>
                </div>

                {/* Party Preview */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Parties:</span>
                  {execution.parties.slice(0, 3).map((party, index) => (
                    <span key={party.id} className="flex items-center gap-1">
                      {party.name}
                      {index < Math.min(execution.parties.length - 1, 2) && <ArrowRight className="h-3 w-3" />}
                    </span>
                  ))}
                  {execution.parties.length > 3 && <span>+{execution.parties.length - 3} more</span>}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardContent className="p-8 text-center">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Pending Executions</h3>
              <p className="text-muted-foreground">All trades are either active or completed</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">47 Completed Today</h3>
              <p className="text-muted-foreground">View completed trade executions in the history section</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="failed">
          <Card>
            <CardContent className="p-8 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Failed Executions</h3>
              <p className="text-muted-foreground">All recent trades have executed successfully</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Trade Execution Modal */}
      {selectedExecution && (
        <TradeExecutionModal
          isOpen={!!selectedExecution}
          onClose={() => setSelectedExecution(null)}
          tradeId={selectedExecution.tradeId}
          parties={selectedExecution.parties}
          executionStatus={selectedExecution.status as any}
        />
      )}
    </div>
  )
}
