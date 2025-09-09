"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, AlertCircle, Users, Shield } from "lucide-react"

interface TradeParty {
  id: string
  name: string
  avatar: string
  offering: Array<{
    id: string
    name: string
    image: string
    type: "nft" | "token"
    value: string
  }>
  receiving: Array<{
    id: string
    name: string
    image: string
    type: "nft" | "token"
    value: string
  }>
  status: "pending" | "approved" | "rejected"
  approvedAt?: string
}

interface TradeExecutionModalProps {
  isOpen: boolean
  onClose: () => void
  tradeId: string
  parties: TradeParty[]
  executionStatus: "pending" | "executing" | "completed" | "failed"
}

export function TradeExecutionModal({ isOpen, onClose, tradeId, parties, executionStatus }: TradeExecutionModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const approvedParties = parties.filter((p) => p.status === "approved").length
  const totalParties = parties.length
  const approvalProgress = (approvedParties / totalParties) * 100

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Multi-Party Trade Execution
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Trade Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Trade Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Trade ID</p>
                  <p className="font-mono text-sm">{tradeId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Parties Involved</p>
                  <p className="font-semibold">{totalParties} participants</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Approval Progress</span>
                  <span className="text-sm font-medium">
                    {approvedParties}/{totalParties} approved
                  </span>
                </div>
                <Progress value={approvalProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Execution Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Execution Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    currentStep >= 1 ? "bg-green-50 border border-green-200" : "bg-gray-50 border border-gray-200"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      currentStep >= 1 ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    1
                  </div>
                  <span className="font-medium">Party Confirmations</span>
                  {currentStep >= 1 && <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />}
                </div>

                <div
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    currentStep >= 2 ? "bg-green-50 border border-green-200" : "bg-gray-50 border border-gray-200"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      currentStep >= 2 ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    2
                  </div>
                  <span className="font-medium">Asset Validation</span>
                  {currentStep >= 2 && <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />}
                </div>

                <div
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    currentStep >= 3 ? "bg-green-50 border border-green-200" : "bg-gray-50 border border-gray-200"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      currentStep >= 3 ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    3
                  </div>
                  <span className="font-medium">Anoma Settlement</span>
                  {currentStep >= 3 && <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Party Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Trade Participants</h3>
            {parties.map((party, index) => (
              <Card key={party.id} className="border-l-4 border-l-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={party.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{party.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{party.name}</p>
                        <p className="text-sm text-muted-foreground">Party {index + 1}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(party.status)}
                      <Badge className={getStatusColor(party.status)}>{party.status}</Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Offering */}
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-2">Offering</h4>
                      <div className="space-y-2">
                        {party.offering.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-2 p-2 bg-red-50 rounded-lg border border-red-100"
                          >
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-8 h-8 rounded object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{item.name}</p>
                              <p className="text-xs text-muted-foreground">{item.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Receiving */}
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-2">Receiving</h4>
                      <div className="space-y-2">
                        {party.receiving.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-2 p-2 bg-green-50 rounded-lg border border-green-100"
                          >
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-8 h-8 rounded object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{item.name}</p>
                              <p className="text-xs text-muted-foreground">{item.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {party.status === "approved" && party.approvedAt && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-xs text-muted-foreground">
                        Approved on {new Date(party.approvedAt).toLocaleString()}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Security Notice */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900">Anoma Protocol Security</h4>
                  <p className="text-sm text-blue-800 mt-1">
                    This multi-party trade is secured by Anoma's intent-centric architecture. All assets are validated
                    and the trade will only execute when all parties have confirmed.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <div className="flex gap-2">
              {executionStatus === "pending" && approvalProgress === 100 && (
                <Button onClick={() => setCurrentStep(3)} className="bg-primary hover:bg-primary/90">
                  Execute Trade
                </Button>
              )}
              {executionStatus === "executing" && (
                <Button disabled>
                  <Clock className="h-4 w-4 mr-2" />
                  Executing...
                </Button>
              )}
              {executionStatus === "completed" && (
                <Button variant="outline" className="text-green-600 border-green-600 bg-transparent">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Completed
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
