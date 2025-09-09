"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"
import { useState } from "react"

interface FilterState {
  search: string
  category: string
  rarity: string
  priceRange: string
  sortBy: string
}

interface CollectionFiltersProps {
  onFiltersChange: (filters: FilterState) => void
}

export function CollectionFilters({ onFiltersChange }: CollectionFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "All Categories",
    rarity: "All Rarities",
    priceRange: "All Prices",
    sortBy: "newest",
  })

  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const updateFilters = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)

    // Update active filters for display
    const active = Object.entries(newFilters)
      .filter(([k, v]) => v && k !== "search" && k !== "sortBy")
      .map(([k, v]) => `${k}: ${v}`)
    setActiveFilters(active)
  }

  const clearFilter = (filterKey: string) => {
    const key = filterKey.split(":")[0] as keyof FilterState
    updateFilters(key, "")
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      search: "",
      category: "All Categories",
      rarity: "All Rarities",
      priceRange: "All Prices",
      sortBy: "newest",
    }
    setFilters(clearedFilters)
    setActiveFilters([])
    onFiltersChange(clearedFilters)
  }

  return (
    <div className="space-y-4">
      {/* Search and Sort */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search NFTs, collections, or creators..."
            value={filters.search}
            onChange={(e) => updateFilters("search", e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filters.sortBy} onValueChange={(value) => updateFilters("sortBy", value)}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rarity">Rarity</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-3">
        <Select value={filters.category} onValueChange={(value) => updateFilters("category", value)}>
          <SelectTrigger className="w-32">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Categories">All Categories</SelectItem>
            <SelectItem value="Gaming">Gaming</SelectItem>
            <SelectItem value="Art">Art</SelectItem>
            <SelectItem value="Music">Music</SelectItem>
            <SelectItem value="Sports">Sports</SelectItem>
            <SelectItem value="Utility">Utility</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.rarity} onValueChange={(value) => updateFilters("rarity", value)}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Rarity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Rarities">All Rarities</SelectItem>
            <SelectItem value="Common">Common</SelectItem>
            <SelectItem value="Rare">Rare</SelectItem>
            <SelectItem value="Epic">Epic</SelectItem>
            <SelectItem value="Legendary">Legendary</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.priceRange} onValueChange={(value) => updateFilters("priceRange", value)}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Prices">All Prices</SelectItem>
            <SelectItem value="0-1">0 - 1 ETH</SelectItem>
            <SelectItem value="1-5">1 - 5 ETH</SelectItem>
            <SelectItem value="5-10">5 - 10 ETH</SelectItem>
            <SelectItem value="10+">10+ ETH</SelectItem>
          </SelectContent>
        </Select>

        {activeFilters.length > 0 && (
          <Button variant="outline" size="sm" onClick={clearAllFilters} className="h-10 bg-transparent">
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="pr-1">
              {filter}
              <button
                onClick={() => clearFilter(filter)}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
