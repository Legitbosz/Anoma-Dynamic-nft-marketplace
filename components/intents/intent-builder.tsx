"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Lightbulb, Target, ArrowRight, Sparkles } from "lucide-react"

interface IntentBuilderProps {
  onIntentCreate: (intent: any) => void
}

const intentTemplates = [
  {
    id: "gaming-to-art",
    title: "Gaming → Art NFTs",
    description: "Trade gaming NFTs for art pieces of similar value",
    template: "I want to trade my {gaming collection} for {art NFTs} of {similar rarity} and {comparable floor price}",
  },
  {
    id: "collection-to-dao",
    title: "Collection → DAO Tokens",
    description: "Exchange collection for governance power",
    template: "Exchange my {entire collection} for {governance tokens} that give me {voting power} in {art DAOs}",
  },
  {
    id: "rarity-upgrade",
    title: "Rarity Upgrade",
    description: "Trade multiple common NFTs for rare ones",
    template: "Trade my {3-5 common NFTs} for {1 rare NFT} from {same collection} or {similar projects}",
  },
  {
    id: "cross-chain",
    title: "Cross-Chain Swap",
    description: "Exchange NFTs across different blockchains",
    template: "Swap my {Ethereum NFTs} for {Solana NFTs} of {equivalent value} in {gaming category}",
  },
]

const categories = ["Gaming", "Art", "Music", "Sports", "Utility", "Collectibles"]
const rarities = ["Common", "Rare", "Epic", "Legendary"]
const conditions = ["Similar Value", "Similar Rarity", "Same Collection", "Cross-Category", "Bulk Trade"]

