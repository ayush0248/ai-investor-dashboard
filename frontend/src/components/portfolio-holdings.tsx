"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Holding {
  symbol: string
  name: string
  shares: number
  price: number
  value: number
  gain: number
  gainPercent: number
}

export function PortfolioHoldings() {
  // Indian stocks in portfolio
  const [holdings, setHoldings] = useState<Holding[]>([
    {
      symbol: "RELIANCE",
      name: "Reliance Industries",
      shares: 10,
      price: 2873.45,
      value: 28734.5,
      gain: 3734.5,
      gainPercent: 15.71,
    },
    {
      symbol: "TCS",
      name: "Tata Consultancy Services",
      shares: 5,
      price: 3456.2,
      value: 17281.0,
      gain: 3281.0,
      gainPercent: 20.75,
    },
    {
      symbol: "HDFCBANK",
      name: "HDFC Bank",
      shares: 8,
      price: 1678.9,
      value: 13431.2,
      gain: 731.2,
      gainPercent: 5.52,
    },
    {
      symbol: "INFY",
      name: "Infosys",
      shares: 6,
      price: 1432.75,
      value: 8596.5,
      gain: -403.5,
      gainPercent: -4.2,
    },
    {
      symbol: "ICICIBANK",
      name: "ICICI Bank",
      shares: 4,
      price: 945.6,
      value: 3782.4,
      gain: -217.6,
      gainPercent: -5.0,
    },
  ])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredHoldings = holdings.filter(
    (holding) =>
      holding.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      holding.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Portfolio Holdings</CardTitle>
            <p className="text-sm text-muted-foreground">Your current investment positions</p>
          </div>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search holdings..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="grid grid-cols-12 text-xs font-medium text-muted-foreground py-2">
            <div className="col-span-4">Symbol</div>
            <div className="col-span-2 text-right">Shares</div>
            <div className="col-span-2 text-right">Price</div>
            <div className="col-span-2 text-right">Value</div>
            <div className="col-span-2 text-right">Gain/Loss</div>
          </div>
          {filteredHoldings.map((holding) => (
            <div key={holding.symbol} className="grid grid-cols-12 items-center py-2 text-sm border-t border-gray-800">
              <div className="col-span-4">
                <div className="font-medium">{holding.symbol}</div>
                <div className="text-xs text-muted-foreground">{holding.name}</div>
              </div>
              <div className="col-span-2 text-right font-medium">{holding.shares.toFixed(2)}</div>
              <div className="col-span-2 text-right font-medium">₹{holding.price.toFixed(2)}</div>
              <div className="col-span-2 text-right font-medium">₹{holding.value.toFixed(2)}</div>
              <div className="col-span-2 flex justify-end">
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs ${
                    holding.gain >= 0 ? "text-green-500 bg-green-500/10" : "text-red-500 bg-red-500/10"
                  }`}
                >
                  {holding.gain >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                  {Math.abs(holding.gainPercent).toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="mt-4 w-full">
          View All Holdings
        </Button>
      </CardContent>
    </Card>
  )
}

