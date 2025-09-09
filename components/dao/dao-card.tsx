"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Vote, TrendingUp, ExternalLink, Coins } from "lucide-react"

interface DAOCardProps {
  dao: {
    id: string
    name: string
    description: string
    logo: string
    category: string
    members: number
    totalSupply: string
    marketCap: string
    votingPower: string
    activeProposals: number
    governanceToken: {
      symbol: string
      price: string
      change24h: number
    }
    userHoldings?: {
      amount: string
      votingPower: string
      value: string
    }
  }
  onJoin?: () => void
  onTrade?: () => void
}

export function DAOCard({ dao, onJoin, onTrade }: DAOCardProps) {
  const isHolder = !!dao.userHoldings

  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={dao.logo || "/placeholder.svg"} />
              <AvatarFallback>{dao.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{dao.name}</CardTitle>
              <Badge variant="secondary" className="mt-1">
                {dao.category}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">{dao.governanceToken.symbol}</p>
            <p className="text-lg font-bold">{dao.governanceToken.price}</p>
            <p className={`text-xs ${dao.governanceToken.change24h >= 0 ? "text-green-600" : "text-red-600"}`}>
              {dao.governanceToken.change24h >= 0 ? "+" : ""}
              {dao.governanceToken.change24h}%
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{dao.description}</p>

        {/* DAO Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Members:</span>
              <span className="font-medium">{dao.members.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Vote className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Proposals:</span>
              <span className="font-medium">{dao.activeProposals}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Coins className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Supply:</span>
              <span className="font-medium">{dao.totalSupply}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Market Cap:</span>
              <span className="font-medium">{dao.marketCap}</span>
            </div>
          </div>
        </div>

        {/* User Holdings (if applicable) */}
        {isHolder && dao.userHoldings && (
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-900 mb-2">Your Holdings</h4>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <p className="text-green-700">Tokens</p>
                <p className="font-semibold text-green-900">{dao.userHoldings.amount}</p>
              </div>
              <div>
                <p className="text-green-700">Voting Power</p>
                <p className="font-semibold text-green-900">{dao.userHoldings.votingPower}</p>
              </div>
              <div>
                <p className="text-green-700">Value</p>
                <p className="font-semibold text-green-900">{dao.userHoldings.value}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          {isHolder ? (
            <>
              <Button variant="outline" className="flex-1 bg-transparent" onClick={onTrade}>
                <Vote className="h-4 w-4 mr-2" />
                Vote
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent" onClick={onTrade}>
                <ExternalLink className="h-4 w-4 mr-2" />
                View DAO
              </Button>
            </>
          ) : (
            <>
              <Button className="flex-1" onClick={onJoin}>
                Join DAO
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent" onClick={onTrade}>
                <Coins className="h-4 w-4 mr-2" />
                Trade for Tokens
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
