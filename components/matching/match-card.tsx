"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Users, Zap, Target, Clock, TrendingUp, Eye } from "lucide-react"
import { useState } from "react"

interface MatchCardProps {
  match: {
    id: string
    score: number
    confidence: "High" | "Medium" | "Low"
    type: "Direct" | "Multi-Party" | "Chain"
    participants: Array<{
      id: string
      name: string
      avatar: string
      offering: string
      seeking: string
      reputation: number
    }>
    estimatedValue: {
      your: string
      their: string
      difference: number
    }
    timeline: string
    complexity: "Simple" | "Moderate" | "Complex"
    requirements: string[]
    createdAt: string
  }
  onViewDetails?: (id: string) => void
  onInitiateTrade?: (id: string) => void
}

const confidenceColors = {
  High: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  Low: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
}

const typeIcons = {
  Direct: Target,
  "Multi-Party": Users,
  Chain: Zap,
}

export function MatchCard({ match, onViewDetails, onInitiateTrade }: MatchCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const TypeIcon = typeIcons[match.type]

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <Card className="hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <TypeIcon className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">{match.type} Trade Match</CardTitle>
              <Badge className={confidenceColors[match.confidence]}>{match.confidence} Confidence</Badge>
            </div>
            <CardDescription className="font-body">
              {match.participants.length} participant{match.participants.length > 1 ? "s" : ""} • {match.complexity}{" "}
              complexity
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold flex items-center gap-1">
              <span className={getScoreColor(match.score)}>{match.score}%</span>
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground font-body">Match Score</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Participants */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Trade Participants</h4>
          <div className="space-y-2">
            {match.participants.map((participant, index) => (
              <div key={participant.id}>
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{participant.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm truncate">{participant.name}</p>
                      <Badge variant="outline" className="text-xs">
                        {participant.reputation}% rep
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-body">
                      <span>Offers: {participant.offering}</span>
                      <ArrowRight className="w-3 h-3" />
                      <span>Wants: {participant.seeking}</span>
                    </div>
                  </div>
                </div>
                {index < match.participants.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        </div>

        {/* Value Estimation */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Estimated Value</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-primary">{match.estimatedValue.your}</p>
              <p className="text-xs text-muted-foreground font-body">Your Assets</p>
            </div>
            <div className="flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-lg font-bold text-secondary">{match.estimatedValue.their}</p>
              <p className="text-xs text-muted-foreground font-body">Their Assets</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm font-body">
              Value difference:{" "}
              <span className={match.estimatedValue.difference > 0 ? "text-green-600" : "text-red-600"}>
                {match.estimatedValue.difference > 0 ? "+" : ""}
                {match.estimatedValue.difference}%
              </span>
            </p>
          </div>
        </div>

        {/* Timeline & Requirements */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Timeline
            </h4>
            <p className="text-sm text-muted-foreground font-body">{match.timeline}</p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">Requirements</h4>
            <div className="flex flex-wrap gap-1">
              {match.requirements.slice(0, 2).map((req, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {req}
                </Badge>
              ))}
              {match.requirements.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{match.requirements.length - 2} more
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Expandable Details */}
        {isExpanded && (
          <div className="pt-4 border-t border-border space-y-3">
            <div>
              <h4 className="font-medium text-sm mb-2">All Requirements</h4>
              <div className="grid grid-cols-2 gap-2">
                {match.requirements.map((req, index) => (
                  <Badge key={index} variant="outline" className="text-xs justify-start">
                    {req}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-2">Match Analysis</h4>
              <div className="space-y-2 text-sm font-body text-muted-foreground">
                <div className="flex justify-between">
                  <span>Rarity Compatibility:</span>
                  <span className="text-green-600">95%</span>
                </div>
                <div className="flex justify-between">
                  <span>Value Alignment:</span>
                  <span className="text-yellow-600">78%</span>
                </div>
                <div className="flex justify-between">
                  <span>Category Match:</span>
                  <span className="text-green-600">100%</span>
                </div>
                <div className="flex justify-between">
                  <span>Timeline Compatibility:</span>
                  <span className="text-green-600">88%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <Separator />

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-muted-foreground"
          >
            {isExpanded ? "Show Less" : "Show Details"}
          </Button>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={() => onViewDetails?.(match.id)} className="bg-transparent">
              <Eye className="w-3 h-3 mr-1" />
              View
            </Button>
            <Button size="sm" onClick={() => onInitiateTrade?.(match.id)}>
              <Zap className="w-3 h-3 mr-1" />
              Initiate Trade
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
