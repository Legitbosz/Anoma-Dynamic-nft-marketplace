"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Wallet, Mail, Lock, User, ArrowRight, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate auth process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  const handleWalletConnect = async (walletType: string) => {
    setIsLoading(true)
    console.log(`Connecting to ${walletType} wallet...`)
    // Simulate wallet connection
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  const walletOptions = [
    {
      name: "MetaMask",
      logo: "/wallets/metamask-logo.jpg",
      description: "Connect using MetaMask wallet",
    },
    {
      name: "Rabby",
      logo: "/wallets/rabby-logo.jpg",
      description: "Connect using Rabby wallet",
    },
    {
      name: "OKX Wallet",
      logo: "/wallets/okx-logo.jpg",
      description: "Connect using OKX wallet",
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted/20">
      <Card className="w-full max-w-md border-border/50">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <Wallet className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Welcome to Anoma Dynamic NFT</CardTitle>
          <CardDescription className="font-body">
            Connect your wallet or create an account to start trading with intents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="Enter your email" className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="password" type="password" placeholder="Enter your password" className="pl-10" required />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <div className="text-center">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="name" type="text" placeholder="Enter your full name" className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="signup-email" type="email" placeholder="Enter your email" className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <Separator className="my-4" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full bg-transparent" disabled={isLoading}>
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full min-w-[300px]" align="center">
                {walletOptions.map((wallet) => (
                  <DropdownMenuItem
                    key={wallet.name}
                    onClick={() => handleWalletConnect(wallet.name)}
                    className="flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/50"
                  >
                    <Image
                      src={wallet.logo || "/placeholder.svg"}
                      alt={`${wallet.name} logo`}
                      width={24}
                      height={24}
                      className="rounded-sm"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">{wallet.name}</span>
                      <span className="text-xs text-muted-foreground">{wallet.description}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4 font-body">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
