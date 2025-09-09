"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, Zap, Target, Clock, Shield, AlertTriangle } from "lucide-react"

interface MatchDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  match: any // Would be properly typed in real implementation
}

export function MatchDetailsModal({ isOpen, onClose, match }: MatchDetailsModalProps) {
  const [selectedTab, setSelectedTab] = useState("overview")

  if (!match) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Trade Match Details
          </DialogTitle>
          <DialogDescription className="font-body">
            Comprehensive analysis of this trading opportunity
          </DialogDescription>
        </DialogHeader>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="participants">Participants</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="execution">Execution</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Match Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-body">Match Score</span>
                    <Badge variant="secondary" className="text-lg px-3">
                      {match.score}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-body">Confidence</span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {match.confidence}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-body">Trade Type</span>
                    <span className="font-medium">{match.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-body">Complexity</span>
                    <span className="font-medium">{match.complexity}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Value Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">{match.estimatedValue.your}</p>
                        <p className="text-sm text-muted-foreground font-body">Your Assets</p>
                      </div>
                      <ArrowRight className="w-6 h-6 text-muted-foreground" />
                      <div className="text-center">
                        <p className="text-2xl font-bold text-secondary">{match.estimatedValue.their}</p>
                        <p className="text-sm text-muted-foreground font-body">Their Assets</p>
                      </div>
                    </div>
                    <div className="pt-2">
                      <p className="text-sm font-body">
                        Net Value:{" "}
                        <span className="text-green-600 font-semibold">+{match.estimatedValue.difference}%</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Timeline & Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="font-body">Estimated completion: {match.timeline}</span>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Requirements</h4>
                  <div className="flex flex-wrap gap-2">
                    {match.requirements.map((req: string, index: number) => (
                      <Badge key={index} variant="outline">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="participants" className="space-y-4">
            <div className="space-y-4">
              {match.participants.map((participant: any, index: number) => (
                <Card key={participant.id}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{participant.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{participant.name}</CardTitle>
                        <CardDescription className="font-body">
                          Reputation: {participant.reputation}% • Verified Trader
                        </CardDescription>
                      </div>
                      <Badge variant="outline">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Offering</h4>
                        <p className="text-sm font-body text-muted-foreground">{participant.offering}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">Seeking</h4>
                        <p className="text-sm font-body text-muted-foreground">{participant.seeking}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Compatibility Analysis</CardTitle>
                <CardDescription className="font-body">
                  Detailed breakdown of how well this match aligns with your intent
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-body">Rarity Compatibility</span>
                      <span className="font-medium">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-body">Value Alignment</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-body">Category Match</span>
                      <span className="font-medium">100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-body">Timeline Compatibility</span>
                      <span className="font-medium">88%</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm font-body">
                  <div className="flex items-center justify-between">
                    <span>Counterparty Risk</span>
                    <Badge variant="outline" className="text-green-600">
                      Low
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Value Volatility</span>
                    <Badge variant="outline" className="text-yellow-600">
                      Medium
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Execution Complexity</span>
                    <Badge variant="outline" className="text-green-600">
                      Low
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="execution" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Execution Plan</CardTitle>
                <CardDescription className="font-body">Step-by-step process for completing this trade</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground font-bold">
                      1
                    </div>
                    <span className="font-body">Initiate trade proposal</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <span className="font-body">Counterparty acceptance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <span className="font-body">Smart contract escrow</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs font-bold">
                      4
                    </div>
                    <span className="font-body">Atomic asset exchange</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button>
                <Zap className="w-4 h-4 mr-2" />
                Initiate Trade
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