export function IntentBuilder({ onIntentCreate }: IntentBuilderProps) {
  const [activeTab, setActiveTab] = useState("natural")
  const [naturalIntent, setNaturalIntent] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [structuredIntent, setStructuredIntent] = useState({
    offering: {
      category: "",
      rarity: "",
      quantity: 1,
      collections: [] as string[],
    },
    seeking: {
      category: "",
      rarity: "",
      quantity: 1,
      collections: [] as string[],
    },
    conditions: [] as string[],
    priority: "balanced",
    deadline: "",
  })

  const [aiSuggestions, setAiSuggestions] = useState([
    "Trade 3 common gaming NFTs for 1 rare art piece",
    "Exchange my CryptoPunks for equivalent value in Bored Apes",
    "Swap my music NFTs for DAO governance tokens",
    "Trade my entire collection for voting power in art DAOs",
  ])

  const handleNaturalIntentChange = (value: string) => {
    setNaturalIntent(value)
    // Simulate AI parsing and suggestions
    if (value.length > 20) {
      setAiSuggestions([
        "Detected: Gaming → Art trade intent",
        "Suggested: Add rarity matching condition",
        "Tip: Specify collection preferences for better matches",
      ])
    }
  }

  const handleTemplateSelect = (templateId: string) => {
    const template = intentTemplates.find((t) => t.id === templateId)
    if (template) {
      setSelectedTemplate(templateId)
      setNaturalIntent(template.template)
    }
  }

  const handleCreateIntent = () => {
    const intent = {
      id: Date.now().toString(),
      type: activeTab,
      content: activeTab === "natural" ? naturalIntent : structuredIntent,
      template: selectedTemplate,
      createdAt: new Date().toISOString(),
      status: "active",
    }
    onIntentCreate(intent)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Express Your Trading Intent</h2>
        <p className="text-muted-foreground font-body">
          Describe what you want to trade and our AI will find the perfect matches
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="natural">Natural Language</TabsTrigger>
          <TabsTrigger value="structured">Structured Form</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="natural" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Describe Your Intent
              </CardTitle>
              <CardDescription className="font-body">
                Tell us what you want to trade in your own words. Our AI will understand and match you with
                opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="intent">Your Trading Intent</Label>
                <Textarea
                  id="intent"
                  placeholder="Example: I want to trade my gaming NFTs for art NFTs of similar rarity, or exchange my collection for tokens that give me voting power in DAOs I care about..."
                  value={naturalIntent}
                  onChange={(e) => handleNaturalIntentChange(e.target.value)}
                  className="min-h-24 font-body"
                />
              </div>

              {aiSuggestions.length > 0 && (
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    AI Suggestions
                  </Label>
                  <div className="space-y-2">
                    {aiSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="p-3 bg-muted/50 rounded-lg border border-border/50 cursor-pointer hover:bg-muted transition-colors"
                        onClick={() => setNaturalIntent(suggestion)}
                      >
                        <p className="text-sm font-body">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="structured" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What You're Offering</CardTitle>
                <CardDescription className="font-body">Specify the NFTs you want to trade away</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={structuredIntent.offering.category}
                    onValueChange={(value) =>
                      setStructuredIntent((prev) => ({
                        ...prev,
                        offering: { ...prev.offering, category: value },
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Rarity</Label>
                  <Select
                    value={structuredIntent.offering.rarity}
                    onValueChange={(value) =>
                      setStructuredIntent((prev) => ({
                        ...prev,
                        offering: { ...prev.offering, rarity: value },
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select rarity" />
                    </SelectTrigger>
                    <SelectContent>
                      {rarities.map((rarity) => (
                        <SelectItem key={rarity} value={rarity}>
                          {rarity}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Quantity: {structuredIntent.offering.quantity}</Label>
                  <Slider
                    value={[structuredIntent.offering.quantity]}
                    onValueChange={([value]) =>
                      setStructuredIntent((prev) => ({
                        ...prev,
                        offering: { ...prev.offering, quantity: value },
                      }))
                    }
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What You're Seeking</CardTitle>
                <CardDescription className="font-body">Specify what you want in return</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={structuredIntent.seeking.category}
                    onValueChange={(value) =>
                      setStructuredIntent((prev) => ({
                        ...prev,
                        seeking: { ...prev.seeking, category: value },
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Rarity</Label>
                  <Select
                    value={structuredIntent.seeking.rarity}
                    onValueChange={(value) =>
                      setStructuredIntent((prev) => ({
                        ...prev,
                        seeking: { ...prev.seeking, rarity: value },
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select rarity" />
                    </SelectTrigger>
                    <SelectContent>
                      {rarities.map((rarity) => (
                        <SelectItem key={rarity} value={rarity}>
                          {rarity}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Quantity: {structuredIntent.seeking.quantity}</Label>
                  <Slider
                    value={[structuredIntent.seeking.quantity]}
                    onValueChange={([value]) =>
                      setStructuredIntent((prev) => ({
                        ...prev,
                        seeking: { ...prev.seeking, quantity: value },
                      }))
                    }
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Trading Conditions</CardTitle>
              <CardDescription className="font-body">Set your preferences for matching</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>Matching Conditions</Label>
                <div className="grid grid-cols-2 gap-3">
                  {conditions.map((condition) => (
                    <div key={condition} className="flex items-center space-x-2">
                      <Checkbox
                        id={condition}
                        checked={structuredIntent.conditions.includes(condition)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setStructuredIntent((prev) => ({
                              ...prev,
                              conditions: [...prev.conditions, condition],
                            }))
                          } else {
                            setStructuredIntent((prev) => ({
                              ...prev,
                              conditions: prev.conditions.filter((c) => c !== condition),
                            }))
                          }
                        }}
                      />
                      <Label htmlFor={condition} className="text-sm font-body">
                        {condition}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Priority</Label>
                <Select
                  value={structuredIntent.priority}
                  onValueChange={(value) => setStructuredIntent((prev) => ({ ...prev, priority: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="speed">Speed (Quick matches)</SelectItem>
                    <SelectItem value="value">Value (Best deals)</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="rarity">Rarity Focus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            {intentTemplates.map((template) => (
              <Card
                key={template.id}
                className={`cursor-pointer transition-all hover:border-primary/50 ${
                  selectedTemplate === template.id ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    {template.title}
                  </CardTitle>
                  <CardDescription className="font-body">{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-body text-muted-foreground italic">{template.template}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedTemplate && (
            <Card>
              <CardHeader>
                <CardTitle>Customize Template</CardTitle>
                <CardDescription className="font-body">
                  Modify the template to match your specific needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={naturalIntent}
                  onChange={(e) => setNaturalIntent(e.target.value)}
                  className="min-h-20 font-body"
                />
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <Separator />

      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="font-medium">Ready to create your intent?</p>
          <p className="text-sm text-muted-foreground font-body">
            Our matching engine will start looking for opportunities immediately
          </p>
        </div>
        <Button onClick={handleCreateIntent} size="lg" className="px-8">
          Create Intent
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
