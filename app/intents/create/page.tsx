"use client"

import { useState } from "react"
import { IntentBuilder } from "@/components/intents/intent-builder"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Zap, CheckCircle, Clock, Target } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CreateIntentPage() {
  const router = useRouter()
  const [createdIntent, setCreatedIntent] = useState<any>(null)

  const handleIntentCreate = (intent: any) => {
    setCreatedIntent(intent)
    // Here you would typically save to backend
    console.log("Created intent:", intent)
  }

  if (createdIntent) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <img src="/wizard-logo.jpg" alt="Anoma Dynamic NFT Logo" className="w-8 h-8 rounded-lg object-cover" />
                <span className="text-xl font-bold">Anoma Dynamic NFT</span>
              </Link>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-2">Intent Created Successfully!</h1>
              <p className="text-muted-foreground font-body">
                Your trading intent is now active and our matching engine is looking for opportunities
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Your Intent Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-left space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-body">Intent ID:</span>
                    <Badge variant="outline">{createdIntent.id}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-body">Status:</span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-body">Created:</span>
                    <span className="text-sm">Just now</span>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg text-left">
                  <p className="text-sm font-body">
                    {typeof createdIntent.content === "string"
                      ? createdIntent.content
                      : "Structured intent created successfully"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/intents">
                  <Target className="w-4 h-4 mr-2" />
                  View All Intents
                </Link>
              </Button>
              <Button variant="outline" onClick={() => setCreatedIntent(null)}>
                Create Another Intent
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Matching Started</h3>
                  <p className="text-sm text-muted-foreground font-body">Our AI is analyzing the market for matches</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <Zap className="w-8 h-8 text-secondary mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Real-time Updates</h3>
                  <p className="text-sm text-muted-foreground font-body">You'll be notified when matches are found</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <Target className="w-8 h-8 text-accent mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Execute Trades</h3>
                  <p className="text-sm text-muted-foreground font-body">Review and execute trades when ready</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/intents">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Intents
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <img src="/wizard-logo.jpg" alt="Anoma Dynamic NFT Logo" className="w-8 h-8 rounded-lg object-cover" />
              <span className="text-xl font-bold">Create Intent</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <IntentBuilder onIntentCreate={handleIntentCreate} />
        </div>
      </div>
    </div>
  )
}
