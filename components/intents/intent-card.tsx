"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Clock, Target, Zap, Users, Edit, Trash2, Play, Pause } from "lucide-react"
import { useState } from "react"

interface IntentCardProps {
  intent: {
    id: string
    title: string
    description: string
    status: "active" | "paused" | "completed" | "expired"
    progress: number
    matches: number
    totalMatches: number
    createdAt: string
    priority: "speed" | "value" | "balanced" | "rarity"
    category: string
  }
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onToggle?: (id: string) => void
  onExecute?: (id: string) => void
}

const statusColors = {
  active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  paused: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  completed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  expired: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
}

const priorityIcons = {
  speed: Zap,
  value: Target,
  balanced: Users,
  rarity: Target,
}

export function IntentCard({ intent, onEdit, onDelete, onToggle, onExecute }: IntentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const PriorityIcon = priorityIcons[intent.priority]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="hover:border-primary/20 transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              <PriorityIcon className="w-5 h-5 text-primary" />
              {intent.title}
            </CardTitle>
            <CardDescription className="font-body">{intent.description}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={statusColors[intent.status]}>{intent.status}</Badge>
            <Badge variant="outline">{intent.category}</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground font-body">Match Progress</span>
            <span className="font-medium">
              {intent.matches} of {intent.totalMatches} matches found
            </span>
          </div>
          <Progress value={intent.progress} className="h-2" />
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground font-body">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {formatDate(intent.createdAt)}
          </div>
          <div className="flex items-center gap-1">
            <Target className="w-4 h-4" />
            {intent.priority} priority
          </div>
        </div>

        <Separator />

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={() => onToggle?.(intent.id)} className="h-8 bg-transparent">
              {intent.status === "active" ? (
                <>
                  <Pause className="w-3 h-3 mr-1" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 mr-1" />
                  Resume
                </>
              )}
            </Button>
            <Button size="sm" variant="outline" onClick={() => onEdit?.(intent.id)} className="h-8 bg-transparent">
              <Edit className="w-3 h-3 mr-1" />
              Edit
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDelete?.(intent.id)}
              className="h-8 text-destructive hover:text-destructive bg-transparent"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              Delete
            </Button>
          </div>

          {intent.matches > 0 && (
            <Button size="sm" onClick={() => onExecute?.(intent.id)} className="h-8">
              Execute Trade
              <Zap className="w-3 h-3 ml-1" />
            </Button>
          )}
        </div>

        {/* Expandable Details */}
        {isExpanded && (
          <div className="pt-4 border-t border-border space-y-3">
            <div>
              <h4 className="font-medium mb-2">Matching Criteria</h4>
              <div className="grid grid-cols-2 gap-2 text-sm font-body">
                <div>
                  <span className="text-muted-foreground">Offering:</span> Gaming NFTs
                </div>
                <div>
                  <span className="text-muted-foreground">Seeking:</span> Art NFTs
                </div>
                <div>
                  <span className="text-muted-foreground">Rarity:</span> Similar
                </div>
                <div>
                  <span className="text-muted-foreground">Value:</span> Comparable
                </div>
              </div>
            </div>
          </div>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full h-8 text-muted-foreground"
        >
          {isExpanded ? "Show Less" : "Show Details"}
        </Button>
      </CardContent>
    </Card>
  )
}
