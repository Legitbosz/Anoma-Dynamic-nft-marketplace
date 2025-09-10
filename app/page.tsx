import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      {/* Header */}
      <header className="border-b border-red-900/20 bg-black/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/wizard-logo.jpg" alt="Anoma NFT Logo" className="w-8 h-8 rounded-lg object-cover" />
            <span className="text-xl font-bold text-white">Anoma NFT</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/marketplace" className="text-gray-300 hover:text-red-500 transition-colors">
              Marketplace
            </Link>
            <Link href="/intents" className="text-gray-300 hover:text-red-500 transition-colors">
              My Intents
            </Link>
            <Link href="/dao" className="text-gray-300 hover:text-red-500 transition-colors">
              DAO Hub
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
              asChild
            >
              <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" asChild>
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance text-gray-900">
            Express Your Trading <span className="text-primary">Intent</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 font-body text-pretty max-w-2xl mx-auto">
            Trade NFTs with complex intents like "Exchange my gaming collection for art NFTs of similar rarity" or "Swap
            my tokens for DAO governance power." No direct matches required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/auth/signup">Start Trading</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
              <Link href="/marketplace">Explore Marketplace</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Revolutionary Trading Features</h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto">
              Experience the future of NFT trading with intent-based matching and multi-party execution
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-border/50 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <img src="/wizard-logo.jpg" alt="Anoma NFT Logo" className="w-6 h-6 rounded object-cover" />
                </div>
                <CardTitle>Intent Expression</CardTitle>
                <CardDescription className="font-body">
                  Describe complex trading desires in natural language. Our AI matches your intent with optimal
                  opportunities.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <img src="/wizard-logo.jpg" alt="Anoma NFT Logo" className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>Multi-Party Trades</CardTitle>
                <CardDescription className="font-body">
                  Execute complex trades involving multiple parties without requiring direct matches between traders.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <img src="/wizard-logo.jpg" alt="Anoma NFT Logo" className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Trustless Execution</CardTitle>
                <CardDescription className="font-body">
                  All trades are secured by smart contracts and executed atomically. Your assets are always protected.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-chart-4/10 rounded-lg flex items-center justify-center mb-4">
                  <img src="/wizard-logo.jpg" alt="Anoma NFT Logo" className="w-6 h-6 text-chart-4" />
                </div>
                <CardTitle>Rarity Matching</CardTitle>
                <CardDescription className="font-body">
                  Trade based on rarity scores, floor prices, and collection metrics for fair value exchanges.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-chart-2/10 rounded-lg flex items-center justify-center mb-4">
                  <img src="/wizard-logo.jpg" alt="Anoma NFT Logo" className="w-6 h-6 text-chart-2" />
                </div>
                <CardTitle>DAO Integration</CardTitle>
                <CardDescription className="font-body">
                  Exchange NFTs for governance tokens and voting power in your favorite DAOs.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-chart-5/10 rounded-lg flex items-center justify-center mb-4">
                  <img src="/wizard-logo.jpg" alt="Anoma NFT Logo" className="w-6 h-6 text-chart-5" />
                </div>
                <CardTitle>Instant Settlement</CardTitle>
                <CardDescription className="font-body">
                  Trades execute instantly when matches are found, with automatic asset transfers and notifications.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your NFT Trading?</h2>
          <p className="text-muted-foreground font-body mb-8 max-w-2xl mx-auto">
            Join the future of decentralized trading where your intents drive the market
          </p>
          <Button size="lg" className="text-lg px-8" asChild>
            <Link href="/auth/signup">Create Your Account</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/wizard-logo.jpg" alt="Anoma NFT Logo" className="w-6 h-6 rounded object-cover" />
                <span className="font-bold">Anoma NFT</span>
              </div>
              <p className="text-sm text-muted-foreground font-body">The future of intent-based NFT trading</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground font-body">
                <li>
                  <Link href="/marketplace" className="hover:text-red-500 transition-colors">
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="/intents" className="hover:text-red-500 transition-colors">
                    My Intents
                  </Link>
                </li>
                <li>
                  <Link href="/dao" className="hover:text-red-500 transition-colors">
                    DAO Hub
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground font-body">
                <li>
                  <Link href="/docs" className="hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="hover:text-foreground transition-colors">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-foreground transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground font-body">
                <li>
                  <Link href="/about" className="hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-foreground transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center">
            <Badge className="mb-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
              Powered by Anoma Protocol
            </Badge>
            <div className="text-sm text-muted-foreground font-body">
              © 2024 Anoma NFT Marketplace. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
