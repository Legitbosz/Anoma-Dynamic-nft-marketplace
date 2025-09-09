"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, ExternalLink, Zap } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface NFTCardProps {
  id: string
  name: string
  collection: string
  image: string
  price?: string
  rarity?: "Common" | "Rare" | "Epic" | "Legendary"
  category: "Gaming" | "Art" | "Music" | "Sports" | "Utility"
  isOwned?: boolean
  onTrade?: () => void
}

const rarityColors = {
  Common: "bg-muted text-muted-foreground",
  Rare: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Epic: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  Legendary: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
}

const categoryColors = {
  Gaming: "bg-primary/10 text-primary",
  Art: "bg-secondary/10 text-secondary",
  Music: "bg-chart-3/10 text-chart-3",
  Sports: "bg-chart-4/10 text-chart-4",
  Utility: "bg-chart-5/10 text-chart-5",
}

export function NFTCard({ id, name, collection, image, price, rarity, category, isOwned, onTrade }: NFTCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <Card className="group overflow-hidden border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {rarity && <Badge className={rarityColors[rarity]}>{rarity}</Badge>}
          <Badge className={categoryColors[category]}>{category}</Badge>
        </div>
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
        </button>
      </div>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-sm truncate">{name}</h3>
            <p className="text-xs text-muted-foreground font-body">{collection}</p>
          </div>

          <div className="flex items-center justify-between">
            {price && (
              <div>
                <p className="text-xs text-muted-foreground font-body">Price</p>
                <p className="font-semibold">{price} ETH</p>
              </div>
            )}
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                <ExternalLink className="w-3 h-3" />
              </Button>
              {isOwned ? (
                <Button size="sm" onClick={onTrade} className="h-8 px-3">
                  <Zap className="w-3 h-3 mr-1" />
                  Trade
                </Button>
              ) : (
                <Button size="sm" className="h-8 px-3">
                  Buy
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
