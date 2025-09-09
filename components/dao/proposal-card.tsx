"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Vote, CheckCircle, XCircle, Users, ExternalLink } from "lucide-react"

interface ProposalCardProps {
  proposal: {
    id: string
    title: string
    description: string
    proposer: {
      name: string
      avatar: string
    }
    dao: {
      name: string
      logo: string
    }
    status: "active" | "passed" | "rejected" | "pending"
    votingPower: {
      for: number
      against: number
      abstain: number
      total: number
    }
    endTime: string
    quorum: number
    userVote?: "for" | "against" | "abstain"
    userVotingPower?: string
  }
  onVote?: (vote: "for" | "against" | "abstain") => void
}

export function ProposalCard({ proposal, onVote }: ProposalCardProps) {
  const totalVotes = proposal.votingPower.for + proposal.votingPower.against + proposal.votingPower.abstain
  const forPercentage = totalVotes > 0 ? (proposal.votingPower.for / totalVotes) * 100 : 0
  const againstPercentage = totalVotes > 0 ? (proposal.votingPower.against / totalVotes) * 100 : 0
  const quorumReached = totalVotes >= proposal.quorum
  const timeLeft = new Date(proposal.endTime).getTime() - new Date().getTime()
  const hoursLeft = Math.max(0, Math.floor(timeLeft / (1000 * 60 * 60)))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "passed":
        return "bg-green-100 text-green-800 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Vote className="h-4 w-4" />
      case "passed":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      default:
        return <Vote className="h-4 w-4" />
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={proposal.dao.logo || "/placeholder.svg"} />
              <AvatarFallback>{proposal.dao.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg line-clamp-1">{proposal.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{proposal.dao.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(proposal.status)}>
              {getStatusIcon(proposal.status)}
              <span className="ml-1 capitalize">{proposal.status}</span>
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{proposal.description}</p>

        {/* Proposer Info */}
        <div className="flex items-center gap-2 text-sm">
          <Avatar className="h-6 w-6">
            <AvatarImage src={proposal.proposer.avatar || "/placeholder.svg"} />
            <AvatarFallback>{proposal.proposer.name.slice(0, 1).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="text-muted-foreground">Proposed by</span>
          <span className="font-medium">{proposal.proposer.name}</span>
        </div>

        {/* Voting Progress */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Voting Progress</span>
            <span className="font-medium">
              {totalVotes.toLocaleString()} / {proposal.quorum.toLocaleString()} votes
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-green-600">For ({forPercentage.toFixed(1)}%)</span>
              <span className="font-medium">{proposal.votingPower.for.toLocaleString()}</span>
            </div>
            <Progress value={forPercentage} className="h-2 bg-gray-200">
              <div className="h-full bg-green-500 rounded-full transition-all" />
            </Progress>

            <div className="flex justify-between text-sm">
              <span className="text-red-600">Against ({againstPercentage.toFixed(1)}%)</span>
              <span className="font-medium">{proposal.votingPower.against.toLocaleString()}</span>
            </div>
            <Progress value={againstPercentage} className="h-2 bg-gray-200">
              <div className="h-full bg-red-500 rounded-full transition-all" />
            </Progress>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>Quorum: {quorumReached ? "Reached" : "Not reached"}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{hoursLeft > 0 ? `${hoursLeft}h left` : "Voting ended"}</span>
            </div>
          </div>
        </div>

        {/* User Vote Status */}
        {proposal.userVote && (
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-900">
                You voted: <span className="font-semibold capitalize">{proposal.userVote}</span>
              </span>
              {proposal.userVotingPower && (
                <span className="text-sm text-blue-700">Power: {proposal.userVotingPower}</span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          {proposal.status === "active" && !proposal.userVote && onVote && (
            <>
              <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => onVote("for")}>
                Vote For
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                onClick={() => onVote("against")}
              >
                Vote Against
              </Button>
              <Button size="sm" variant="outline" className="flex-1 bg-transparent" onClick={() => onVote("abstain")}>
                Abstain
              </Button>
            </>
          )}
          {(proposal.status !== "active" || proposal.userVote) && (
            <Button variant="outline" className="flex-1 bg-transparent">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
